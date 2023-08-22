import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import PageTitle from '../../components/pageTitle/PageTitle'

export default function RentingBooks() {

    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('rentingBooks')
    },[])

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
    </div>
  )
}
