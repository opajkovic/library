import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'

export default function Authors() {
    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('authors')
    },[])
  return (
    <div>autori</div>
  )
}
