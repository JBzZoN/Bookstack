import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Title from '../../../components/staff/title/title';
import axios from "axios"
import "./rent-renew-return.css"

function RentRenewReturn() {

  // ⚠️⚠️⚠️⚠️⚠️⚠️⚠️
  const STAFF_ID = 4;
  // ⚠️⚠️⚠️⚠️⚠️⚠️⚠️

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
      const response = await axios.post("http://localhost:7070/staff/search/user", {"search" : value}, {headers: {"Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`}})
      setSearchResults(response.data)
      setOnSearch(false)
    }, 500);
  }

  // Book searching code
  const [rows, setRows] = useState([{
    recordType: "Rent",
    onBookSearch: false,
    searchBookResults: [],
    searchBookBarOn: false,
    searchBookString: "",
    searchResultBook: null,
    numberOfCopies: 0
  }])

  const setRecordType = (value, index) => {
    let temp = [...rows]
    temp[index].recordType = value
    setRows(temp) 
  };

  const setOnBookSearch = (value, index) => {
    let temp = [...rows]
    temp[index].onBookSearch = value
    setRows(temp) 
  };

  
  const setNumberOfCopies = (value, index) => {
    let temp = [...rows]
    temp[index].numberOfCopies = value
    setRows(temp) 
  };

  const setSearchBookResults = (value, index) => {
    let temp = [...rows]
    temp[index].searchBookResults = value
    setRows(temp)
  };
  const setSearchBookBarOn = (value, index) => {
    let temp = [...rows]
    temp[index].searchBookBarOn = value
    setRows(temp)
  };
  const setSearchBookString = (value, index) => {
    let temp = [...rows]
    temp[index].searchBookString = value
    setRows(temp)
  };
  const setSearchResultBook = (value, index) => {
    let temp = [...rows]
    temp[index].searchResultBook = value
    setRows(temp)
  };

  const addRows = () => {
    let temp = [...rows]
    temp.push({
      recordType: "Rent",
      onBookSearch: false,
      searchBookResults: [],
      searchBookBarOn: false,
      searchBookString: "",
      searchResultBook: null,
      numberOfCopies: 0
    })
    setRows(temp)
  }

  const removeRows = () => {
    let temp = [...rows]
    temp.pop()
    setRows(temp)
  }

  const navigate = useNavigate()

  const onVerify = async () => {
    console.log("Verify clicked")
  }

  const onSubmit = async () => {

    if(searchResultUser == null) {
      toast.error("No member selected")
      return;
    }

    const output = {
      staffId: STAFF_ID,
      memberId: searchResultUser.userId,
      records: []
    } 

    for(let a of rows) {
      if(a.searchResultBook == null) {
        toast.error("No book selected")
        return;
      }else if(a.numberOfCopies == null) {
        toast.error("Invalid number of copies")
        return;
      }else if(a.numberOfCopies <= 0) {
        toast.error("Invalid number of copies")
        return;
      }else {
        if(a.recordType=="Rent") {
          
          // check if that number of books are available in book_table
          const response = await axios.post("http://localhost:7070/book/id", {bookId: a.searchResultBook.bookId}, {headers: {"Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`}})

          const {noOfCopiesRemaining} = response.data


          if(a.numberOfCopies > noOfCopiesRemaining) {
            toast.warning("Only " + noOfCopiesRemaining + " copies are present for the book '" + a.searchResultBook.title + "'")
            return;
          }
          // reduce number of books remaining (- copies) in book_table
          // by default returned is 0
          const response2 = await axios.put("http://localhost:7070/book/id", {bookId: a.searchResultBook.bookId, noOfCopiesRemaining: noOfCopiesRemaining-a.numberOfCopies}, {headers: {"Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`}})


        }else if(a.recordType == "Renew") {

          // on renew or return disable the copies entry bar and fetch and put the value there
          // there is no status as renew
          // just increment the due date

        }else if(a.recordType == "Return") {

          // increase number of books available (+ copies)
          // set returned to 1

        }
      }
    }

    rows.forEach(e => {
      output.records.push({
        status: e.recordType,
        bookId: e.searchResultBook.bookId,
        copies: e.numberOfCopies
      })
    })
    console.log(output)

    // const response = await axios.post("http://localhost:7070/staff/record", output, {headers: {"Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`}})

    // navigate('/staff/books')
    toast.success("Added a record")
  }

  function addForms() {
    let code = [];
    for(let i = 0; i < rows.length; i++) {
      code.push(<tr>
        <td>
          <div className="form-floating mb-3">
            <div className="dropdown">
              <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {rows[i].recordType}
              </button>

              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setRecordType("Rent", i)}
                  >
                    Rent
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setRecordType("Renew", i)}
                  >
                    Renew
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setRecordType("Return", i)}
                  >
                    Return
                  </button>
                </li>
              </ul>
            </div>
            
          </div>
  
        </td>
        <td>

          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
            value={rows[i].searchBookString}
            onChange={
              (e) => {
                setSearchBookString(e.target.value, i)
                const value = e.target.value
                if (value.length < 2) return;
                setOnBookSearch(true, i)
                const timer = setTimeout(async () => {
                  if(value.length < 2) return;
                  const response = await axios.post("http://localhost:7070/book/search", {"search" : value}, {headers: {"Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`}})
                  setSearchBookResults(response.data, i)
                  setOnBookSearch(false, i)
                }, 500);
              }

            } autoComplete="off"
            onFocus={() => setSearchBookBarOn(true, i)}
            onBlur={() => setTimeout(() => setSearchBookBarOn(false, i), 500)}/>
            <label htmlFor="floatingInput">{rows[i].searchResultBook?rows[i].searchResultBook.title: "Search for books based on isbn, title, author or publisher"}</label>

            {(rows[i].searchBookResults.length > 0) && (rows[i].searchBookBarOn) && (rows[i].searchBookString.length >= 2) && (
            <div
              className="list-group position-absolute shadow mt-1 w-100"
              style={{ zIndex: 1000 }}
            >
              {rows[i].searchBookResults.map((book, index) => (
                <div
                  key={book.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    setSearchResultBook(book, i)
                    setSearchBookString("", i)
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
            <input type="number" className="form-control" id="floatingInput" placeholder="name@example.com" 
            disabled={rows[i].recordType !== "Rent"}
            onChange={e=>setNumberOfCopies(e.target.value, i)}
            value={rows[i].recordType !== "Rent"? "" : rows[i].numberOfCopies}/>
            <label htmlFor="floatingInput">Count</label>
          </div>
        </td>
      </tr>)
    } 

    return code;
  }


return (
  <div className="container mt-3 mb-5 rent-container">

    <Title string={"Rent, renew or return"} />

    {/* MEMBER SEARCH */}
    <div className="card soft-card mb-4 position-relative">
      <div className="form-floating position-relative">
  <input
    type="text"
    className="form-control"
    id="floatingInput"
    placeholder="Search member"
    value={searchString}
    onChange={onSearchMember}
    autoComplete="off"
    onFocus={() => setSearchBarOn(true)}
    onBlur={() => setTimeout(() => setSearchBarOn(false), 500)}
  />
  <label htmlFor="floatingInput">
    {searchResultUser
      ? searchResultUser.name
      : "Search for members based on name, username or email"}
  </label>

  {(searchResults.length > 0) &&
    (searchBarOn) &&
    (searchString.length >= 2) && (
      <div className="list-group member-search-dropdown">
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

        
    </div>

    {/* ACTION BUTTONS */}
    <div className="d-flex justify-content-between mb-3">
      <button
        className="btn btn-outline-primary"
        onClick={addRows}
      >
        + Add more records
      </button>

      <button
        className="btn btn-outline-danger"
        onClick={() => {
          if (rows.length === 1) return
          removeRows()
        }}
      >
        − Remove last record
      </button>
    </div>

    {/* RECORDS TABLE */}
    <div className="card soft-card mb-4">
      <table className="table records-table align-middle">
        <thead>
          <tr>
            <th>Rent / Renew / Return</th>
            <th>Book</th>
            <th>Number of copies</th>
          </tr>
        </thead>
        <tbody>
          {addForms()}
        </tbody>
      </table>
    </div>

    <div className="d-flex justify-content-between align-items-center mb-5">
      <button
        className="btn btn-outline-success px-4"
        onClick={onVerify}
      >
        Verify
      </button>

      <button
        className="btn btn-outline-primary px-4"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>

    <div style={{ height: "200px" }}></div>
  </div>
)

}

export default RentRenewReturn
