import React from 'react'
import './title.css'

function Title({ string }) {
  return (
    <div className="title-wrapper">
      <h1 className="page-title">{string}</h1>
    </div>
  )
}

export default Title
