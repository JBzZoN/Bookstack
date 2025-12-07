import React from 'react'
import { bookData } from "../../../dummy-data/book-data"
import { Link } from 'react-router-dom';

function Books() {
  return (
    <div className='container mt-5 mb-5'>  {/* ✅ added top margin */}
      <div className='row gx-3 gy-4'>
        {bookData.results.map((e) => (
          <div className='col-12 col-sm-6 col-md-3 d-flex justify-content-center' key={e.id}>
            
            <div 
              className="card"
              style={{
                width: "280px",
                borderRadius: "15px"
              }}
            >
              <img 
                src={e.formats['image/jpeg']} 
                className="card-img-top" 
                style={{ 
                  height: "200px",
                  objectFit: "cover" 
                }} 
                alt="..." 
              />

              {/* Card body */}
              <div 
                className="card-body"
                style={{ 
                  padding: "8px"
                }}
              >
                <h6 className="card-title mb-1">{e.title}</h6>

                <p 
                  className="card-text"
                  style={{ 
                    fontSize: "12px",
                    marginBottom: "6px"
                  }}
                >
                  {e.summaries[0].split(" ").slice(0, 12).join(" ") + "..."}
                </p>
              </div>

              {/* Card footer – fixed spacing */}
              <div 
                className='d-flex justify-content-center'
                style={{ 
                  paddingBottom: "10px"   // controls bottom white space only
                }}
              >
                <Link to="#" className="btn btn-sm btn-primary">
                  More info
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books
