import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'

export default function Dashboard() {
  const {setRoute} = useOutletContext()
  useEffect(()=>{
    setRoute('dashboard')
  },[])
  return (
    <div>Dashboard</div>
  )
}
