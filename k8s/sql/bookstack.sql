-- -----------------------------------------------------
-- Table `bookstack`.`membership_data_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstack`.`membership_data_table` (
  `membership_type` CHAR(8) NOT NULL,
  `rent_limit` INT NULL,
  `borrow_period` INT NULL,
  `renewal_limit` INT NULL,
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
  `renew_count` INT NOT NULL DEFAULT 0,
  `rent_count` INT NOT NULL DEFAULT 0,
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
  `status` VARCHAR(10),
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
  returned INT,

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

-- -----------------------------------------------------
-- MYSQL DUMMY DATA
-- -----------------------------------------------------
-- MySQL Workbench Forward Engineering

INSERT INTO membership_data_table 
(membership_type, rent_limit, borrow_period, `renewal_limit`, monthly_cost, yearly_cost)
VALUES
('Basic', 3, 7, 1, 50, 500),
('Premium', 7, 14, 5, 300, 3000),
('Standard', 5, 10, 2, 150, 1500);

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

INSERT INTO member_table (user_id, membership_type, member_start, member_end, rent_count) VALUES
(1, 'Premium', '2025-05-01', '2026-04-30', 3),
(2, 'Standard', '2024-01-01', '2024-12-31', 0),
(3, 'Basic', '2023-02-01', '2024-01-31', 0),
(7, 'Premium', '2022-03-01', '2023-02-28', 0),
(8, 'Premium', '2022-02-01', '2023-02-21', 0);

INSERT INTO staff_table (user_id, salary, `date_hired`, status) VALUES
(4, 35000, '2020/06/15', 'active'),
(5, 40000, '2019/04/10', 'inactive'),
(9, 42000, '2021/09/01', 'inactive'),
(14,39000,'2022-02-15', 'active');


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
(01, 01, 1), -- alice johnson - to kill a mocking bird
(01, 02, 1), -- alice johnson - The great gatsby
(01, 03, 1); -- alice johnson - the hobbit

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
(01, 04, 01, '2026-01-12'),
(01, 05, 02, '2026-01-07'),
(01, 09, 03, '2026-01-15');

INSERT INTO record_detail_table (record_detail_id, record_id, status, book_id, total_copies, due_Date, returned) VALUES
(01, 01, 'Rent', 01, 1, '2026-01-26', 0),
(02, 02, 'Rent', 02, 1, '2026-01-21', 0),
(03, 03, 'Rent', 03, 1, '2026-01-29', 0);

INSERT INTO member_table (user_id,membership_type,member_start,member_end)
VALUES
(11,'Standard','2025-01-01','2025-12-31'),
(12,'Premium','2025-02-01','2026-01-31'),
(13,'Basic','2024-06-01','2025-05-31');

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
