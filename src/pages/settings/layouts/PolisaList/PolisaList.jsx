import React from 'react'
import './polisaList.css'
import PolisaItem from '../../components/polisaItem/PolisaItem'

export default function PolisaList() {
  return (
    <div className='polisaList'>
        <PolisaItem title="Rok za rezervaciju" />
        <PolisaItem title="Rok vracanja" />
        <PolisaItem title="Rok konflikta" />
    </div>
  )
}
