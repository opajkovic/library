import React, { useEffect } from 'react'
import './izdavac.css'
import PageTitle from '../../../../components/pageTitle/PageTitle'
import Menu from '../../layouts/menu/Menu'
import { useOutletContext } from 'react-router'

export default function Izdavac() {
  const {setRoute} = useOutletContext()
  useEffect(()=>{
    setRoute('settings')
  },[])
  return (
    <div>
    <PageTitle title="Settings" />
    <Menu selectedSettings={'izdavac'} /></div>
  )
}
