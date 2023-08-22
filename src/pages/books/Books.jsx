import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router'
import PageTitle from '../../components/pageTitle/PageTitle'

export default function Books() {
    const {setRoute} = useOutletContext()
    useEffect(()=>{
      setRoute('books')
    },[])
  return (
    <div>
     <PageTitle title="Knjige" />
    </div>
  )
}
