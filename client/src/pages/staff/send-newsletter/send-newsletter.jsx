import React, { useState } from 'react'
import "./send-newsletter.css"
import sendImage from "../../../assets/staff/send_paper.png"
import {toast} from "react-toastify"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function SendNewsletter() {

  const [emailBody, setEmailBody] = useState("")

  const navigate = useNavigate()

  const generateTemplate = () => {
    setEmailBody(`📚 BOOKSTACK Library Newsletter

Issue #1 | Knowledge. Community. Growth.

🌟 Welcome to BOOKSTACK

Welcome to BOOKSTACK, your space for learning, imagination, and growth.
Whether you’re a student, researcher, or casual reader, BOOKSTACK is built to make knowledge accessible, organized, and enjoyable.

Our mission is simple:

To connect readers with the right books at the right time.

📖 What’s New at BOOKSTACK?
🔹 New Book Arrivals

We’ve added a fresh collection across multiple genres:

Academic & reference books

Technology & programming

Fiction & non-fiction

Self-development and biographies

👉 Visit the library or check availability online to reserve your copy.

🔹 Smart Borrowing Made Easy

With BOOKSTACK, members can now:

View book availability instantly

Rent, renew, and return books smoothly

Track due dates and avoid late fees

📌 Our system is designed to save you time and effort.

⏰ Reminder: Due Dates Matter!

Please remember to return or renew books on time to help fellow readers enjoy uninterrupted access.

📅 Need more time?
👉 Renew your books before the due date.

📢 Upcoming Highlights

📚 Monthly reading recommendations

🧠 Curated lists for exams & projects

✍️ Reader reviews & book discussions

🎓 Academic resources for students

Stay tuned — there’s more coming your way!

🤝 Be Part of the BOOKSTACK Community

We believe a library is more than shelves and books — it’s a community of learners.

Have suggestions?

Books you’d like us to add?

Features you want to see?

📩 Let us know — your feedback helps us grow.

📍 Visit Us

📌 BOOKSTACK Library
🕘 Open: Monday – Saturday
🌐 Online access available for members

📬 Stay Connected

Follow our updates and never miss a new addition or announcement.

Happy Reading!
— Team BOOKSTACK 📘

      `)
  }

  const sendEmail = async () => {
    navigate("/staff/books")
    toast.success("Email Sent!")
    await axios.post("http://localhost:7070/staff/email", {email: emailBody}, {headers: {"Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`}})
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

export default SendNewsletter
