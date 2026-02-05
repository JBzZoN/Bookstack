// package com.project.bookstack.scheduled;

// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.ArgumentMatchers.eq;
// import static org.mockito.Mockito.times;
// import static org.mockito.Mockito.verify;
// import static org.mockito.Mockito.when;

// import java.util.Collections;
// import java.util.Optional;

// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.kafka.core.KafkaTemplate;

// import com.project.bookstack.entities.Book;
// import com.project.bookstack.entities.BookNotify;
// import com.project.bookstack.repositories.BookNotifyRepository;
// import com.project.bookstack.repositories.StaffBookRepository;

// @ExtendWith(MockitoExtension.class)
// public class BookAvailabilitySchedulerTest {

//     @Mock
//     private BookNotifyRepository bookNotifyRepository;

//     @Mock
//     private StaffBookRepository bookRepository;

//     @Mock
//     private KafkaTemplate<String, Object> kafkaTemplate;

//     @InjectMocks
//     private BookAvailabilityScheduler scheduler;

//     @Test
//     public void testConvertRequestsToNotifications_BookAvailable() {
//         // Arrange
//         Long bookId = 1L;
//         BookNotify notifyRequest = new BookNotify();
//         notifyRequest.setBookId(bookId);
//         notifyRequest.setEmail("test@example.com");
//         notifyRequest.setNotified(false);

//         Book book = new Book();
//         book.setBookId(bookId.intValue());
//         book.setNumberOfCopiesRemaining(1); // AVAILABLE

//         when(bookNotifyRepository.findByNotifiedFalse()).thenReturn(Collections.singletonList(notifyRequest));
//         when(bookRepository.findById(bookId.intValue())).thenReturn(Optional.of(book));

//         // Act
//         scheduler.convertRequestsToNotifications();

//         // Assert
//         // Verify Kafka message is sent to "book-available-topic" with bookId 1L
//         verify(kafkaTemplate, times(1)).send(eq("book-available-topic"), eq(bookId));
//     }

//     @Test
//     public void testConvertRequestsToNotifications_BookUnavailable() {
//         // Arrange
//         Long bookId = 2L;
//         BookNotify notifyRequest = new BookNotify();
//         notifyRequest.setBookId(bookId);

//         Book book = new Book();
//         book.setBookId(bookId.intValue());
//         book.setNumberOfCopiesRemaining(0); // UNAVAILABLE

//         when(bookNotifyRepository.findByNotifiedFalse()).thenReturn(Collections.singletonList(notifyRequest));
//         when(bookRepository.findById(bookId.intValue())).thenReturn(Optional.of(book));

//         // Act
//         scheduler.convertRequestsToNotifications();

//         // Assert
//         // Verify Kafka message is NOT sent
//         verify(kafkaTemplate, times(0)).send(any(), any());
//     }
// }
