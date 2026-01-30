package com.project.bookstack.services;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.project.bookstack.entities.Member;
import com.project.bookstack.repositories.member.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MembershipService {

    private final MemberRepository memberRepository;

    /**
     * READ-ONLY check
     */
    public boolean isMemberActive(int userId) {

        return memberRepository.findById(userId)
                .map(member -> member.getMemberEnd() != null
                        && member.getMemberEnd().isAfter(LocalDate.now()))
                .orElse(false);
    }

    /**
     * WRITE operation (call only after payment success)
     */
    public void activateOrRenewMembership(
            int userId,
            String membershipType,
            int durationDays) {

        Member member = memberRepository.findById(userId)
                .orElse(new Member());

        member.setUserId(userId);
        member.setMembershipType(membershipType);
        member.setMemberStart(LocalDate.now());
        member.setMemberEnd(LocalDate.now().plusDays(durationDays));

        memberRepository.save(member);
    }
}
