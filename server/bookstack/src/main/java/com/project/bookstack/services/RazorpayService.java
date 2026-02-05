package com.project.bookstack.services;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

/**
 * Razorpay Integration Service
 * =========================================================================
 * Provides utility methods to interact with the Razorpay API.
 * Primarily used for creating orders during the membership subscription flow.
 */
@Service
public class RazorpayService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    /**
     * Creates a new Razorpay Order for a specific amount.
     * Note: This only initializes a transaction on the Razorpay side and
     * returns an Order ID to be used by the frontend checkout.
     * 
     * @param amount The transaction amount in INR.
     * @return Razorpay Order object.
     * @throws RazorpayException if order creation fails due to network or
     *                           credential issues.
     */
    public Order createOrder(int amount) throws RazorpayException {

        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject options = new JSONObject();
        // Convert amount from INR to Paise (as required by Razorpay)
        options.put("amount", amount * 100);
        options.put("currency", "INR");
        options.put("receipt", "membership_receipt_v1");

        return client.orders.create(options);
    }
}
