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

INSERT INTO user_table (name, email, phone, address, dob, username, password, role_type, user_id) VALUES
('Alice Johnson', 'namangova@gmail.com', '9876543210', '12 Green St, Trivandrum', '1998-04-15', 'alicej', 'alice123', 'Member', 1),
('Bob Mathew', 'jboneplus7t@gmail.com', '9823456789', '34 Lake Rd, Kochi', '1995-07-20', 'bobm', 'bob456', 'Member', 2),
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

