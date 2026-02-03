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

drop database book_db;
drop database bookstack;
drop database authorization;

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

CREATE TABLE IF NOT EXISTS bookstack.book_like (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    UNIQUE (book_id, user_id),
    FOREIGN KEY (user_id)
        REFERENCES bookstack.member_table(user_id)
        ON DELETE CASCADE
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

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
  `address` TEXT NULL,
  `dob` DATE NULL,
  `username` CHAR(15) NULL,
  `password` VARCHAR(100) NULL,
  `role_type` VARCHAR(45) NULL,
  `user_id` INT AUTO_INCREMENT,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

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