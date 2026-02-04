package com.project.bookstack.services.impl.member;

import lombok.RequiredArgsConstructor;


import org.json.JSONObject;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.project.bookstack.clients.member.AuthClient;
import com.project.bookstack.dto.PaymentSuccessRequestDTO;
import com.project.bookstack.entities.Member;
import com.project.bookstack.entities.MembershipData;
import com.project.bookstack.repositories.StaffMemberDataRepository;
import com.project.bookstack.repositories.admin.MembershipRepository;
import com.project.bookstack.repositories.member.MemberRepository;
import com.project.bookstack.services.PaymentService;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;   // ✅ CORRECT CLASS

import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    /* ------------------ DEPENDENCIES ------------------ */

    private final MembershipRepository membershipRepository;
    private final MemberRepository memberRepository;
    private final AuthClient authClient;
    private final Environment env;
    private final StaffMemberDataRepository staffMemberDataRepository;

    /* --------------------------------------------------
       CALCULATE AMOUNT (BACKEND SOURCE OF TRUTH)
       -------------------------------------------------- */
    @Override
    public int calculateAmount(String purpose, String membershipType, String billing) {

        MembershipData data = membershipRepository.findById(membershipType)
                .orElseThrow(() ->
                        new RuntimeException("Invalid membership type"));

        return billing.equalsIgnoreCase("monthly")
                ? data.getMonthlyCost()
                : data.getYearlyCost();
    }

    /* --------------------------------------------------
       CREATE RAZORPAY ORDER
       -------------------------------------------------- */
    @Override
    public Order createRazorpayOrder(int amount) throws Exception {

    	RazorpayClient client = new RazorpayClient(
                env.getProperty("razorpay.key.id"),
                env.getProperty("razorpay.key.secret")
        );

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); // paise
        orderRequest.put("currency", env.getProperty("razorpay.currency"));
        orderRequest.put(
                "receipt",
                "bs_" + UUID.randomUUID().toString().substring(0, 20)
        );

        return client.orders.create(orderRequest);
    }

    /* --------------------------------------------------
       VERIFY RAZORPAY SIGNATURE (✅ FIXED)
       -------------------------------------------------- */
    @Override
    public void verifySignature(PaymentSuccessRequestDTO req) {
        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_payment_id", req.getRazorpayPaymentId());
            options.put("razorpay_order_id", req.getRazorpayOrderId());
            options.put("razorpay_signature", req.getRazorpaySignature());

            // ✅ CORRECT METHOD (works in all SDK versions)
            Utils.verifyPaymentSignature(
                    options,
                    env.getProperty("razorpay.key.secret")
            );

        } catch (Exception e) {
            throw new RuntimeException("Invalid Razorpay payment signature");
        }
    }

    /* --------------------------------------------------
       COMPLETE MEMBERSHIP PURCHASE
       -------------------------------------------------- */
    @Override
    public void completeMembershipPurchase(
            String membershipType,
            String billing,
            Map<String, Object> registerData
    ) {
    	


        // 1️⃣ Create user in AUTH-SERVER
        Integer userId = authClient.createUser(registerData);

        // 2️⃣ Insert membership in member_table
        LocalDate start = LocalDate.now();
        LocalDate end = billing.equalsIgnoreCase("monthly")
                ? start.plusMonths(1)
                : start.plusYears(1);

        Member member = new Member();
        member.setUserId(userId);
        member.setMembershipData(staffMemberDataRepository.findById(membershipType).get());
        member.setMemberStart(start);
        member.setMemberEnd(end);
        member.setRenewCount(0);
        member.setRentCount(0);

        memberRepository.save(member); 


    }
}
