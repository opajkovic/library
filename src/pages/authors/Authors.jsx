import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import PageTitle from '../../components/pageTitle/PageTitle'

export default function Authors() {
    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('authors')
    },[])
  return (
    <div>
    <PageTitle title="Autori" />
    </div>
  )
}
