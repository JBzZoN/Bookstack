package com.project.bookstack.services;

import com.project.bookstack.dto.*;
import com.razorpay.Order;

public interface PaymentService {

    int calculateAmount(String purpose, String membershipType, String billing);

    Order createRazorpayOrder(int amount) throws Exception;

    void verifySignature(PaymentSuccessRequestDTO request);

    void completeMembershipPurchase(
            String membershipType,
            String billing,
            java.util.Map<String, Object> registerData
    );
    
}
