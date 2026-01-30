-- we are making a project on this topic and the functionalities that we want to add are 
-- Users: 
-- Member 
-- Librarian 
-- Admin or Manager 
-- Member Can:  
-- take memberships 
-- Can view book and availability 
-- Can reserve books at home 
-- Can renew books at home 
-- Can view and pay fines at home 
-- If one book is under fine he or she cannot reserve or rent other books 
-- Give book reviews 
-- Librarian:
-- Check member data Add member rental details into his or her profile 
-- Add or remove books from online collection 
-- Admin or manager:
-- Views various statistics like trending book topics

-- MySQL Workbench Forward Engineering

CREATE USER bookstack@localhost IDENTIFIED BY 'bookstack';
GRANT ALL PRIVILEGES ON *.* TO bookstack@localhost;
Flush privileges;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bookstack
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bookstack
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bookstack` DEFAULT CHARACTER SET utf8 ;
USE `bookstack` ;

-- -----------------------------------------------------
-- Table `bookstack`.`user_table`
-- -----------------------------------------------------
-- CREATE TABLE IF NOT EXISTS `bookstack`.`user_table` (
--   `name` CHAR(30) NULL,
--   `email` VARCHAR(30) NULL,
--   `phone` CHAR(10) NULL,
--   `address` VARCHAR(45) NULL,
--   `dob` DATE NULL,
--   `username` CHAR(15) NULL,
--   `password` VARCHAR(100) NULL,
--   `role_type` VARCHAR(45) NULL,
--   `user_id` INT AUTO_INCREMENT,
--   PRIMARY KEY (`user_id`))
-- ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookstack`.`membership_data_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstack`.`membership_data_table` (
  `membership_type` CHAR(8) NOT NULL,
  `borrow_limit` INT NULL,
  `borrow_period` INT NULL,
  `renewal_limit` INT NULL,
  `reservation_limit` INT NULL,
  `access_to_new` TINYINT NULL,
  monthly_cost int,
  yearly_cost int,
  PRIMARY KEY (`membership_type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookstack`.`member_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstack`.`member_table` (
  `user_id` INT,
  `membership_type` CHAR(8) NULL,
  `member_start` DATE NULL,
  `member_end` DATE NULL,
  PRIMARY KEY (`user_id`),
  INDEX `membership_type_idx` (`membership_type` ASC) VISIBLE,
  -- CONSTRAINT `member_user`
    -- FOREIGN KEY (`user_id`)
    -- REFERENCES `bookstack`.`member_table` (`user_id`)
    -- ON DELETE NO ACTION
    -- ON UPDATE NO ACTION,
  CONSTRAINT `membership_type`
    FOREIGN KEY (`membership_type`)
    REFERENCES `bookstack`.`membership_data_table` (`membership_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookstack`.`staff_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstack`.`staff_table` (
  `user_id` INT,
  `salary` FLOAT NULL,
  `date_hired` DATE NULL,
  PRIMARY KEY (`user_id`)
  -- ,
  -- CONSTRAINT `staff_user`
    -- FOREIGN KEY (`user_id`)
    -- REFERENCES `bookstack`.`member_table` (`user_id`)
    -- ON DELETE NO ACTION
    -- ON UPDATE NO ACTION
    )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookstack`.`record_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstack`.`record_table` (
  `member_id` INT,
  `staff_id` INT,
  record_id INT AUTO_INCREMENT,
  `date` DATE NULL,
  PRIMARY KEY (record_id),
  INDEX `member_id_idx` (`member_id` ASC) VISIBLE,
  INDEX `staff_id_idx` (`staff_id` ASC) VISIBLE,
  CONSTRAINT `member_record`
    FOREIGN KEY (`member_id`)
    REFERENCES `bookstack`.`member_table` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `staff_record`
    FOREIGN KEY (`staff_id`)
    REFERENCES `bookstack`.`staff_table` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bookstack`.`record_detail_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS bookstack.record_detail_table (
  record_detail_id INT AUTO_INCREMENT PRIMARY KEY,

  record_id INT NOT NULL,
  book_id INT NOT NULL,         

  status CHAR(10),
  total_copies INT,
  due_date DATE,
  fine_paid BOOLEAN,

  INDEX idx_record_id (record_id),
  INDEX idx_book_id (book_id),

  CONSTRAINT fk_record_detail_record
    FOREIGN KEY (record_id)
    REFERENCES bookstack.record_table (record_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bookstack`.`member_book_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS bookstack.member_book_table (
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    copy_count INT DEFAULT 1,
    PRIMARY KEY (user_id, book_id),
    FOREIGN KEY (user_id)
        REFERENCES bookstack.member_table(user_id)
        ON DELETE CASCADE
) ENGINE = InnoDB;


-- 1. Add image column to book_table
ALTER TABLE bookstack.book_table
ADD COLUMN book_image VARCHAR(255) NULL AFTER description;

-- 2. Create genre table
CREATE TABLE IF NOT EXISTS bookstack.genre_table (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(50) UNIQUE NOT NULL
) ENGINE = InnoDB;

-- 3. Create book_genre mapping table (many-to-many)
CREATE TABLE IF NOT EXISTS bookstack.book_genre (
    book_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (book_id, genre_id),
    CONSTRAINT fk_book_genre_genre
        FOREIGN KEY (genre_id)
        REFERENCES bookstack.genre_table (genre_id)
        ON DELETE CASCADE
) ENGINE = InnoDB;

-- Table to store user ratings for books (one rating per user per book)
CREATE TABLE IF NOT EXISTS bookstack.book_rating (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    rating TINYINT CHECK (rating BETWEEN 1 AND 5),
    rating_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (book_id, user_id),
    FOREIGN KEY (user_id)
        REFERENCES bookstack.member_table(user_id)
        ON DELETE CASCADE
) ENGINE = InnoDB;

-- Table to store comments made by users on books
CREATE TABLE IF NOT EXISTS bookstack.book_comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    comment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES bookstack.member_table(user_id)
        ON DELETE CASCADE
) ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- MYSQL DUMMY DATA
-- -----------------------------------------------------
-- MySQL Workbench Forward Engineering

INSERT INTO membership_data_table 
(membership_type, borrow_limit, borrow_period, `renewal_limit`, `reservation_limit`, `access_to_new`, monthly_cost, yearly_cost)
VALUES
('Basic', 3, 7, 1, 0, 0, 50, 500),
('Premium', 7, 14, 5, 3, 1, 300, 3000),
('Standard', 5, 10, 2, 2, 0, 150, 1500);

-- INSERT INTO user_table (name, email, phone, address, dob, username, password, role_type, user_id) VALUES
-- ('Alice Johnson', 'alice.johnson@example.com', '9876543210', '12 Green St, Trivandrum', '1998-04-15', 'alicej', 'alice123', 'Member', 1),
-- ('Bob Mathew', 'bob.mathew@example.com', '9823456789', '34 Lake Rd, Kochi', '1995-07-20', 'bobm', 'bob456', 'Member', 2),
-- ('Clara Thomas', 'clara.thomas@example.com', '9812345670', '56 Hill View, Kollam', '2000-02-05', 'clarat', 'clara789', 'Member', 3),
-- ('David Roy', 'david.roy@example.com', '9898765432', '78 Palm St, Trivandrum', '1989-11-22', 'davidr', 'roy123', 'Librarian', 4),
-- ('Eva George', 'eva.george@example.com', '9786543210', '90 Rose Lane, Kochi', '1992-09-30', 'evag', 'eva321', 'Librarian', 5),
-- ('Frank Wilson', 'frank.wilson@example.com', '9754321980', '101 Maple St, Thrissur', '1985-06-10', 'frankw', 'frank555', 'Admin', 6),
-- ('Grace Paul', 'grace.paul@example.com', '9845632109', '12 Lotus St, Alappuzha', '1997-01-17', 'gracep', 'grace111', 'Member', 7),
-- ('Henry Joseph', 'henry.joseph@example.com', '9832109876', '14 Ocean View, Calicut', '1994-12-25', 'henryj', 'henry222', 'Member', 8),
-- ('Isabel Dsouza', 'isabel.dsouza@example.com', '9723456123', '22 River St, Kottayam', '1990-08-19', 'isabeld', 'isa333', 'Librarian', 9),
-- ('John Samuel', 'john.samuel@example.com', '9798765412', '40 Park Lane, Trivandrum', '1988-03-14', 'johns', 'john444', 'Admin', 10),
-- ('Manoj Kumar','manoj@example.com','9811111111','Bengaluru','1996-05-12','manoj','pass','Member', 11),
-- ('Priya Shah','priya@example.com','9822222222','Surat','1997-08-19','priya','pass','Member', 12),
-- ('Suresh Rao','suresh@example.com','9833333333','Hyderabad','1995-11-02','suresh','pass','Member', 13),
-- ('Kiran Patel','kiran@example.com','9844444444','Vadodara','1988-03-22','kiranl','pass','Librarian', 14);

INSERT INTO member_table (user_id, membership_type, member_start, member_end) VALUES
(1, 'Premium', '2025-05-01', '2026-04-30'),
(2, 'Standard', '2024-01-01', '2024-12-31'),
(3, 'Basic', '2023-02-01', '2024-01-31'),
(7, 'Premium', '2022-03-01', '2023-02-28'),
(8, 'Premium', '2022-02-01', '2023-02-21');

INSERT INTO staff_table (user_id, salary, `date_hired`) VALUES
(4, 35000, '2020/06/15'),
(5, 40000, '2019/04/10'),
(9, 42000, '2021/09/01'),
(14,39000,'2022-02-15');


INSERT INTO book_table
(isbn, title, author, description, book_image, publisher, user_id, action, action_date, number_of_copies, number_of_copies_remaining)
VALUES
('9780061120084','To Kill a Mockingbird','Harper Lee','Classic novel on justice and morality.',
 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg','HarperCollins',4,'Added','2025-08-10',10,8),

('9780743273565','The Great Gatsby','F. Scott Fitzgerald','American classic novel.',
 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg','Scribner',5,'Added','2025-08-15',8,6),

('9780544003415','The Hobbit','J.R.R. Tolkien','Fantasy adventure.',
 'https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg','HarperCollins',9,'Added','2025-08-20',12,9),

('9781455586691','Atomic Habits','James Clear','Building good habits.',
 'https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg','Avery',14,'Added','2025-08-22',14,11),

('9780307387899','Sapiens','Yuval Noah Harari','History of humankind.',
 'https://covers.openlibrary.org/b/isbn/9780307387899-L.jpg','Harper',4,'Added','2025-08-25',11,9),

('9780140449136','Meditations','Marcus Aurelius','Stoic philosophy.',
 'https://covers.openlibrary.org/b/isbn/9780140449136-L.jpg','Penguin',5,'Added','2025-08-28',7,5),

('9780812981605','Rich Dad Poor Dad','Robert Kiyosaki','Personal finance lessons.',
 'https://covers.openlibrary.org/b/isbn/9780812981605-L.jpg','Plata',9,'Added','2025-09-01',9,7),

('9780307474278','The Lean Startup','Eric Ries','Startup methodology.',
 'https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg','Crown',14,'Added','2025-09-05',8,6),

('9780062315007','The Alchemist','Paulo Coelho','Spiritual journey.',
 'https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg','HarperOne',4,'Added','2025-09-08',10,8),

('9780140449266','The Republic','Plato','Political philosophy.',
 'https://covers.openlibrary.org/b/isbn/9780140449266-L.jpg','Penguin',5,'Added','2025-09-10',6,4),

('9780132350884','Clean Code','Robert C. Martin','Software craftsmanship.',
 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg','Prentice Hall',9,'Added','2025-09-12',15,12),

('9780134685991','Effective Java','Joshua Bloch','Java best practices.',
 'https://covers.openlibrary.org/b/isbn/9780134685991-L.jpg','Addison-Wesley',14,'Added','2025-09-15',10,7),

('9780596517748','JavaScript: The Good Parts','Douglas Crockford','JavaScript insights.',
 'https://covers.openlibrary.org/b/isbn/9780596517748-L.jpg','OReilly',4,'Added','2025-09-18',9,6),

('9780262033848','AI: A Modern Approach','Stuart Russell','AI fundamentals.',
 'https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg','Pearson',5,'Added','2025-09-20',8,5),

('9780131103627','The C Programming Language','Kernighan & Ritchie','C language classic.',
 'https://covers.openlibrary.org/b/isbn/9780131103627-L.jpg','Prentice Hall',9,'Added','2025-09-22',12,9);


-- =========================
-- BOOK RATINGS
-- =========================
INSERT INTO book_rating (book_id, user_id, rating)
VALUES
(1,1,5),    -- To Kill a Mockingbird
(1,2,4),

(4,3,5),    -- Atomic Habits
(4,7,4),

(11,8,5);   -- Clean Code


INSERT INTO member_book_table (user_id, book_id, copy_count) VALUES
(01, 01, 1),
(02, 02, 1),
(03, 03, 1),
(07, 04, 1),
(08, 05, 2),
(01, 06, 1),
(02, 07, 1),
(03, 08, 1),
(07, 09, 1),
(08, 10, 1);

-- =========================
-- BOOK COMMENTS
-- =========================
INSERT INTO book_comment (book_id, user_id, comment)
VALUES
(1,1,'A powerful and timeless novel.'),
(4,3,'Very practical and motivating.'),
(11,8,'Must-read for clean coding.'),
(14,7,'Excellent introduction to AI.');

INSERT INTO genre_table (genre_name)
VALUES
('Fiction'),
('Non-Fiction'),
('Fantasy'),
('Science Fiction'),
('Self-Help'),
('Biography & Memoir'),
('Business & Economics'),
('Philosophy'),
('History'),
('Programming & Technology'),
('Science'),
('Psychology');

-- =========================
-- BOOK ↔ GENRE MAPPING
-- =========================
INSERT INTO book_genre (book_id, genre_id)
VALUES
-- Classics / Fiction
(1,1),(1,7),          -- To Kill a Mockingbird
(2,1),(2,7),          -- The Great Gatsby

-- Fantasy
(3,3),(3,1),          -- The Hobbit

-- Self-help / Psychology
(4,5),(4,12),         -- Atomic Habits

-- Non-fiction / History
(5,2),(5,9),          -- Sapiens

-- Philosophy
(6,8),                -- Meditations
(10,8),               -- The Republic
(9,1),(9,8),          -- The Alchemist

-- Business / Self-help
(7,5),(7,11),         -- Rich Dad Poor Dad
(8,11),(8,5),         -- The Lean Startup

-- Programming / Technology
(11,10),              -- Clean Code
(12,10),              -- Effective Java
(13,10),              -- JavaScript: The Good Parts
(15,10),              -- The C Programming Language

-- AI / Science
(14,4),(14,11);       -- AI: A Modern Approach

INSERT INTO record_table (member_id, staff_id, record_id, date) VALUES
(01, 04, 01, '2025-01-12'),
(02, 05, 02, '2025-02-07'),
(03, 09, 03, '2025-03-15'),
(07, 04, 04, '2025-04-03'),
(08, 05, 05, '2025-05-05'),
(01, 09, 06, '2025-05-20'),
(02, 04, 07, '2025-06-10');

INSERT INTO record_detail_table (record_detail_id, record_id, status, book_id, total_copies, due_Date, fine_paid) VALUES
(01, 01, 'Issued', 01, 1, '2025-01-20', true),
(02, 02, 'Issued', 02, 1, '2025-02-15', true),
(03, 03, 'Returned', 03, 1, '2025-03-22', false),
(04, 04, 'Issued', 04, 1, '2025-04-15', true),
(05, 05, 'Issued', 05, 2, '2025-05-20', false),
(06, 06, 'Returned', 06, 1, '2025-05-28', true),
(07, 07, 'Issued', 07, 1, '2025-06-18', true);

INSERT INTO member_table (user_id,membership_type,member_start,member_end)
VALUES
(11,'Standard','2025-01-01','2025-12-31'),
(12,'Premium','2025-02-01','2026-01-31'),
(13,'Basic','2024-06-01','2025-05-31');

-- =========================
-- MEMBER ↔ BOOK
-- =========================
INSERT INTO member_book_table (user_id, book_id, copy_count)
VALUES
(11,1,1),    -- Manoj Kumar → To Kill a Mockingbird
(13,4,1);    -- Suresh Rao → Atomic Habits

-- ANOTHER DATABASE


CREATE TABLE IF NOT EXISTS bookstack.book_like (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    UNIQUE (book_id, user_id),
    FOREIGN KEY (user_id)
        REFERENCES bookstack.member_table(user_id)
        ON DELETE CASCADE
) ENGINE = InnoDB;

insert into book_like (user_id, book_id) values 
(1, 1),   -- user 1 likes book 1
(1, 5),   -- user 1 likes book 5
(2, 1);   -- user 2 likes book 1

-- CREATE TABLE IF NOT EXISTS `bookstack`.`book_table` (
--   `isbn` INT NULL,
--   `title` VARCHAR(25) NULL,
--   `author` VARCHAR(25) NULL,
--   `description` TEXT NULL,
--   `publisher` VARCHAR(45) NULL,
--   `edition` YEAR NULL,
--   `book_category` CHAR NULL,
--   `user_id` INT,
--   `action` CHAR(15) NULL,
--   `action_date` DATE NULL,
--   `book_id` INT AUTO_INCREMENT,
--   `number_of_copies` INT NULL,
--   `number_of_copies_remaining` INT NULL,
--   PRIMARY KEY (`book_id`),
--   INDEX `staff_id_idx` (`user_id` ASC) VISIBLE,
--   CONSTRAINT `staff_id`
--     FOREIGN KEY (`user_id`)
--     REFERENCES `bookstack`.`staff_table` (`user_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB;


CREATE DATABASE IF NOT EXISTS authorization;
USE authorization;

CREATE TABLE IF NOT EXISTS `authorization`.`user_table` (
  `name` CHAR(30) NULL,
  `email` VARCHAR(30) NULL,
  `phone` CHAR(10) NULL,
  `address` VARCHAR(45) NULL,
  `dob` DATE NULL,
  `username` CHAR(15) NULL,
  `password` VARCHAR(100) NULL,
  `role_type` VARCHAR(45) NULL,
  `user_id` INT AUTO_INCREMENT,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

INSERT INTO user_table (name, email, phone, address, dob, username, password, role_type, user_id) VALUES
('Alice Johnson', 'alice.johnson@example.com', '9876543210', '12 Green St, Trivandrum', '1998-04-15', 'alicej', 'alice123', 'Member', 1),
('Bob Mathew', 'bob.mathew@example.com', '9823456789', '34 Lake Rd, Kochi', '1995-07-20', 'bobm', 'bob456', 'Member', 2),
('Clara Thomas', 'clara.thomas@example.com', '9812345670', '56 Hill View, Kollam', '2000-02-05', 'clarat', 'clara789', 'Member', 3),
('David Roy', 'david.roy@example.com', '9898765432', '78 Palm St, Trivandrum', '1989-11-22', 'davidr', 'roy123', 'Librarian', 4),
('Eva George', 'eva.george@example.com', '9786543210', '90 Rose Lane, Kochi', '1992-09-30', 'evag', 'eva321', 'Librarian', 5),
('Frank Wilson', 'frank.wilson@example.com', '9754321980', '101 Maple St, Thrissur', '1985-06-10', 'frankw', 'frank555', 'Admin', 6),
('Grace Paul', 'grace.paul@example.com', '9845632109', '12 Lotus St, Alappuzha', '1997-01-17', 'gracep', 'grace111', 'Member', 7),
('Henry Joseph', 'henry.joseph@example.com', '9832109876', '14 Ocean View, Calicut', '1994-12-25', 'henryj', 'henry222', 'Member', 8),
('Isabel Dsouza', 'isabel.dsouza@example.com', '9723456123', '22 River St, Kottayam', '1990-08-19', 'isabeld', 'isa333', 'Librarian', 9),
('John Samuel', 'john.samuel@example.com', '9798765412', '40 Park Lane, Trivandrum', '1988-03-14', 'johns', 'john444', 'Admin', 10),
('Manoj Kumar','manoj@example.com','9811111111','Bengaluru','1996-05-12','manoj','pass','Member', 11),
('Priya Shah','priya@example.com','9822222222','Surat','1997-08-19','priya','pass','Member', 12),
('Suresh Rao','suresh@example.com','9833333333','Hyderabad','1995-11-02','suresh','pass','Member', 13),
('Kiran Patel','kiran@example.com','9844444444','Vadodara','1988-03-22','kiranl','pass','Librarian', 14);

CREATE DATABASE IF NOT EXISTS book_db;
USE book_db;

CREATE TABLE IF NOT EXISTS `book_db`.`book_table` (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(13) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    book_image VARCHAR(255),
    publisher VARCHAR(100),
    action CHAR(15) NULL,
    action_date DATE NULL,
    number_of_copies INT NOT NULL,
    number_of_copies_remaining INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB;

USE book_db;

INSERT INTO book_table
(
    isbn,
    title,
    author,
    description,
    book_image,
    publisher,
    action,
    action_date,
    number_of_copies,
    number_of_copies_remaining
)
VALUES
('9780061120084', 'To Kill a Mockingbird', 'Harper Lee',
 'Classic novel on justice and morality.',
 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
 'HarperCollins',
 'CREATED', '2024-01-10',
 10, 8),

('9780743273565', 'The Great Gatsby', 'F. Scott Fitzgerald',
 'American classic novel.',
 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
 'Scribner',
 'CREATED', '2024-01-12',
 8, 6),

('9780544003415', 'The Hobbit', 'J.R.R. Tolkien',
 'Fantasy adventure.',
 'https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg',
 'HarperCollins',
 'CREATED', '2024-01-15',
 12, 9),

('9781455586691', 'Atomic Habits', 'James Clear',
 'Building good habits.',
 'https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg',
 'Avery',
 'CREATED', '2024-01-18',
 14, 11),

('9780307387899', 'Sapiens', 'Yuval Noah Harari',
 'History of humankind.',
 'https://covers.openlibrary.org/b/isbn/9780307387899-L.jpg',
 'Harper',
 'CREATED', '2024-01-20',
 11, 9),

('9780140449136', 'Meditations', 'Marcus Aurelius',
 'Stoic philosophy.',
 'https://covers.openlibrary.org/b/isbn/9780140449136-L.jpg',
 'Penguin',
 'CREATED', '2024-01-22',
 7, 5),

('9780812981605', 'Rich Dad Poor Dad', 'Robert Kiyosaki',
 'Personal finance lessons.',
 'https://covers.openlibrary.org/b/isbn/9780812981605-L.jpg',
 'Plata',
 'CREATED', '2024-01-25',
 9, 7),

('9780307474278', 'The Lean Startup', 'Eric Ries',
 'Startup methodology.',
 'https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg',
 'Crown',
 'CREATED', '2024-01-28',
 8, 6),

('9780062315007', 'The Alchemist', 'Paulo Coelho',
 'Spiritual journey.',
 'https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg',
 'HarperOne',
 'CREATED', '2024-02-01',
 10, 8),

('9780140449266', 'The Republic', 'Plato',
 'Political philosophy.',
 'https://covers.openlibrary.org/b/isbn/9780140449266-L.jpg',
 'Penguin',
 'CREATED', '2024-02-03',
 6, 4),

('9780132350884', 'Clean Code', 'Robert C. Martin',
 'Software craftsmanship.',
 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
 'Prentice Hall',
 'CREATED', '2024-02-06',
 15, 12),

('9780134685991', 'Effective Java', 'Joshua Bloch',
 'Java best practices.',
 'https://covers.openlibrary.org/b/isbn/9780134685991-L.jpg',
 'Addison-Wesley',
 'CREATED', '2024-02-08',
 10, 7),

('9780596517748', 'JavaScript: The Good Parts', 'Douglas Crockford',
 'JavaScript insights.',
 'https://covers.openlibrary.org/b/isbn/9780596517748-L.jpg',
 'OReilly',
 'CREATED', '2024-02-10',
 9, 6),

('9780262033848', 'AI: A Modern Approach', 'Stuart Russell',
 'AI fundamentals.',
 'https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg',
 'Pearson',
 'CREATED', '2024-02-12',
 8, 5),

('9780131103627', 'The C Programming Language', 'Kernighan & Ritchie',
 'C language classic.',
 'https://covers.openlibrary.org/b/isbn/9780131103627-L.jpg',
 'Prentice Hall',
 'CREATED', '2024-02-15',
 12, 9);



