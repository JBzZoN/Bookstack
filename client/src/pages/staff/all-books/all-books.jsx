import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './all-books.css'
import axios from "axios"
import { toast } from 'react-toastify';
import Title from '../../../components/staff/title/title';
function AllBooks() {

    const genreColorMap = {
        "Fantasy": "text-bg-primary",
        "Science Fiction": "text-bg-info",
        "Fiction": "text-bg-secondary",
        "Non-Fiction": "text-bg-dark",
        "History": "text-bg-warning",
        "Biography & Memoir": "text-bg-success",
        "Business & Economics": "text-bg-success",
        "Philosophy": "text-bg-light",
        "Psychology": "text-bg-info",
        "Programming & Technology": "text-bg-danger",
        "Science": "text-bg-primary",
        "Self-Help": "text-bg-warning"
    };

    const onRemove = () => {
        toast.info("Removal request sent")
    }
    const navigate = useNavigate()

    const [bookData, setBookData] = useState([])

    async function getAllBooks() {
        const response = await axios.get("http://localhost:7070/staff/books", {headers: {"Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`}});
        const data = response.data

        for (let i = 0; i < data.length; i++) {
            const response = await axios.get(
                "http://localhost:7070/staff/book/" + data[i].bookId
                , {headers: {"Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`}}
            );

            data[i].genreList = response.data;
        }
        setBookData(data)
    }

    console.log(bookData)
    useEffect(() => {
        getAllBooks()
    }, [])

    return (<div className='container mb-5'>

            <Title string={"All books"}/>
            <div className='row'>
                {bookData.map((e) => <div className='col d-flex justify-content-center mt-3' key={e.bookId}><div className="card" style={{width: "200px"}}>
                    <img src={e.image.startsWith("http") ? e.image : `http://localhost:7070/staff/image/${e.image}`} className="card-img-top" style={{width:"100%", height: "200px"}} alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title small-text" style={{height:"40px"}}>{e.title}</h5>
                        <p className="card-text small-text">
                            
                            {
                            e.genreList?.slice(0, 2).map((a, index) => (
                            <span
                            key={index}
                            className={`badge rounded-pill me-1 ${genreColorMap[a] || "text-bg-secondary"}`}
                            >
                            {a}
                            </span>
                        ))}
                        {
                            (e.genreList.length > 2) && <span
                            className={`badge rounded-pill me-1 text-bg-danger`}
                            >
                                ...
                            </span>
                        
                        }
                        </p>
                    </div>
                    <div className='card-footer d-flex justify-content-between' id='card-footer'>
                        <button to="" className="btn btn-primary smaller-text" onClick={() => {
            navigate("/staff/books/profile", {state:{book: e}})
        }}>More info</button>
                        <button className="btn btn-danger smaller-text" onClick={onRemove}>Remove</button>
                    </div>
                    </div></div>)}
                </div>

        </div>);        
    }
export default AllBooks