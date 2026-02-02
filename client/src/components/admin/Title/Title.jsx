import React from 'react'
import './Title.css'
<style>
    
</style>

function Title({ string }) {
  return (
    <div className="title-wrapper">
      <h1 className="page-title">{string}</h1>
    </div>
  )
}

export default Title