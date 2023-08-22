import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'

export default function Student() {
    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('student')
    },[])
  return (
    <div>Ucenik</div>
  )
}
