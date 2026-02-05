package com.project.bookstack.services;

import org.springframework.stereotype.Service;

import com.project.bookstack.dto.NotifyMeDto;
import com.project.bookstack.entities.BookNotify;
import com.project.bookstack.exception.DuplicateResourceException;
import com.project.bookstack.exception.ValidationException;
import com.project.bookstack.repositories.BookNotifyRepository;

import lombok.RequiredArgsConstructor;

/**
 * Book Notification Service
 * =========================================================================
 * Handles the business logic for 'Notify Me' requests.
 * Ensures that users can register to be notified when an out-of-stock book
 * is replenished, while preventing duplicate requests.
 */
@Service
@RequiredArgsConstructor
public class BookNotifyService {

    private final BookNotifyRepository repository;

    /**
     * Saves a new notification request if it doesn't already exist.
     * 
     * @param dto Contains the bookId and user email.
     * @throws ValidationException        if inputs are invalid.
     * @throws DuplicateResourceException if a duplicate request is detected.
     */
    public void saveNotifyRequest(NotifyMeDto dto) {
        if (dto.getBookId() == null || dto.getEmail() == null) {
            throw new ValidationException("BookId and email cannot be null");
        }

        if (isNotifyPending(dto.getBookId().intValue(), dto.getEmail())) {
            throw new DuplicateResourceException("You have already requested to be notified for this book.");
        }

        BookNotify notify = new BookNotify();
        notify.setBookId(dto.getBookId());
        notify.setEmail(dto.getEmail());

        repository.save(notify);
    }

    /**
     * Checks if a user already has a pending notification for a specific book.
     * 
     * @param bookId The ID of the book.
     * @param email  The user's email address.
     * @return True if a pending request exists, false otherwise.
     */
    public boolean isNotifyPending(Integer bookId, String email) {
        return repository.existsByBookIdAndEmail(Long.valueOf(bookId), email);
    }
}
