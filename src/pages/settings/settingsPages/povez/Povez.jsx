import React, { useEffect } from 'react'
import './povez.css'
import Menu from '../../layouts/menu/Menu'
import PageTitle from '../../../../components/pageTitle/PageTitle'
import { useOutletContext } from 'react-router'

export default function Povez() {
  const {setRoute} = useOutletContext()
  useEffect(()=>{
    setRoute('settings')
  },[])
  return (
    <div>
    <PageTitle title="Settings" />
    <Menu selectedSettings={'povez'} /></div>
  )
}
