import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Title from '../../../components/staff/title/title';
import axios from "axios"
import "./rent-renew-return.css"

function RentRenewReturn() {

  // member search
  const [onSearch, setOnSearch] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [searchBarOn, setSearchBarOn] = useState(false)
  const [searchString, setSearchString] = useState("")

  // final guy
  const [searchResultUser, setSearchResultUser] = useState(null)

  const onSearchMember = (e) => {
    setSearchString(e.target.value)
    const value = e.target.value
    if (value.length < 2 || onSearch == true) return;
    setOnSearch(true)
    const timer = setTimeout(async () => {
      if(value.length < 2) return;
      const response = await axios.post("http://localhost:8080/staff/search/user", {"search" : value})
      setSearchResults(response.data)
      setOnSearch(false)
    }, 500);
  }

  const [rows, setRows] = useState(1)

  // book search
  const [onBookSearch, setOnBookSearch] = useState(false)
  const [searchBookResults, setSearchBookResults] = useState([])
  const [searchBookBarOn, setSearchBookBarOn] = useState(false)
  const [searchBookString, setSearchBookString] = useState("")

  // final book
  const [searchResultBook, setSearchResultBook] = useState(null)
  
  const onSearchBook = (e) => {
    setSearchBookString(e.target.value)
    const value = e.target.value
    if (value.length < 2 || onBookSearch == true) return;
    setOnBookSearch(true)
    const timer = setTimeout(async () => {
      if(value.length < 2) return;
      const response = await axios.post("http://localhost:8080/staff/search/book", {"search" : value})
      setSearchBookResults(response.data)
      setOnBookSearch(false)
    }, 500);
  }

  const navigate = useNavigate()
  const onSubmit = () => {
    navigate('/staff/books')
    toast.success("Added a record")
  }

  function addForms() {
    let code = [];
    for(let i = 0; i < rows; i++) {
      code.push(<tr>
        <td>
          <div className="form-floating mb-3">
            <select id="inputState" className="form-select">
              <option>Rent</option>
              <option>Renew</option>
              <option>Return</option>
            </select>
            
            <label for="floatingInput">Rent, renew or return</label>
            
          </div>
  
        </td>
        <td>

          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
            value={searchBookString}
            onChange={onSearchBook} autoComplete="off"
            onFocus={() => setSearchBookBarOn(true)}
            onBlur={() => setTimeout(() => setSearchBookBarOn(false), 500)}/>
            <label htmlFor="floatingInput">{searchResultBook?searchResultBook.title: "Search for books based on isbn, title, author or publisher"}</label>

            {(searchBookResults.length > 0) && (searchBookBarOn) && (searchBookString.length >= 2) && (
            <div
              className="list-group position-absolute shadow mt-1 w-100"
              style={{ zIndex: 1000 }}
            >
              {searchBookResults.map((book, index) => (
                <div
                  key={book.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    setSearchResultBook(book)
                    setSearchBookString("")
                  }}
                >
                  <strong>{book.title}</strong><br />
                  <small className="text-muted">
                    {book.author} • {book.publisher} • {book.isbn}
                  </small>
                </div>
              ))}
            </div>
          )}
          </div>
          

        </td>
        <td>
          <div className="form-floating mb-3">
            <input type="number" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label htmlFor="floatingInput">Count</label>
          </div>
        </td>
      </tr>)
    } 

    return code;
  }

  return (

    <div className='container mt-3 mb-5'>
      <Title string={"Rent, renew or return"}/>
      <div className="form-floating mb-3">
      <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={searchString}
      onChange={onSearchMember} autoComplete="off"
      onFocus={() => setSearchBarOn(true)}
      onBlur={() => setTimeout(() => setSearchBarOn(false), 500)}
      />
      <label htmlFor="floatingInput">{searchResultUser?searchResultUser.name: "Search for members based on name, username or email"}</label>
      {(searchResults.length > 0) && (searchBarOn) && (searchString.length >= 2) && (
            <div
              className="list-group position-absolute shadow mt-1 w-100"
              style={{ zIndex: 1000 }}
            >
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    setSearchResultUser(user)
                    setSearchString("")
                  }}
                >
                  <strong>{user.name}</strong><br />
                  <small className="text-muted">
                    {user.username} • {user.email}
                  </small>
                </div>
              ))}
            </div>
          )}
    </div>
    

    
    <div className='d-flex justify-content-between'>
      <button className='btn btn-primary mb-4' onClick={() => {setRows(rows + 1)}}>Add more records</button>
      <button className='btn btn-danger mb-4' onClick={() => {if(rows == 1) return;setRows(rows - 1)}}>Remove last record</button>
    </div>
      <table className='table table-striped table-danger'>
      <thead>
        <tr>
          <th>Rent, renew or return</th>
        <th>Book</th>
        <th>Number of copies</th>
        </tr>
      </thead>
      <tbody>
        {addForms()}
      </tbody>
    </table>
    
      <button className='btn btn-primary mb-5' onClick={onSubmit}>Submit</button>
      <div style={{height: "200px"}}></div>
    </div>

  )
}

export default RentRenewReturn
