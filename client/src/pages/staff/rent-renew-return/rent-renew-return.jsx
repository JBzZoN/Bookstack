import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Title from '../../../components/staff/title/title';

function RentRenewReturn() {

  const [rows, setRows] = useState(1)
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
          <div class="form-floating mb-3">
            <select id="inputState" class="form-select">
              <option>Rent</option>
              <option>Renew</option>
              <option>Return</option>
            </select>
            
            <label for="floatingInput">Search for books</label>
          </div>
  
        </td>
        <td>

          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Search for books</label>
          </div>

        </td>
        <td>
          <div class="form-floating mb-3">
            <input type="number" class="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Count</label>
          </div>
        </td>
      </tr>)
    } 

    return code;
  }

  return (

    <div className='container mt-3'>
      <Title string={"Rent, renew or return"}/>
      <div class="form-floating mb-3">
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Search for member</label>
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
    
      <button className='btn btn-primary mb-4' onClick={onSubmit}>Submit</button>
    </div>

  )
}

export default RentRenewReturn
