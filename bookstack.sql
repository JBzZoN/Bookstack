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
-- Schema Bookstack
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Bookstack
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Bookstack` DEFAULT CHARACTER SET utf8 ;
USE `Bookstack` ;

-- -----------------------------------------------------
-- Table `Bookstack`.`user_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bookstack`.`user_table` (
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


-- -----------------------------------------------------
-- Table `Bookstack`.`membership_data_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bookstack`.`membership_data_table` (
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
-- Table `Bookstack`.`Member_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bookstack`.`Member_table` (
  `user_id` INT AUTO_INCREMENT,
  `membership_type` CHAR(8) NULL,
  `member_start` DATE NULL,
  `member_end` DATE NULL,
  PRIMARY KEY (`user_id`),
  INDEX `membership_type_idx` (`membership_type` ASC) VISIBLE,
  CONSTRAINT `member_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `Bookstack`.`user_table` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `membership_type`
    FOREIGN KEY (`membership_type`)
    REFERENCES `Bookstack`.`membership_data_table` (`membership_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bookstack`.`staff_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bookstack`.`staff_table` (
  `user_id` INT AUTO_INCREMENT,
  `salary` FLOAT NULL,
  `date_hired` DATE NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `staff_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `Bookstack`.`user_table` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bookstack`.`Record_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bookstack`.`Record_table` (
  `member_id` INT,
  `staff_id` INT,
  record_id INT AUTO_INCREMENT,
  `date` DATE NULL,
  PRIMARY KEY (record_id),
  INDEX `member_id_idx` (`member_id` ASC) VISIBLE,
  INDEX `staff_id_idx` (`staff_id` ASC) VISIBLE,
  CONSTRAINT `member_record`
    FOREIGN KEY (`member_id`)
    REFERENCES `Bookstack`.`Member_table` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `staff_record`
    FOREIGN KEY (`staff_id`)
    REFERENCES `Bookstack`.`staff_table` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bookstack`.`book_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bookstack`.`book_table` (
  `isbn` INT NULL,
  `title` VARCHAR(25) NULL,
  `author` VARCHAR(25) NULL,
  `description` TEXT NULL,
  `publisher` VARCHAR(45) NULL,
  `edition` YEAR NULL,
  `book_category` CHAR NULL,
  `user_id` INT,
  `action` CHAR(15) NULL,
  `action_date` DATE NULL,
  `book_id` INT AUTO_INCREMENT,
  `number_of_copies` INT NULL,
  `number_of_copies_remaining` INT NULL,
  PRIMARY KEY (`book_id`),
  INDEX `staff_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `staff_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `Bookstack`.`staff_table` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bookstack`.`record_Detail_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bookstack`.`record_Detail_table` (
  `record_detail_id` INT AUTO_INCREMENT,
  `record_id` INT,
  `status` CHAR(10) NULL,
  `book_id` INT,
  `total_copies` INT NULL,
  `due_Date` DATE NULL,
  PRIMARY KEY (`record_detail_id`),
  INDEX `book_id_idx` (`book_id` ASC) VISIBLE,
  INDEX `record_id_idx` (`record_id` ASC) VISIBLE,
  CONSTRAINT `book_record`
    FOREIGN KEY (`book_id`)
    REFERENCES `Bookstack`.`book_table` (`book_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `record_id`
    FOREIGN KEY (`record_id`)
    REFERENCES `Bookstack`.`Record_table` (record_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Bookstack`.`member_book_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bookstack`.`member_book_table` (
  `user_id` INT,
  `book_id` INT,
  `copy_count` INT NULL,
  PRIMARY KEY (`user_id`, `book_id`),
  INDEX `book_id_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `mb_member`
    FOREIGN KEY (`user_id`)
    REFERENCES `Bookstack`.`Member_table` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `mb_book`
    FOREIGN KEY (`book_id`)
    REFERENCES `Bookstack`.`book_table` (`book_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


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
('John Samuel', 'john.samuel@example.com', '9798765412', '40 Park Lane, Trivandrum', '1988-03-14', 'johns', 'john444', 'Admin', 10);

INSERT INTO member_table (user_id, membership_type, member_start, member_end) VALUES
(1, 'Premium', '2025-05-01', '2026-04-30'),
(2, 'Standard', '2024-01-01', '2024-12-31'),
(3, 'Basic', '2023-02-01', '2024-01-31'),
(7, 'Premium', '2022-03-01', '2023-02-28'),
(8, 'Premium', '2022-02-01', '2023-02-21');

INSERT INTO staff_table (user_id, salary, `date_hired`) VALUES
(4, 35000, '2020/06/15'),
(5, 40000, '2019/04/10'),
(9, 42000, '2021/09/01');

INSERT INTO book_table (isbn, title, author, description, publisher, edition, book_category, user_id, action, action_date, book_id, number_of_copies, number_of_copies_remaining) VALUES
(10001, 'Python Basics', 'Mark Lutz', 'Intro to Python', 'OReilly', 2021, 'T', 04, 'Added', '2025-01-10', 01, 10, 8),
(10002, 'Learning SQL', 'Alan Beaulieu', 'SQL fundamentals', 'OReilly', 2020, 'T', 05, 'Added', '2025-02-05', 02, 8, 6),
(10003, 'Data Science Handbook', 'Jake VanderPlas', 'Guide for Data Science', 'OReilly', 2019, 'T', 09, 'Added', '2025-03-12', 03, 7, 5),
(10004, 'C++ Primer', 'Stanley Lippman', 'C++ intro', 'Pearson', 2022, 'T', 04, 'Added', '2025-04-01', 04, 12, 9),
(10005, 'Clean Code', 'Robert C Martin', 'Code quality guide', 'Prentice Hall', 2021, 'T', 05, 'Added', '2025-04-20', 05, 15, 13),
(10006, 'DB Systems', 'Raghu Ramakrishnan', 'Database concepts', 'McGraw Hill', 2020, 'T', 09, 'Added', '2025-05-01', 06, 9, 7),
(10007, 'AI Basics', 'Stuart Russell', 'Intro to AI', 'Pearson', 2022, 'T', 04, 'Added', '2025-05-22', 07, 6, 4),
(10008, 'Java Complete Ref', 'Herbert Schildt', 'Java reference', 'McGraw Hill', 2021, 'T', 05, 'Added', '2025-06-15', 08, 20, 18),
(10009, 'Operating Systems', 'Galvin', 'OS concepts', 'Wiley', 2020, 'T', 09, 'Added', '2025-07-01', 09, 14, 10),
(10010, 'Networks', 'Kurose Ross', 'Computer networks', 'Pearson', 2022, 'T', 04, 'Added', '2025-08-01', 10, 11, 9);

INSERT INTO record_table (member_id, staff_id, record_id, date) VALUES
(01, 04, 01, '2025-01-12'),
(02, 05, 02, '2025-02-07'),
(03, 09, 03, '2025-03-15'),
(07, 04, 04, '2025-04-03'),
(08, 05, 05, '2025-05-05'),
(01, 09, 06, '2025-05-20'),
(02, 04, 07, '2025-06-10'),
(03, 05, 08, '2025-07-12'),
(07, 09, 09, '2025-08-22'),
(08, 04, 10, '2025-09-10');

INSERT INTO record_detail_table (record_detail_id, record_id, status, book_id, total_copies, due_Date) VALUES
(01, 01, 'Issued', 01, 1, '2025-01-20'),
(02, 02, 'Issued', 02, 1, '2025-02-15'),
(03, 03, 'Returned', 03, 1, '2025-03-22'),
(04, 04, 'Issued', 04, 1, '2025-04-15'),
(05, 05, 'Issued', 05, 2, '2025-05-20'),
(06, 06, 'Returned', 06, 1, '2025-05-28'),
(07, 07, 'Issued', 07, 1, '2025-06-18'),
(08, 08, 'Issued', 08, 1, '2025-07-20'),
(09, 09, 'Returned', 09, 1, '2025-08-30'),
(10, 10, 'Issued', 10, 1, '2025-09-18');


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

-- 1. Add image column to book_table
ALTER TABLE Bookstack.book_table
ADD COLUMN book_image VARCHAR(255) NULL AFTER description;

-- 2. Create genre table
CREATE TABLE IF NOT EXISTS Bookstack.genre_table (
  genre_id INT AUTO_INCREMENT,
  genre_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (genre_id),
  UNIQUE (genre_name)
) ENGINE = InnoDB;

-- 3. Create book_genre mapping table (many-to-many)
CREATE TABLE IF NOT EXISTS Bookstack.book_genre (
  book_id INT NOT NULL,
  genre_id INT NOT NULL,
  PRIMARY KEY (book_id, genre_id),
  CONSTRAINT fk_book_genre_book
    FOREIGN KEY (book_id)
    REFERENCES Bookstack.book_table (book_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_book_genre_genre
    FOREIGN KEY (genre_id)
    REFERENCES Bookstack.genre_table (genre_id)
    ON DELETE CASCADE
) ENGINE = InnoDB;

-- 4. Remove old non-normalized category column
ALTER TABLE Bookstack.book_table
DROP COLUMN book_category;

ALTER TABLE Bookstack.book_table
DROP COLUMN edition;

-- Table to store user ratings for books (one rating per user per book)
CREATE TABLE IF NOT EXISTS Bookstack.book_rating (
  rating_id INT NOT NULL AUTO_INCREMENT,
  book_id INT NOT NULL,
  user_id INT NOT NULL,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  rating_date DATETIME DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (rating_id),
  UNIQUE KEY uq_book_user_rating (book_id, user_id),

  CONSTRAINT fk_rating_book
    FOREIGN KEY (book_id)
    REFERENCES Bookstack.book_table (book_id)
    ON DELETE CASCADE,

  CONSTRAINT fk_rating_user
    FOREIGN KEY (user_id)
    REFERENCES Bookstack.user_table (user_id)
    ON DELETE CASCADE
) ENGINE = InnoDB;


-- Table to store comments made by users on books
CREATE TABLE IF NOT EXISTS Bookstack.book_comment (
  comment_id INT NOT NULL AUTO_INCREMENT,
  book_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL,
  comment_date DATETIME DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (comment_id),

  CONSTRAINT fk_comment_book
    FOREIGN KEY (book_id)
    REFERENCES Bookstack.book_table (book_id)
    ON DELETE CASCADE,

  CONSTRAINT fk_comment_user
    FOREIGN KEY (user_id)
    REFERENCES Bookstack.user_table (user_id)
    ON DELETE CASCADE
) ENGINE = InnoDB;

INSERT INTO user_table (name,email,phone,address,dob,username,password,role_type)
VALUES
('Manoj Kumar','manoj@example.com','9811111111','Bengaluru','1996-05-12','manoj','pass','Member'),
('Priya Shah','priya@example.com','9822222222','Surat','1997-08-19','priya','pass','Member'),
('Suresh Rao','suresh@example.com','9833333333','Hyderabad','1995-11-02','suresh','pass','Member'),
('Kiran Patel','kiran@example.com','9844444444','Vadodara','1988-03-22','kiranl','pass','Librarian');

INSERT INTO staff_table (user_id,salary,date_hired)
VALUES
(14,39000,'2022-02-15');

INSERT INTO Member_table (user_id,membership_type,member_start,member_end)
VALUES
(11,'Standard','2025-01-01','2025-12-31'),
(12,'Premium','2025-02-01','2026-01-31'),
(13,'Basic','2024-06-01','2025-05-31');

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

INSERT INTO Record_table (member_id,staff_id,date)
VALUES
(11,4,'2025-08-25'),
(12,5,'2025-08-28'),
(13,14,'2025-09-02');

ALTER TABLE book_table
MODIFY isbn VARCHAR(13);

ALTER TABLE book_table
MODIFY title VARCHAR(255);

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


INSERT INTO book_genre (book_id, genre_id)
VALUES
-- Classics / Fiction
(26,1),(26,7),        -- To Kill a Mockingbird
(27,1),(27,7),        -- The Great Gatsby

-- Fantasy
(28,3),(28,1),        -- The Hobbit

-- Self-help / Psychology
(29,5),(29,12),       -- Atomic Habits

-- Non-fiction / History
(30,2),(30,9),        -- Sapiens

-- Philosophy
(31,8),               -- Meditations
(35,8),               -- The Republic
(34,1),(34,8),        -- The Alchemist

-- Business / Self-help
(32,5),(32,11),       -- Rich Dad Poor Dad
(33,11),(33,5),       -- The Lean Startup

-- Programming / Technology
(36,10),              -- Clean Code
(37,10),              -- Effective Java
(38,10),              -- JavaScript: The Good Parts
(40,10),              -- The C Programming Language

-- AI / Science
(39,4),(39,11);       -- AI: A Modern Approach

INSERT INTO record_Detail_table (record_id, status, book_id, total_copies, due_Date)
VALUES
(11,'Issued',26,1,'2025-09-05'),     -- To Kill a Mockingbird
(12,'Returned',27,1,'2025-09-01'),   -- The Great Gatsby
(13,'Issued',29,1,'2025-09-12');     -- Atomic Habits

INSERT INTO member_book_table (user_id, book_id, copy_count)
VALUES
(11,26,1),   -- Manoj Kumar → To Kill a Mockingbird
(13,29,1);   -- Suresh Rao → Atomic Habits

INSERT INTO book_rating (book_id, user_id, rating)
VALUES
(26,1,5),   -- To Kill a Mockingbird
(26,2,4),

(29,3,5),   -- Atomic Habits
(29,7,4),

(36,8,5),   -- Clean Code
(36,11,4),

(39,12,5),  -- AI: A Modern Approach
(39,13,4);

INSERT INTO book_comment (book_id, user_id, comment)
VALUES
(26,1,'A powerful and timeless novel.'),
(29,3,'Very practical and motivating.'),
(36,8,'Must-read for clean coding.'),
(39,13,'Excellent introduction to AI.');

SET FOREIGN_KEY_CHECKS = 0;

truncate table book_table;

SET FOREIGN_KEY_CHECKS = 1;
