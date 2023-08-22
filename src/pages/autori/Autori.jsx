import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'

export default function Autori() {
    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('autori')
    },[])
  return (
    <div>autori</div>
  )
}
