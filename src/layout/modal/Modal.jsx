import React from 'react'
import './modal.css'
export default function Modal({component}) {
    // In file were we call Modal, ModalBox shoud be set: position: relative
    // because we set modal position to absolute!!
  return (
    <div className='modal'>
        {component}
    </div>
  )
}
