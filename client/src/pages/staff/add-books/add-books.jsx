import React, { useState } from 'react'
import './add-books.css'
import addImage from "../../../assets/staff/add-button.png"
import addImageTicked from "../../../assets/staff/add-button-ticked.png"

function AddBooks() {

  const [data, setData] = useState(0)

  return (
    <div className='container mt-5'>
      <table>
      <tbody>
        <tr>
          <td rowSpan={2}>
            <div className='div-input position-relative'>
              {
                data == 0 ? <img src={addImage} className='add-image' pos alt=""/> 
                : <img src={addImageTicked} className='add-image' pos alt=""/>
              } 
              <input type="file" className='position-absolute top-50 start-50 translate-middle input-file' onChange={(e) => {
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
          <label htmlFor="publisherInput">Publisher</label>
        </div>
      </td>
    </tr>
      </tbody>
    </table>

      
      <div class="form-floating mb-3">
        <div class="form-floating">
          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px", resize: "none"}}></textarea>
          <label for="floatingTextarea2">Description</label>
        </div>
      </div>
    </div>
  )
}

export default AddBooks
