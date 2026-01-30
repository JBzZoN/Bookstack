package com.project.bookstack.services.member;

import java.util.List;

import com.project.bookstack.dto.member.ReviewDTO;

public interface BookReviewService {

    List<ReviewDTO> getReviews(Integer bookId);

    void addReview(Integer bookId, Integer userId, Integer rating, String comment);
}
