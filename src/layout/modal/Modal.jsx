import React, { useEffect } from 'react'
import './modal.css'
export default function Modal({component, setModalClose}) {
    // In file were we call Modal, ModalBox shoud be set: position: relative
    // because we set modal position to absolute!!

  return (<div >
    <div onClick={()=>{setModalClose(false)}} className="closeModal"></div>
    <div className='modal'>
        {component}
    </div></div>
  )
}
