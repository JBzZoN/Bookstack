import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './all-books.css'
import axios from "axios"
import { toast } from 'react-toastify';
import Title from '../../../components/staff/title/title';
function AllBooks() {

    const onRemove = () => {
        toast.info("Removal request sent")
    }
    const navigate = useNavigate()

    const [bookData, setBookData] = useState([])

    async function getAllBooks() {
        const response = await axios.get("http://localhost:8080/staff/books");
        const data = response.data
        setBookData(data)
    }
    console.log(bookData)
    useEffect(() => {
        getAllBooks()
    }, [])

    return (
        <div className='container mb-5'>
            <Title string={"All books"}/>
            <div className='row'>
                {bookData.map((e) => <div className='col d-flex justify-content-center mt-3' key={e.bookId}><div className="card" style={{width: "200px"}}>
                    <img src={e.image} className="card-img-top" style={{width:"100%", height: "200px"}} alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title small-text">{e.title}</h5>
                        <p className="card-text small-text">{e.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
                    </div>
                    <div className='card-footer d-flex justify-content-between' id='card-footer'>
                        <button to="" className="btn btn-primary smaller-text" onClick={() => {
            navigate("/staff/books/profile", {state:{book: e}})
        }}>More info</button>
                        <button className="btn btn-danger smaller-text" onClick={onRemove}>Remove</button>
                    </div>
                    </div></div>)}
                </div>
            </div>
    )
    }

export default AllBooks