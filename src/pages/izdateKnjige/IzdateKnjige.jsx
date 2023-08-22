import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'

export default function IzdateKnjige() {

    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('izdateKnjige')
    },[])

  return (
    <div>IzdateKnjige</div>
  )
}
