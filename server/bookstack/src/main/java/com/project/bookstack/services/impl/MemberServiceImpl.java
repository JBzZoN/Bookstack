package com.project.bookstack.services.impl;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.bookstack.dto.member.BookCardDTO;
import com.project.bookstack.repositories.MemberRepository;
import com.project.bookstack.services.MemberService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public List<BookCardDTO> getAllBooks() {
    	Integer userId = 7; 
        return memberRepository.getAllBooks(userId);
    }
    
    @Override
    public List<BookCardDTO> getAllLikedBooks() {
    	Integer userId = 1; 
        return memberRepository.getAllLikedBooks(userId);
    }
    
    @Override
    public List<BookCardDTO> getRecommendedBooks() {
        Pageable pageable = (Pageable) PageRequest.of(0, 10);
        Integer userId = 11;
        return memberRepository.getRecommendedBooks(userId, pageable);
    }

    
}
