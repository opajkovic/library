import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import PageTitle from '../../components/pageTitle/PageTitle'

export default function Students() {
    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('student')
    },[])
  return (
    <div>
      <PageTitle title="Ucenici" />
    </div>
  )
}
 