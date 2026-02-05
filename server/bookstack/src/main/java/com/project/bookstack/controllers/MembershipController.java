package com.project.bookstack.controllers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.entities.Member;
import com.project.bookstack.entities.MembershipData;
import com.project.bookstack.exception.ResourceNotFoundException;
import com.project.bookstack.repositories.StaffMemberDataRepository;
import com.project.bookstack.repositories.admin.MembershipRepository;
import com.project.bookstack.repositories.member.MemberRepository;
import com.project.bookstack.services.RazorpayService;
import com.razorpay.Order;
import com.razorpay.Utils;

import lombok.RequiredArgsConstructor;

/**
 * Membership Controller
 * =========================================================================
 * Orchestrates the membership subscription and renewal lifecycle.
 * Integrates with Razorpay for secure payment processing.
 */
@RestController
@RequestMapping("/membership")
@RequiredArgsConstructor
public class MembershipController {

    private final RazorpayService razorpayService;
    private final MemberRepository memberRepository;
    private final MembershipRepository membershipRepository;
    private final StaffMemberDataRepository staffMemberDataRepository;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    /**
     * Initializes the payment process by creating a Razorpay order.
     * 
     * @param membershipType The type of plan selected (e.g., DIAMOND, GOLD).
     * @return Order ID and amount to be used by the frontend Razorpay SDK.
     * @throws Exception If order creation fails.
     */
    @PostMapping("/start-payment")
    public Map<String, Object> startPayment(@RequestParam String membershipType) throws Exception {

        // Validate membership type from DB
        MembershipData plan = membershipRepository
                .findById(membershipType)
                .orElseThrow(() -> new ResourceNotFoundException("Membership type", membershipType));

        int amount = plan.getYearlyCost(); // Default to yearly plan

        Order order = razorpayService.createOrder(amount);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("amount", amount);
        response.put("key", "rzp_test_SA8oZTwOs9GBZe"); // Test key matching application.properties

        return response;
    }

    /**
     * Handles the callback after a successful payment on the frontend.
     * Verifies the Razorpay signature and updates the member's subscription
     * details.
     * 
     * @param data  Payment details: orderId, paymentId, signature, and
     *              membershipType.
     * @param token JWT token for user identification.
     * @return Success message or bad request if signature verification fails.
     */
    @PostMapping("/payment-success")
    public ResponseEntity<String> paymentSuccess(
            @RequestBody Map<String, String> data,
            @RequestHeader("X-User-Id") String id) throws Exception {

        String orderId = data.get("razorpay_order_id");
        String paymentId = data.get("razorpay_payment_id");
        String signature = data.get("razorpay_signature");
        String membershipType = data.get("membershipType");

        // 1. Verify Razorpay signature for authenticity
        String payload = orderId + "|" + paymentId;
        String expectedSignature = Utils.getHash(payload, razorpayKeySecret);

        if (!expectedSignature.equals(signature)) {
            return ResponseEntity.badRequest().body("Invalid payment signature");
        }

        // 2. Extracted userId from X-User-Id header (passed by Gateway)
        int userId = Integer.parseInt(id);

        // 3. Activate or renew membership in the database
        Member member = memberRepository.findById(userId).orElse(new Member());

        member.setUserId(userId);
        member.setMembershipData(staffMemberDataRepository.findById(membershipType).get());
        member.setMemberStart(LocalDate.now());
        member.setMemberEnd(LocalDate.now().plusDays(365));

        memberRepository.save(member);

        return ResponseEntity.ok("Membership Activated Successfully");
    }

    /**
     * Endpoint for logging or handling failed payment attempts.
     */
    @PostMapping("/payment-failed")
    public ResponseEntity<String> paymentFailed() {
        return ResponseEntity.ok("Payment Failed");
    }
}
