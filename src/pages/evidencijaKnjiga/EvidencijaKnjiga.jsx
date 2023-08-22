import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'

export default function evidencijaKnjiga() {
    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('evidencijaKnjiga')
    },[])
  return (
    <div>EvidencijaKnjiga</div>
  )
}
