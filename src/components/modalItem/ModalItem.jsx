import React from 'react'
import './modalItem.css'
export default function ModalItem({icon, text, path}) {
  return (
    <div className='modalItem'>
        {icon}
        <p>{text}</p>
    </div>
  )
}
