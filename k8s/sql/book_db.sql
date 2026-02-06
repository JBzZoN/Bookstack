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
 10, 9),

('9780743273565', 'The Great Gatsby', 'F. Scott Fitzgerald',
 'American classic novel.',
 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
 'Scribner',
 'CREATED', '2024-01-12',
 8, 7),

('9780544003415', 'The Hobbit', 'J.R.R. Tolkien',
 'Fantasy adventure.',
 'https://covers.openlibrary.org/b/isbn/9780544003415-L.jpg',
 'HarperCollins',
 'CREATED', '2024-01-15',
 12, 11),

('9781455586691', 'Atomic Habits', 'James Clear',
 'Building good habits.',
 'https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg',
 'Avery',
 'CREATED', '2024-01-18',
 14, 14),

('9780307387899', 'Sapiens', 'Yuval Noah Harari',
 'History of humankind.',
 'https://covers.openlibrary.org/b/isbn/9780307387899-L.jpg',
 'Harper',
 'CREATED', '2024-01-20',
 11, 11),

('9780140449136', 'Meditations', 'Marcus Aurelius',
 'Stoic philosophy.',
 'https://covers.openlibrary.org/b/isbn/9780140449136-L.jpg',
 'Penguin',
 'CREATED', '2024-01-22',
 7, 7),

('9780812981605', 'Rich Dad Poor Dad', 'Robert Kiyosaki',
 'Personal finance lessons.',
 'https://covers.openlibrary.org/b/isbn/9780812981605-L.jpg',
 'Plata',
 'CREATED', '2024-01-25',
 9, 9),

('9780307474278', 'The Lean Startup', 'Eric Ries',
 'Startup methodology.',
 'https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg',
 'Crown',
 'CREATED', '2024-01-28',
 8, 8),

('9780062315007', 'The Alchemist', 'Paulo Coelho',
 'Spiritual journey.',
 'https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg',
 'HarperOne',
 'CREATED', '2024-02-01',
 10, 10),

('9780140449266', 'The Republic', 'Plato',
 'Political philosophy.',
 'https://covers.openlibrary.org/b/isbn/9780140449266-L.jpg',
 'Penguin',
 'CREATED', '2024-02-03',
 6, 6),

('9780132350884', 'Clean Code', 'Robert C. Martin',
 'Software craftsmanship.',
 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
 'Prentice Hall',
 'CREATED', '2024-02-06',
 15, 15),

('9780134685991', 'Effective Java', 'Joshua Bloch',
 'Java best practices.',
 'https://covers.openlibrary.org/b/isbn/9780134685991-L.jpg',
 'Addison-Wesley',
 'CREATED', '2024-02-08',
 10, 10),

('9780596517748', 'JavaScript: The Good Parts', 'Douglas Crockford',
 'JavaScript insights.',
 'https://covers.openlibrary.org/b/isbn/9780596517748-L.jpg',
 'OReilly',
 'CREATED', '2024-02-10',
 9, 9),

('9780262033848', 'AI: A Modern Approach', 'Stuart Russell',
 'AI fundamentals.',
 'https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg',
 'Pearson',
 'CREATED', '2024-02-12',
 8, 8),

('9780131103627', 'The C Programming Language', 'Kernighan & Ritchie',
 'C language classic.',
 'https://covers.openlibrary.org/b/isbn/9780131103627-L.jpg',
 'Prentice Hall',
 'CREATED', '2024-02-15',
 12, 12);
