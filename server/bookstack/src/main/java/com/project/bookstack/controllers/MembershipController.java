package com.project.bookstack.controllers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.project.bookstack.clients.AuthClient;
import com.project.bookstack.dto.UserCreateRequest;
import com.project.bookstack.entities.Member;
import com.project.bookstack.entities.MembershipData;
import com.project.bookstack.repositories.MembershipRepository;
import com.project.bookstack.repositories.member.MemberRepository;
import com.project.bookstack.services.RazorpayService;
import com.razorpay.Order;
import com.razorpay.Utils;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member/membership")
@RequiredArgsConstructor
public class MembershipController {

    private final RazorpayService razorpayService;
    private final MemberRepository memberRepository;
    private final MembershipRepository membershipRepository;
    private final AuthClient authClient;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    /**
     * STEP 1: Create Razorpay Order (PUBLIC)
     */
    @PostMapping("/start-payment")
    public Map<String, Object> startPayment(
            @RequestParam String membershipType) throws Exception {

        MembershipData plan = membershipRepository
                .findById(membershipType)
                .orElseThrow(() ->
                        new IllegalArgumentException("Invalid membership type"));

        int amount = plan.getYearlyCost();

        Order order = razorpayService.createOrder(amount);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("amount", amount);
        response.put("key", razorpayKeyId);

        return response;
    }

    /**
     * STEP 2: Payment Success → CREATE MEMBER (NO TOKEN HERE)
     */
    @PostMapping("/payment-success")
    public ResponseEntity<String> paymentSuccess(
            @RequestBody Map<String, String> data) throws Exception {

        // Razorpay fields
        String orderId = data.get("razorpay_order_id");
        String paymentId = data.get("razorpay_payment_id");
        String signature = data.get("razorpay_signature");

        // Verify signature
        String payload = orderId + "|" + paymentId;
        String expectedSignature = Utils.getHash(payload, razorpayKeySecret);

        if (!expectedSignature.equals(signature)) {
            return ResponseEntity.badRequest().body("Invalid payment signature");
        }

        // Build request for Auth Service
        UserCreateRequest req = new UserCreateRequest();
        req.setName(data.get("fullName"));
        req.setEmail(data.get("email"));
        req.setPhone(data.get("phone"));
        req.setAddress(data.get("address"));
        req.setDob(LocalDate.parse(data.get("dob")));
        req.setUsername(data.get("username"));
        req.setPassword(data.get("password"));

        // 🔥 CALL AUTH SERVICE
        authClient.registerAfterPayment(req);

        // Optional: save membership record in bookstack DB
        Member member = new Member();
        member.setMembershipType(data.get("membershipType"));
        member.setMemberStart(LocalDate.now());
        member.setMemberEnd(LocalDate.now().plusDays(365));

        memberRepository.save(member);

        return ResponseEntity.ok("Payment successful. Please login.");
    }


    /**
     * OPTIONAL: Payment failed
     */
    @PostMapping("/payment-failed")
    public ResponseEntity<String> paymentFailed() {
        return ResponseEntity.ok("Payment Failed");
    }
}
