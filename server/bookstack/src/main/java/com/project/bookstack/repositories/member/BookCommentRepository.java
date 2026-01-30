//package com.project.bookstack.repositories.member;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import com.project.bookstack.entities.BookComment;
//
//public interface BookCommentRepository
//        extends JpaRepository<BookComment, Integer> {
//
//    List<BookComment> findByBookIdOrderByCreatedAtDesc(Integer bookId);
//
//    boolean existsByBookIdAndUserId(Integer bookId, Integer userId);
//}
