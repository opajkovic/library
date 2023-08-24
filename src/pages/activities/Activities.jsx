import React from 'react'
import './activities.css'
import PageTitle from '../../components/pageTitle/PageTitle'
import ActivitiItem from './components/activitiItem/ActivitiItem'


export default function Activities() {
  return (
    <div className='activities'>
        <PageTitle title={'Prikaz aktivnosti'} />
        {/* isprobavanje */}
        <ActivitiItem />
        <ActivitiItem />
        <ActivitiItem />
        {/* kraj  isprobavanja */}
    </div>
  )
}
