import React from 'react'
import './profileTitle.css'
import { Link, useParams } from 'react-router-dom'
import {FaEdit, FaEllipsisV, FaRedo, FaTrash} from 'react-icons/fa'
import { useState } from 'react';
import Modal from '../modal/Modal'
import ModalItem from '../modal/modalItem/ModalItem'

export default function ProfileTitle({linkOne,linkOnePath, linkTwoPath}) {
  const params = useParams();
  let [openModule, setOpenModule] = useState(false)

  let closeModals = () =>{
    setOpenModule(false)
  }
  return (
    <div className='LPtitle'>
      <div className="left">
        <h1 className="name">Valentina Kascelan</h1>
        <div className="subtitle">
          <Link to={`${linkOnePath}`}>{linkOne}</Link> 
          <span>/</span>
          <Link to={`${linkTwoPath}${params.id}`}>ID - {params.id}</Link>
        </div>
      </div>
      <div className="right">
        <p className="izmijeni"><FaRedo />Resetuj sifru</p>
        <Link to={`/izmijeniPodatke`} className="izmijeni"><FaEdit />Izmeni podatke</Link>
        <div className="moduleBox">
          <FaEllipsisV onClick={()=>{setOpenModule(!openModule)}} />
          {openModule ? <Modal component={<div>
            <ModalItem closeModals={closeModals} path={''} icon={<FaTrash />} text={'Izbrisi korisnika'} />
          </div>} /> : <></>}
        </div>
      </div>
    </div>
  )
}
