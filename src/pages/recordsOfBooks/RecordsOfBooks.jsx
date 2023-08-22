import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'

export default function RecordsOfBooks() {
    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('recordsOfBooks')
    },[])
  return (
    <div>EvidencijaKnjiga</div>
  )
}
