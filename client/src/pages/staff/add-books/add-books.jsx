import React, { useState } from 'react'
import './add-books.css'
import addImage from "../../../assets/staff/add-button.png"
import addImageTicked from "../../../assets/staff/add-button-ticked.png"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Title from './../../../components/staff/title/title';

function AddBooks() {

  const [data, setData] = useState(0)
  const [file, setFile] = useState("")

  const navigate = useNavigate()
  const onSubmit = () => {
    navigate('/staff/books')
    toast.success("Added a book")
  }

  return (
    <div className='container mt-3'>
      <Title string={"Add a new book"}/>
      <table>
      <tbody>
        <tr>
          <td rowSpan={2}>
            <div className='div-input position-relative'>
              {
                data == 0 ? <div>
                  <img src={addImage} className='add-image' pos alt=""/> 
                <div className='img-txt'>Add an image</div>
                </div>
                : <div>
                  <img src={addImageTicked} className='add-image' pos alt=""/>
                  <div className='img-txt'>Added {file.length > 10 ? file.slice(0, 10) + "...." : file}</div>
                </div>
              } 
              <input type="file" className='position-absolute top-50 start-50 translate-middle input-file' onChange={(e) => {
                setFile(e.target.files[0].name)
                setData(e.target.files.length)
              }}/>
            </div>
          </td>

          <td colSpan={1} style={{ width: "100%" }}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="titleInput" placeholder="Title" />
          <label htmlFor="titleInput">Title</label>
        </div>
      </td>
    </tr>

    <tr>
      <td colSpan={1} style={{ width: "100%" }}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="publisherInput" placeholder="Publisher" />
          <label htmlFor="publisherInput">Author</label>
        </div>
      </td>
    </tr>
      </tbody>
    </table>
      <div className="form-floating mb-3">
          <input type="text" className="form-control" id="publisherInput" placeholder="Publisher" />
          <label htmlFor="publisherInput">Publisher</label>
        </div>
      <div class="row g-3">
        <div class="col">
          <div className="form-floating mb-3">
          <input type="number" className="form-control" id="publisherInput" placeholder="Publisher" />
          <label htmlFor="publisherInput">No: of Copies</label>
        </div>
        </div>
        <div class="col"><div className="form-floating mb-3">
          <input type="text" className="form-control" id="publisherInput" placeholder="Publisher" />
          <label htmlFor="publisherInput">ISBN</label>
        </div>
        </div>
        <div class="col"><div className="form-floating mb-3">
          <input type="text" className="form-control" id="publisherInput" placeholder="Publisher" />
          <label htmlFor="publisherInput">Edition</label>
        </div>
        </div>
      </div>

      <div class="form-floating mb-3">
        <div class="form-floating">
          <select class="form-select" style={{fontSize:"15px"}} id="specificSizeSelect"><option value="1">Fiction</option>
        <option value="2">Non-Fiction</option>
        <option value="3">Science Fiction</option>
        <option value="4">Fantasy</option>
        <option value="5">Mystery</option>
        <option value="6">Thriller</option>
        <option value="7">Horror</option>
        <option value="8">Romance</option>
        <option value="9">Historical Fiction</option>
        <option value="10">Young Adult</option>
        <option value="11">Children's Books</option>
        <option value="12">Biography</option>
        <option value="13">Autobiography</option>
        <option value="14">Self-Help</option>
        <option value="15">Health & Wellness</option>
        <option value="16">Science</option>
        <option value="17">Technology</option>
        <option value="18">Business & Economics</option>
        <option value="19">History</option>
        <option value="20">Philosophy</option>
        <option value="21">Psychology</option>
        <option value="22">Religion & Spirituality</option>
        <option value="23">Poetry</option>
        <option value="24">Art & Photography</option>
        <option value="25">Travel</option>
        <option value="26">Cookbooks</option>
        <option value="27">Comics & Graphic Novels</option>
        <option value="28">Education</option>
        <option value="29">Law</option>
        <option value="30">Politics & Social Sciences</option>
        <option value="31">True Crime</option>
        <option value="32">Short Stories</option>
        <option value="33">Anthology</option>
        <option value="34">Classic Literature</option>
        <option value="35">Adventure</option>
        <option value="36">Sports</option>
        <option value="37">Music</option>
        <option value="38">Nature & Environment</option>
        <option value="39">Parenting</option>
        <option value="40">Mathematics</option>

      </select>
          <label for="floatingTextarea2">Book Category</label>
        </div>
      </div>

      <div class="form-floating mb-3">
        <div class="form-floating">
          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px", resize: "none"}}></textarea>
          <label for="floatingTextarea2">Description</label>
        </div>
      </div>
      <button className='btn btn-success mb-5' onClick={onSubmit}>Submit</button>
    </div>
  )
}

export default AddBooks
