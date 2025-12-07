import React from 'react'
import "./send-newsletter.css"
import sendImage from "../../../assets/staff/send_paper.png"
import {toast} from "react-toastify"

function SendNewsletter() {

  const sendEmail = () => {
    toast.success("Email Sent!")
  }

  return (
    <div className='container whole-container mb-5'>
        <div className="card profile text-center w-100">
            <h6 className='card-header display-6 text-send'>
              Send newsletter
            </h6>
            <div className="card-body">
                <h5 className="card-title display-6 text-send-2">Add content below</h5>
                <div className="form-floating mt-4">
                  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "300px", resize: "none"}}></textarea>
                  <label htmlFor="floatingTextarea2">Content to mail</label>
                </div>

                <button className='btn btn-primary mt-3 send-button button-out' onClick={sendEmail}><img src={sendImage} className='send-image'/><span className='text-inside'>Send to all members</span></button>
            </div>
            </div>
    </div>
  )
}

export default SendNewsletter
