import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import PageTitle from '../../components/pageTitle/PageTitle'

export default function Settings() {

    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('settings')
    },[])

  return (
    <div>
    <PageTitle title="Settings" /></div>
  )
}
