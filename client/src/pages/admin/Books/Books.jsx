import React from "react";
import { Book_data } from "../../../dummy-data/book-data";
import "./Books.css";

export default function Books() {
  const books = Book_data.results;

  return (
    <div className="books-container">
      <h2>Book List</h2>
      <table className="books-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Authors</th>
            <th>Subjects</th>
            <th>Languages</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.authors.map(a => a.name).join(", ")}</td>
              <td>{book.subjects.slice(0, 3).join(", ")}</td> {/* first 3 subjects */}
              <td>{book.languages.join(", ")}</td>
              <td>{book.download_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
