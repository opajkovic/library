import React, { useEffect } from 'react'
import './kategorije.css'
import PageTitle from '../../../../components/pageTitle/PageTitle'
import Menu from '../../layouts/menu/Menu'
import { useOutletContext } from 'react-router'

export default function Kategorije() {
  const {setRoute} = useOutletContext()
  useEffect(()=>{
    setRoute('settings')
  },[])
  return (
    <div>
    <PageTitle title="Settings" />
    <Menu selectedSettings={'kategorije'} /></div>
  )
}
