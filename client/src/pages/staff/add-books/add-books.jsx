import React, { useState } from 'react'
import './add-books.css'
import addImage from "../../../assets/images/staff/add-button.png"
import addImageTicked from "../../../assets/images/staff/add-button-ticked.png"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Title from './../../../components/staff/title/title';
import Select from "react-select";
import axios from "axios"

/**
 * AddBooks Component
 * ==========================================================================
 * Provides a form for staff members to add new books to the library system.
 * 
 * Features:
 * - Image Upload: Supports book cover image selection with preview status.
 * - Dynamic Genre Selection: Uses react-select for multi-genre assignment.
 * - Form Validation: Captures Title, Author, Publisher, ISBN, Copies, and Description.
 * - API Integration: Multi-part form submission to /book/add and /staff/genre.
 *
 * @component
 * @returns {JSX.Element} The book addition form.
 */
function AddBooks() {


  /* ==========================================================================
     State Management
     ========================================================================== */

  // TODO: Replace with dynamic user context after login implementation
  const STAFF_ID = 4;

  const [data, setData] = useState(0)
  const [file, setFile] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [copies, setCopies] = useState(0);
  const [isbn, setIsbn] = useState("");
  const [genreList, setGenreList] = useState([])


  const navigate = useNavigate()
  /* ==========================================================================
     Event Handlers
     ========================================================================== */

  /**
   * Finalizes book registration.
   * 1. Constructs FormData for multi-part (image + metadata) submission.
   * 2. Registers book details.
   * 3. Links selected genres to the new book.
   * 4. Redirects to book list on success.
   */
  const onSubmit = async () => {
    const genres = genreList.join(",")

    const payload = new FormData();
    payload.append("title", title);
    payload.append("author", author);
    payload.append("publisher", publisher);
    payload.append("isbn", isbn);
    payload.append("copies", copies);
    payload.append("description", description);
    payload.append("genres", genres);
    payload.append("imageFile", imageFile);
    payload.append("staffId", STAFF_ID);


    console.table(payload);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const config = { headers: { "Authorization": `Bearer ${currentUser.token}` } };

    const response = await axios.post("http://localhost:7070/book/add", payload, config)

    await axios.post("http://localhost:7070/staff/genre", { bookId: response.data.bookId, genres }, config)

    navigate('/staff/books')
    toast.success("Added a book")
  }


  console.log(genreList)

  const options = [
    { value: 6, label: "Biography & Memoir" },
    { value: 7, label: "Business & Economics" },
    { value: 3, label: "Fantasy" },
    { value: 1, label: "Fiction" },
    { value: 9, label: "History" },
    { value: 2, label: "Non-Fiction" },
    { value: 8, label: "Philosophy" },
    { value: 10, label: "Programming & Technology" },
    { value: 12, label: "Psychology" },
    { value: 11, label: "Science" },
    { value: 4, label: "Science Fiction" },
    { value: 5, label: "Self-Help" }
  ];

  return (
    <div className='container mt-3'>
      <Title string={"Add a new book"} />
      <table>
        <tbody>
          <tr>
            <td rowSpan={2}>
              <div className='div-input position-relative'>
                {
                  data == 0 ? <div>
                    <img src={addImage} className='add-image' />
                    <div className='img-txt'>Add an image</div>
                  </div>
                    : <div>
                      <img src={addImageTicked} className='add-image' pos alt="" />
                      <div className='img-txt'>Added {file.length > 10 ? file.slice(0, 10) + "...." : file}</div>
                    </div>
                }
                <input type="file" className='position-absolute top-50 start-50 translate-middle input-file' onChange={(e) => {
                  setData(e.target.files.length)
                  if (e.target.files[0] != null) {
                    setFile(e.target.files[0].name)
                    setImageFile(e.target.files[0])
                  }
                }} />
              </div>
            </td>

            <td colSpan={1} style={{ width: "100%" }}>
              <div className="form-floating mb-3">
                <input type="text" onChange={e => setTitle(e.target.value)} className="form-control" id="titleInput" placeholder="Title" />
                <label htmlFor="titleInput">Title</label>
              </div>
            </td>
          </tr>

          <tr>
            <td colSpan={1} style={{ width: "100%" }}>
              <div className="form-floating mb-3">
                <input type="text" onChange={e => setAuthor(e.target.value)} className="form-control" id="publisherInput" placeholder="Publisher" />
                <label htmlFor="publisherInput">Author</label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="publisherInput" placeholder="Publisher" onChange={e => setPublisher(e.target.value)} />
        <label htmlFor="publisherInput">Publisher</label>
      </div>
      <div className="row g-3">
        <div className="col">
          <div className="form-floating mb-3">
            <input type="number" className="form-control" id="publisherInput" placeholder="Publisher" onChange={e => setCopies(e.target.value)} />
            <label htmlFor="publisherInput">No: of Copies</label>
          </div>
        </div>
        <div className="col"><div className="form-floating mb-3">
          <input type="text" className="form-control" id="publisherInput" placeholder="Publisher" onChange={e => setIsbn(e.target.value)} />
          <label htmlFor="publisherInput">ISBN</label>
        </div>
        </div>

      </div>




      <Select
        options={options}
        isMulti
        placeholder="Choose Genre's..."
        onChange={e => setGenreList(e.map(a => a.value))}
      />

      <div className="form-floating mb-3 mt-3" style={{ zIndex: 0 }}>
        <div className="form-floating">
          <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px", resize: "none" }}
            onChange={e => setDescription(e.target.value)} ></textarea>
          <label htmlFor="floatingTextarea2">Description</label>
        </div>
      </div>


      <button className='btn btn-outline-success mb-5' onClick={onSubmit}>Submit</button>
    </div>
  )
}

export default AddBooks
