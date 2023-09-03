import React from 'react'
import './changePasswordModal.css'
import { FaCheck, FaTimes } from 'react-icons/fa'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'

export default function ChangePasswordModal({setModalClose}) {

    let closeModalBackground = (e) => {
        if(e.target.className == "passwordModal"){
            setModalClose(false)
        }
    }
  return (
    <div onClick={closeModalBackground} className='passwordModal'>
        <div className="modalP">
        <div className="modalTitle">
            <p className="text">Resetuj sifru: Valentina Kascelan</p>
            <FaTimes onClick={()=>{setModalClose(false)}} className='closeModalIcon' />
        </div>
        <div className="inputsModal">
            <Input input={{label: "Unesi novu sifru", type: "password", inputClass: "", placeholder: "", className:"input", defaultValue:"", name:""}}  />
            <Input input={{label: "Ponovi sifru", type: "password", inputClass: "", placeholder: "", className:"input", defaultValue:"", name:""}}  />
        </div>
        <div className="modalButtons">
            <Button onClick={()=>{setModalClose(false)}} children={<>Ponisti <FaTimes /></>} btn="btn btn-danger" />
            <Button children={<>Potvrdi <FaCheck /></>} btn="btn btn-success" />
        </div>
        </div>

    </div>
  )
}
