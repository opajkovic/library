import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'

export default function RentingBooks() {

    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('rentingBooks')
    },[])

  return (
    <div>IzdateKnjige</div>
  )
}
