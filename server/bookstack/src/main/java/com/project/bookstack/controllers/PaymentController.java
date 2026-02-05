package com.project.bookstack.controllers;

import java.util.Map;

import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.bookstack.dto.PaymentRequestDTO;
import com.project.bookstack.dto.PaymentSuccessRequestDTO;
import com.project.bookstack.services.PaymentService;
import com.razorpay.Order;

import lombok.RequiredArgsConstructor;

/**
 * Payment Controller
 * =========================================================================
 * Provdes secondary endpoints for general utility payments and Razorpay
 * configuration.
 * Complementary to MembershipController for expanded payment purposes.
 */
@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

        private final PaymentService paymentService;
        private final Environment env;

        /**
         * Exposes public Razorpay configuration needed for the frontend SDK.
         * 
         * @return Map containing keyId, currency, and company name.
         */
        @GetMapping("/config")
        public Map<String, String> config() {
                return Map.of(
                                "keyId", env.getProperty("razorpay.key.id", "default_id"),
                                "currency", env.getProperty("razorpay.currency", "INR"),
                                "company", env.getProperty("razorpay.company", "BookStack"));
        }

        /**
         * Calculates the amount to be charged based on the payment purpose and plan.
         * 
         * @param req DTO containing plan and billing details.
         * @return Map with the calculated amount.
         */
        @PostMapping("/preview")
        public Map<String, Integer> preview(@RequestBody PaymentRequestDTO req) {
                int amount = paymentService.calculateAmount(
                                req.getPurpose(),
                                req.getMembershipType(),
                                req.getBilling());
                return Map.of("amount", amount);
        }

        /**
         * Creates a new Razorpay order for general payments.
         * 
         * @param req Payment request details.
         * @return Order ID and calculated amount.
         * @throws Exception If order creation fails.
         */
        @PostMapping("/create-order")
        public Map<String, Object> createOrder(@RequestBody PaymentRequestDTO req) throws Exception {

                int amount = paymentService.calculateAmount(
                                req.getPurpose(),
                                req.getMembershipType(),
                                req.getBilling());

                Order order = paymentService.createRazorpayOrder(amount);

                return Map.of(
                                "orderId", order.get("id"),
                                "amount", amount);
        }

        /**
         * Finalizes the transaction after a successful payment.
         * Verifies the signature and completes the business logic (e.g., membership
         * activation).
         */
        @PostMapping("/success")
        public void success(@RequestBody PaymentSuccessRequestDTO req) {
                paymentService.verifySignature(req);

                paymentService.completeMembershipPurchase(
                                req.getMembershipType(),
                                req.getBilling(),
                                req.getRegisterData());
        }
}
