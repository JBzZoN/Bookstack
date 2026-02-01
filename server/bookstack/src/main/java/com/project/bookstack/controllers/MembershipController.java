package com.project.bookstack.controllers;

import java.time.LocalDate;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.bookstack.entities.Member;
import com.project.bookstack.entities.MembershipData;
import com.project.bookstack.repositories.MembershipRepository;
import com.project.bookstack.repositories.member.MemberRepository;
import com.project.bookstack.services.RazorpayService;
import com.razorpay.Order;
import com.razorpay.Utils;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/membership")
@RequiredArgsConstructor
public class MembershipController {

    private final RazorpayService razorpayService;
    private final MemberRepository memberRepository;
    private final MembershipRepository membershipRepository;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    /**
     * STEP 1: Start payment (create Razorpay order)
     */
    @PostMapping("/start-payment")
    public Map<String, Object> startPayment(
            @RequestParam String membershipType) throws Exception {

        // Validate membership type from DB
        MembershipData plan = membershipRepository
                .findById(membershipType)
                .orElseThrow(() ->
                        new IllegalArgumentException("Invalid membership type"));

        int amount = plan.getYearlyCost(); // assuming yearly for now

        Order order = razorpayService.createOrder(amount);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("amount", amount);
        response.put("key", "rzp_test_xxxxx"); // test key only

        return response;
    }

    /**
     * STEP 2: Payment success callback
     */
    @PostMapping("/payment-success")
    public ResponseEntity<String> paymentSuccess(
            @org.springframework.web.bind.annotation.RequestBody Map<String, String> data,
            @RequestHeader("Authorization") String token) throws Exception {

        String orderId = data.get("razorpay_order_id");
        String paymentId = data.get("razorpay_payment_id");
        String signature = data.get("razorpay_signature");
        String membershipType = data.get("membershipType"); // sent from frontend

        // 1️⃣ Verify Razorpay signature
        String payload = orderId + "|" + paymentId;
        String expectedSignature = Utils.getHash(payload, razorpayKeySecret);

        if (!expectedSignature.equals(signature)) {
            return ResponseEntity.badRequest().body("Invalid payment signature");
        }

        // 2️⃣ Extract userId from JWT
        int userId = extractUserIdFromJWT(token);

        // 3️⃣ Activate or renew membership
        Member member = memberRepository.findById(userId)
                .orElse(new Member());

        member.setUserId(userId);
        member.setMembershipType(membershipType);
        member.setMemberStart(LocalDate.now());
        member.setMemberEnd(LocalDate.now().plusDays(365));

        memberRepository.save(member);

        return ResponseEntity.ok("Membership Activated Successfully");
    }

    /**
     * STEP 3: Payment failure (no DB change)
     */
    @PostMapping("/payment-failed")
    public ResponseEntity<String> paymentFailed() {
        return ResponseEntity.ok("Payment Failed");
    }

    /**
     * Utility: Extract userId from JWT
     * (Replace with your actual JWT logic)
     */
    private int extractUserIdFromJWT(String token) {
        // token = "Bearer xxxxx"
        // TODO: implement real JWT parsing
        return 1; // placeholder for now
    }
}
