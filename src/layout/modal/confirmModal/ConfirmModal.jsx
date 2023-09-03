import React from 'react'
import './confirmModal.css'
import Button from '../../../components/UI/Button'
import { FaCheck, FaTimes } from 'react-icons/fa'

export default function ConfirmModal({text, setCloseModal, setResponse}) {
    let closeModalBackground = (e) =>{
        if(e.target.className == "confirmModal"){
            setCloseModal(false)
        }
    }
  return (
    <div onClick={closeModalBackground} className='confirmModal'>
        <div className="modalC">
            <h1>{text}</h1>
            <div className="modalButtons">
                <Button onClick={()=>{setCloseModal(false)}} btn="btn btn-danger" children={<>Ne <FaTimes /></>}  />
                <Button btn="btn btn-success" children={<>Da <FaCheck /></>}  />
            </div>
        </div>
    </div>
  )
}
