import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'

export default function Settings() {

    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('settings')
    },[])

  return (
    <div>Settings</div>
  )
}
