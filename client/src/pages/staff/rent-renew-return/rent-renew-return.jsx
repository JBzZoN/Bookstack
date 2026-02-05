import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Title from '../../../components/staff/title/title';
import axios from "axios"
import "./rent-renew-return.css"

/**
 * RentRenewReturn Component
 * ==========================================================================
 * Core transaction page for Staff to manage book distributions.
 * 
 * Features:
 * - Dynamic Member Search: Debounced lookup for library members.
 * - Multi-Row Transactions: Supports multiple rent/renew/return actions in one session.
 * - Fine Management: Automatically checks for and displays overdue fines.
 * - Validation: Verifies rent limits, book availability, and renewal eligibility.
 * - Integration: Orchestrates complex multi-endpoint updates for inventory and records.
 *
 * @component
 * @returns {JSX.Element} The transaction management interface.
 */
function RentRenewReturn() {

  /* ==========================================================================
     State Management
     ========================================================================== */

  // TODO: Securely handle staff context from login
  const STAFF_ID = 4;

  // Fine status
  const [fine, setFine] = useState(0)
  const [finePaid, setFinePaid] = useState(false)

  // Member Search State
  const [onSearch, setOnSearch] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [searchBarOn, setSearchBarOn] = useState(false)
  const [searchString, setSearchString] = useState("")

  // Active Member Context
  const [searchResultUser, setSearchResultUser] = useState(null)

  /* ==========================================================================
     Member Search Logic
     ========================================================================== */

  /**
   * Handles debounced member lookup.
   * @param {Event} e - Input change event.
   */
  const onSearchMember = (e) => {
    setFinePaid(false)
    setSearchString(e.target.value)
    const value = e.target.value
    if (value.length < 2 || onSearch == true) return;
    setOnSearch(true)
    const timer = setTimeout(async () => {
      if (value.length < 2) return;
      console.log("Searching user:", value)
      const response = await axios.post("http://localhost:7070/staff/search/user", { "search": value }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })
      console.log("Found users:", response.data)
      setSearchResults(response.data)
      setOnSearch(false)
    }, 500);
  }

  /* ==========================================================================
     Dynamic Row Management (Book Search)
     ========================================================================== */

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

  /* ==========================================================================
     Validation & Verification
     ========================================================================== */

  /**
   * Verifies all items in the current session.
   * - Calculates fines for overdues across all selected books.
   * - Validates eligibility for renewals and returns.
   * - Checks physical stock availability for rentals.
   */
  const onVerify = async () => {
    if (searchResultUser == null) {
      toast.error("No member selected")
      return;
    }

    // check if that member is on fine if its on fine then display the fine and open a payment gateway staff will ask member to pay fine
    const response = await axios.post("http://localhost:7070/staff/fine", { memberId: searchResultUser.userId }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })

    const FINE_PER_DAY = 5;
    const today = new Date();

    let fineVar = 0;

    for (let a of response.data) {
      const dueDate = new Date(a.dueDate);

      // calculate difference in days
      const diffTime = today - dueDate;
      const daysOverdue = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (daysOverdue > 0) {
        fineVar += daysOverdue * FINE_PER_DAY * a.numberOfCopies;
      }
    }

    if (fineVar > 0) {
      let fineRows = [];

      for (let a of response.data) {

        const response = await axios.post("http://localhost:7070/book/bookFromId", { bookId: a.bookId }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })
        fineRows.push({
          recordType: "Return",
          onBookSearch: false,
          searchBookResults: [],
          searchBookBarOn: false,
          searchBookString: "",
          searchResultBook: response.data[0],
          numberOfCopies: a.numberOfCopies
        })
      }

      setRows(fineRows)
    }

    setFine(fineVar)
    if (fineVar > 0 && finePaid == false) {
      setFinePaid(false)
      toast.warning("Fine unpaid")
      return;
    }


    for (let a of rows) {
      if (a.searchResultBook == null) {
        toast.error("No book selected")
        return;
      } else if (a.numberOfCopies == null && a.recordType == "Rent") {
        toast.error("Invalid number of copies")
        return;
      } else if (a.numberOfCopies <= 0 && a.recordType == "Rent") {
        toast.error("Invalid number of copies")
        return;
      } else {
        if (a.recordType == "Rent") {

          // check if that number of books are available in book_table
          const response = await axios.post("http://localhost:7070/book/id", { bookId: a.searchResultBook.bookId }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })

          const { noOfCopiesRemaining } = response.data


          if (a.numberOfCopies > noOfCopiesRemaining) {
            toast.warning("Only " + noOfCopiesRemaining + " copies are present for the book '" + a.searchResultBook.title + "'")
            return;
          }

        } else if (a.recordType == "Renew") {

          const response4 = await axios.post("http://localhost:7070/staff/renew-logic/verify", { bookId: a.searchResultBook.bookId, memberId: searchResultUser.userId, copyCount: a.numberOfCopies }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })

          if (response4.data.status == "Valid") {
            let updatedRows = [...rows];

            for (let i = 0; i < updatedRows.length; i++) {
              if (
                updatedRows[i].searchResultBook &&
                updatedRows[i].searchResultBook.bookId === a.searchResultBook.bookId
              ) {
                updatedRows[i].numberOfCopies = response4.data.copyCount;
              }
            }

            setRows(updatedRows);
          } else {
            toast.error("Invalid Renew")
            return;
          }

          console.log(response4.data)

        } else if (a.recordType == "Return") {
          const response4 = await axios.post("http://localhost:7070/staff/return-logic/verify", { bookId: a.searchResultBook.bookId, memberId: searchResultUser.userId, copyCount: a.numberOfCopies }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })

          if (response4.data.status == "Valid") {
            let updatedRows = [...rows];

            for (let i = 0; i < updatedRows.length; i++) {
              if (
                updatedRows[i].searchResultBook &&
                updatedRows[i].searchResultBook.bookId === a.searchResultBook.bookId
              ) {
                updatedRows[i].numberOfCopies = response4.data.copyCount;
              }
            }

            setRows(updatedRows);
          } else {
            toast.error("Invalid Renew")
            return;
          }

          console.log(response4.data)
        }
      }
    }
  }

  /* ==========================================================================
     Submission Logic
     ========================================================================== */

  /**
   * Finalizes the transaction session.
   * 1. Re-verifies fines and selection status.
   * 2. Categorizes records (Rent, Renew, Return).
   * 3. Validates aggregate limits (Membership-based).
   * 4. Multi-step API orchestration:
   *    - Update inventory counts.
   *    - Link member-book associations.
   *    - Create permanent transaction records.
   */
  const onSubmit = async () => {

    if (searchResultUser == null) {
      toast.error("No member selected")
      return;
    }


    // check if that member is on fine if its on fine then display the fine and open a payment gateway staff will ask member to pay fine
    const response = await axios.post("http://localhost:7070/staff/fine", { memberId: searchResultUser.userId }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })

    const FINE_PER_DAY = 5;
    const today = new Date();

    let fineVar = 0;

    for (let a of response.data) {
      const dueDate = new Date(a.dueDate);

      // calculate difference in days
      const diffTime = today - dueDate;
      const daysOverdue = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (daysOverdue > 0) {
        fineVar += daysOverdue * FINE_PER_DAY * a.numberOfCopies;
      }
    }

    if (fineVar > 0) {
      let fineRows = [];

      for (let a of response.data) {

        const response = await axios.post("http://localhost:7070/book/bookFromId", { bookId: a.bookId }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })
        fineRows.push({
          recordType: "Return",
          onBookSearch: false,
          searchBookResults: [],
          searchBookBarOn: false,
          searchBookString: "",
          searchResultBook: response.data[0],
          numberOfCopies: a.numberOfCopies
        })
      }

      setRows(fineRows)
    }

    setFine(fineVar)
    if (fineVar > 0 && finePaid == false) {
      setFinePaid(false)
      toast.warning("Fine unpaid")
      return;
    }

    const output = {
      staffId: STAFF_ID,
      memberId: searchResultUser.userId,
      records: []
    }


    let renewSelected = 0;
    let rentSelected = 0;

    rows.forEach(e => {
      if (e.recordType == "Return") {
        output.records.push({
          status: "Returned",
          bookId: e.searchResultBook.bookId,
          copies: e.numberOfCopies
        })
      } else if (e.recordType == "Rent") {
        output.records.push({
          status: e.recordType,
          bookId: e.searchResultBook.bookId,
          copies: e.numberOfCopies
        })
        rentSelected += Number.parseInt(e.numberOfCopies);
      } else {
        renewSelected += Number.parseInt(e.numberOfCopies);
      }
    })

    // check if rent count is valid rent count(member table) + num of copies rent in this record <= rent limit(membership data table)
    const response1 = await axios.post("http://localhost:7070/staff/rent-count/valid", { memberId: searchResultUser.userId, rentSelected }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })

    if (response1.data == false) {
      toast.error("Member cannot rent that many books")
      return;
    }

    // check if renew count is valid renew count(member table) + num of copies renew in this record <= renew limit(membership data table)
    const response2 = await axios.post("http://localhost:7070/staff/renew-count/valid", { memberId: searchResultUser.userId, renewSelected }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })

    if (response2.data == false) {
      toast.error("Member cannot renew that many books")
      return;
    }
    console.log(output)

    for (let a of rows) {
      if (a.searchResultBook == null) {
        toast.error("No book selected")
        return;
      } else if (a.numberOfCopies == null) {
        toast.error("Invalid number of copies")
        return;
      } else if (a.numberOfCopies <= 0) {
        toast.error("Invalid number of copies")
        return;
      } else {
        if (a.recordType == "Rent") {

          // check if that number of books are available in book_table
          const response2 = await axios.post("http://localhost:7070/book/id", { bookId: a.searchResultBook.bookId }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })

          const { noOfCopiesRemaining } = response2.data

          if (a.numberOfCopies > noOfCopiesRemaining) {
            toast.warning("Only " + noOfCopiesRemaining + " copies are present for the book '" + a.searchResultBook.title + "'")
            return;
          }
          // reduce number of books remaining (- copies) in book_table
          // by default returned is 0
          const response3 = await axios.put("http://localhost:7070/book/id", { bookId: a.searchResultBook.bookId, noOfCopiesRemaining: noOfCopiesRemaining - a.numberOfCopies }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })

          // update all minor tables assoicated with rent like member_book_table
          const response4 = await axios.post("http://localhost:7070/staff/rent-logic", { bookId: a.searchResultBook.bookId, memberId: searchResultUser.userId, copyCount: a.numberOfCopies }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })
          console.log(response4.data)

        } else if (a.recordType == "Renew") {

          const response4 = await axios.post("http://localhost:7070/staff/renew-logic/submit", { bookId: a.searchResultBook.bookId, memberId: searchResultUser.userId, copyCount: a.numberOfCopies }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })

          if (response4.data.status == "Invalid") {
            toast.error("Invalid Renew")
            return;
          }

          console.log(response4.data)

        } else if (a.recordType == "Return") {
          const response4 = await axios.post("http://localhost:7070/staff/return-logic/submit", { bookId: a.searchResultBook.bookId, memberId: searchResultUser.userId, copyCount: a.numberOfCopies }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })

          if (response4.data.status == "Invalid") {
            toast.error("Invalid Renew")
            return;
          }

          console.log(response4.data)
        }
      }
    }

    // all records are directly put on here !
    const response3 = await axios.post("http://localhost:7070/staff/record", output, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })

    navigate('/staff/books')
    toast.success("Added a record")
  }

  function addForms() {
    let code = [];
    for (let i = 0; i < rows.length; i++) {
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
                    if (value.length < 2) return;
                    const response = await axios.post("http://localhost:7070/book/search", { "search": value }, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } })
                    setSearchBookResults(response.data, i)
                    setOnBookSearch(false, i)
                  }, 500);
                }

              } autoComplete="off"
              onFocus={() => setSearchBookBarOn(true, i)}
              onBlur={() => setTimeout(() => setSearchBookBarOn(false, i), 500)} />
            <label htmlFor="floatingInput">{rows[i].searchResultBook ? rows[i].searchResultBook.title : "Search for books based on isbn, title, author or publisher"}</label>

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
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Count"
              value={rows[i].numberOfCopies === 0 ? "" : rows[i].numberOfCopies}
              disabled={rows[i].recordType !== "Rent"}
              onChange={e => setNumberOfCopies(e.target.value, i)}
            />

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

          {console.log("Render Check:", { len: searchResults.length, barOn: searchBarOn, strLen: searchString.length, zIndex: 1000 })}
          {(searchResults.length > 0) &&
            (searchBarOn) &&
            (searchString.length >= 2) && (
              <div className="list-group position-absolute shadow mt-1 w-100" style={{ zIndex: 1000 }}>
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

      {fine > 0 && (
        <div className="card soft-card mb-4 border-warning">
          <div className="card-body d-flex justify-content-between align-items-center">

            <div>
              <h5 className="mb-1 text-warning">⚠ Fine Pending</h5>
              <p className="mb-0">
                Amount to be paid: <strong>₹{fine}</strong>
              </p>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="finePaidCheck"
                checked={finePaid}
                onChange={(e) => setFinePaid(e.target.checked)}
              />
              <label className="form-check-label fw-semibold" htmlFor="finePaidCheck">
                Fine Paid
              </label>
            </div>

          </div>
        </div>
      )}


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
          Verify Fine, Renew, and Return
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