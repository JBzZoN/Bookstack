package com.project.bookstack.controllers;

import com.project.bookstack.dto.*;
import com.project.bookstack.services.*;
import com.razorpay.Order;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    private final Environment env;

    /* --------------------------------
       1️⃣ PUBLIC CONFIG (SAFE)
       -------------------------------- */
    @GetMapping("/config")
    public Map<String, String> config() {
        return Map.of(
                "keyId", env.getProperty("razorpay.key.id", "default_id"),
                "currency", env.getProperty("razorpay.currency", "INR"),
                "company", env.getProperty("razorpay.company", "my company")
        );
    }
    
    /* --------------------------------
       2️⃣ PREVIEW AMOUNT
       -------------------------------- */
    @PostMapping("/preview")
    public Map<String, Integer> preview(
            @RequestBody PaymentRequestDTO req
    ) {
        int amount = paymentService.calculateAmount(
                req.getPurpose(),
                req.getMembershipType(),
                req.getBilling()
        );
        return Map.of("amount", amount);
    }

    /* --------------------------------
       3️⃣ CREATE ORDER
       -------------------------------- */
    @PostMapping("/create-order")
    public Map<String, Object> createOrder(
            @RequestBody PaymentRequestDTO req
    ) throws Exception {

        int amount = paymentService.calculateAmount(
                req.getPurpose(),
                req.getMembershipType(),
                req.getBilling()
        );

        Order order = paymentService.createRazorpayOrder(amount);

        return Map.of(
                "orderId", order.get("id"),
                "amount", amount
        );
    }

    /* --------------------------------
       4️⃣ PAYMENT SUCCESS
       -------------------------------- */
    @PostMapping("/success")
    public void success(
            @RequestBody PaymentSuccessRequestDTO req
    ) {
        paymentService.verifySignature(req);

        paymentService.completeMembershipPurchase(
                req.getMembershipType(),
                req.getBilling(),
                req.getRegisterData()
        );
    }
}
