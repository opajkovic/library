import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'

export default function Bibliotekari() {
    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('bibliotekari')
    },[])
  return (
    <div>Bibliotekari</div>
  )
}
