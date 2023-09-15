import React from 'react'
import './confirmModal.css'
import Button from '../../../components/UI/Button'
import { FaCheck, FaTimes } from 'react-icons/fa'

export default function ConfirmModal({text, setCloseModal, handleDelete }) {
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
                <Button function={setCloseModal} btn="btn btn-danger" children={<>Ne <FaTimes /></>}  />
                <Button btn="btn btn-success" function={handleDelete} children={<>Da <FaCheck /></>}  />
            </div>
        </div>
    </div>
  )
}
