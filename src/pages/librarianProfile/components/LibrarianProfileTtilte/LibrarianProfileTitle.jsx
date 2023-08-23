import React from 'react'
import './ibrarianProfileTitle.css'
import { Link, useParams } from 'react-router-dom'
import {FaEdit, FaEllipsisV, FaRedo, FaTrash} from 'react-icons/fa'
import { useState } from 'react';
import Modal from '../../../../layout/modal/Modal';
import ModalItem from '../../../../components/modalItem/ModalItem';

export default function LibrarianProfileTitle() {
  const params = useParams();
  let [openModule, setOpenModule] = useState(false)
  return (
    <div className='LPtitle'>
      <div className="left">
        <h1 className="name">Valentina Kascelan</h1>
        <div className="subtitle">
          <Link to={'/librarians'}>Svi bibliotekari</Link> 
          <span>/</span>
          <Link to={`/librarianProfile/${params.id}`}>ID - {params.id}</Link>
        </div>
      </div>
      <div className="right">
        <p className="izmijeni"><FaRedo />Resetuj sifru</p>
        <Link to={`izmeniPodatke`} className="izmijeni"><FaEdit />Izmeni podatke</Link>
        <div className="moduleBox">
          <FaEllipsisV onClick={()=>{setOpenModule(!openModule)}} />
          {openModule ? <Modal component={<div>
            <ModalItem icon={<FaTrash />} text={'Izbrisi korisnika'} />
          </div>} /> : <></>}
        </div>
      </div>
    </div>
  )
}
