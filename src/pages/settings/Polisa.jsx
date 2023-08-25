import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import PageTitle from '../../components/pageTitle/PageTitle'
import Menu from './layouts/menu/Menu'
import PolisaList from './layouts/PolisaList/PolisaList'

export default function Polisa() {

    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('settings')
    },[])

  return (
    <div>
      <PageTitle title="Settings" />
      <Menu selectedSettings={'polisa'} />
      <PolisaList />
    </div>
  )
}
