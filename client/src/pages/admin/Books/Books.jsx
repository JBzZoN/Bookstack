import React, { useEffect, useState } from "react";
import "./Books.css";
import { bookData } from "../../../dummy-data/book-data";
import { getBooks } from "../Service/connection";

export default function Books() {
  const books = bookData.results;
  const [properties, setProperties] = useState([])

   const getPropertiesList = async () => {
    const response = await getBooks()
    console.log(response)
    setProperties(response)
   // console.log(response['data'])
    if (response['status'] == 'success') {
      // set the properties and re-render the component UI
      setProperties(response)
      
    }
  }

  useEffect(() => {
    // load the properties automatically when this component is launched
    getPropertiesList()
    console.log(properties);
  }, [])


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
  {properties.map((book, index) => (
    <tr key={book.isbn ?? index}>
      <td>{book.isbn}</td>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.description}</td>
      <td>{book.publisher}</td>
      <td>{book.edition}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}
