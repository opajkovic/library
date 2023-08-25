import React, { useEffect } from 'react'
import './pismo.css'
import PageTitle from '../../../../components/pageTitle/PageTitle'
import Menu from '../../layouts/menu/Menu'
import { useOutletContext } from 'react-router'

export default function Pismo() {
  const {setRoute} = useOutletContext()
  useEffect(()=>{
    setRoute('settings')
  },[])
  return (
    <div>
    <PageTitle title="Settings" />
    <Menu selectedSettings={'pismo'} /></div>
  )
}
