-- =====================================================
-- DATABASE INDEX OPTIMIZATION SCRIPT
-- =====================================================
-- This script adds performance indexes to the bookstack database
-- Safe to run - no schema changes, only index additions
-- =====================================================

USE bookstack;

-- =====================================================
-- PHASE 1: CRITICAL PERFORMANCE INDEXES
-- =====================================================

-- 1. book_notify: Duplicate check optimization
CREATE INDEX idx_book_notify_book_email ON book_notify(book_id, email);

-- 2. book_notify: Notification processing
CREATE INDEX idx_book_notify_notified ON book_notify(notified, book_id);

-- 3. book_comment: User-book comment lookup
CREATE INDEX idx_book_comment_book_user ON book_comment(book_id, user_id);

-- 4. book_comment: Book comments list (sorted by date)
CREATE INDEX idx_book_comment_book_id ON book_comment(book_id, comment_date DESC);

-- 5. book_rating: Book rating calculations
CREATE INDEX idx_book_rating_book_id ON book_rating(book_id);

-- 6. book_like: User's liked books
CREATE INDEX idx_book_like_user_id ON book_like(user_id);

-- =====================================================
-- PHASE 2: QUERY OPTIMIZATION INDEXES
-- =====================================================

-- 7. record_detail_table: Status filtering
CREATE INDEX idx_record_detail_status ON record_detail_table(status);

-- 8. record_detail_table: Due date queries (overdue books)
CREATE INDEX idx_record_detail_due_date ON record_detail_table(due_date, status);

-- 9. member_table: Membership expiry checks
CREATE INDEX idx_member_end_date ON member_table(member_end);

-- 10. record_table: Date-based reporting
CREATE INDEX idx_record_date ON record_table(date DESC);

-- 11. notification_table: User notifications
CREATE INDEX idx_notification_user ON notification_table(user_id, requested_at DESC);

-- =====================================================
-- PHASE 3: SEARCH & REPORTING INDEXES
-- =====================================================

USE book_db;

-- 12. book_table: Title search
CREATE INDEX idx_book_title ON book_table(title);

-- 13. book_table: Author search
CREATE INDEX idx_book_author ON book_table(author);

-- 14. book_table: ISBN lookup
CREATE INDEX idx_book_isbn ON book_table(isbn);

-- 15. book_table: Availability checks
CREATE INDEX idx_book_copies_remaining ON book_table(number_of_copies_remaining);

-- =====================================================
-- AUTHORIZATION DATABASE INDEXES
-- =====================================================

USE authorization;

-- 16. user_table: Email login
CREATE INDEX idx_user_email ON user_table(email);

-- 17. user_table: Username login
CREATE INDEX idx_user_username ON user_table(username);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify indexes were created successfully

USE bookstack;
SHOW INDEX FROM book_notify;
SHOW INDEX FROM book_comment;
SHOW INDEX FROM book_rating;
SHOW INDEX FROM book_like;
SHOW INDEX FROM record_detail_table;
SHOW INDEX FROM member_table;
SHOW INDEX FROM record_table;
SHOW INDEX FROM notification_table;

USE book_db;
SHOW INDEX FROM book_table;

USE authorization;
SHOW INDEX FROM user_table;

-- =====================================================
-- ROLLBACK SCRIPT (if needed)
-- =====================================================
-- Uncomment and run if you need to remove indexes

/*
USE bookstack;
DROP INDEX idx_book_notify_book_email ON book_notify;
DROP INDEX idx_book_notify_notified ON book_notify;
DROP INDEX idx_book_comment_book_user ON book_comment;
DROP INDEX idx_book_comment_book_id ON book_comment;
DROP INDEX idx_book_rating_book_id ON book_rating;
DROP INDEX idx_book_like_user_id ON book_like;
DROP INDEX idx_record_detail_status ON record_detail_table;
DROP INDEX idx_record_detail_due_date ON record_detail_table;
DROP INDEX idx_member_end_date ON member_table;
DROP INDEX idx_record_date ON record_table;
DROP INDEX idx_notification_user ON notification_table;

USE book_db;
DROP INDEX idx_book_title ON book_table;
DROP INDEX idx_book_author ON book_table;
DROP INDEX idx_book_isbn ON book_table;
DROP INDEX idx_book_copies_remaining ON book_table;

USE authorization;
DROP INDEX idx_user_email ON user_table;
DROP INDEX idx_user_username ON user_table;
*/
