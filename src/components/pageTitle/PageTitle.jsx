import React from 'react'
import './pageTitle.css'

export default function PageTitle({title}) {
  return (
    <div className='pageTitle'>
        <h1 className='titleH'>{title}</h1>
    </div>
  )
}
