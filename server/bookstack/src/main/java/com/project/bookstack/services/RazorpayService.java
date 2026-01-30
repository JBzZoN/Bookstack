package com.project.bookstack.services;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
public class RazorpayService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    /**
     * Creates a Razorpay ORDER (not payment)
     * This does NOT charge money
     * It only prepares Razorpay Checkout
     */
    public Order createOrder(int amount) throws RazorpayException {

        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject options = new JSONObject();
        options.put("amount", amount * 100);   // INR → paise
        options.put("currency", "INR");
        options.put("receipt", "membership_receipt");

        return client.orders.create(options);
    }
}
