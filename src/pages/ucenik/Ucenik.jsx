import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'

export default function Ucenik() {
    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('ucenik')
    },[])
  return (
    <div>Ucenik</div>
  )
}
