import React from 'react'
import loading from '../../assets/loader.gif'
import './globalSpinner.css'

export default function GlobalSpinner() {
  return (
    <div className='spinnerDiv'><img src={loading} /></div>
  )
}
