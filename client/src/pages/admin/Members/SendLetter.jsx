import React, { useState } from 'react'
import "./SendLetter.css"
import sendImage from "../../../assets/staff/send_paper.png"
import {toast} from "react-toastify"
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom';

function SendLetter() {

  const [emailBody, setEmailBody] = useState("")

  const navigate = useNavigate()

  const location = useLocation()
  const member = location.state?.member
  const Fine = location.state?.fine
  console.log(member.email)
  console.log(Fine)
  


  const generateTemplate = () => {
    setEmailBody(`Dear ${member.name},

We hope you are doing well.

This is a gentle reminder that there is a pending fine on your library account. As of today, the remaining amount is ₹${Fine}.

We kindly request you to clear the due amount at your earliest convenience to avoid any further inconvenience and to continue enjoying uninterrupted library services.

If you have already made the payment, please ignore this message. For any questions or assistance, feel free to contact us.

Thank you for your cooperation.

Warm regards,
Team BOOKSTACK

      `)
  }

  const sendEmail = async () => {
    navigate("/staff/books")
    toast.success("Email Sent!")
    await axios.post("http://localhost:7070/admin/sendfine", {email: emailBody,emailId:member.email}, {headers: {"Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`}})
  }

  return (
    <div className='container whole-container mb-5'>
        <div className="card profile text-center w-100">
            <h6 className='card-header display-6\ text-send'>
              Send newsletter
            </h6>
            <div className="card-body">
                <h5 className="card-title display-6 text-send-2">Add content below</h5>
                <div className="form-floating mt-4">
                  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "300px", resize: "none"}} onChange={(e) => {setEmailBody(e.target.value)}} value={emailBody}></textarea>
                  <label htmlFor="floatingTextarea2">Content to mail</label>
                </div>

                <div className="d-flex justify-content-center gap-3 mt-3">
  <button
    className='btn btn-primary send-button button-out'
    onClick={sendEmail}
  >
    <img src={sendImage} className='send-image'/>
    <span className='text-inside'>Send to all members</span>
  </button>

  <button
    className='btn btn-outline-secondary send-button'
    onClick={generateTemplate}
  >
    ✨ Generate template
  </button>
</div>

            </div>
            </div>
    </div>
  )
}

export default SendLetter