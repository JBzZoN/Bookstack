import React from 'react'
import { bookData } from './../../../dummy-data/book-data';
import { Link } from 'react-router-dom';
import './all-books.css'
import { toast } from 'react-toastify';

function AllBooks() {

    const onRemove = () => {
        toast.info("Removal request sent")
    }

  return (
    <div className='container mb-5'>
        <div className='row'>
            {bookData.results.map((e) => <div className='col d-flex justify-content-center mt-5' key={e.id}><div className="card" style={{width: "200px"}}>
                <img src={e.formats['image/jpeg']} className="card-img-top" style={{width:"100%", height: "200px"}} alt="..."/>
                <div className="card-body">
                    <h5 className="card-title small-text">{e.title}</h5>
                    <p className="card-text small-text">{e.summaries[0].split(" ").slice(0, 10).join(" ") + "..."}</p>
                </div>
                <div className='card-footer d-flex justify-content-between' id='card-footer'>
                    <Link href="#" className="btn btn-primary smaller-text">More info</Link>
                    <Link href="#" className="btn btn-danger smaller-text" onClick={onRemove}>Remove</Link>
                </div>
                </div></div>)}
            </div>
        </div>
  )
}

export default AllBooks
