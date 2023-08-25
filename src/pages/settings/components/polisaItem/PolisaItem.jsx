import React from 'react'
import './polisaItem.css'

export default function PolisaItem({title}) {
  return (
    <div className='polisaItem'>
        <div className="text">
            <h3>{title}</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis maiores blanditiis ipsam officia illum inventore alias amet. Nesciunt, ea illo laudantium soluta praesentium cupiditate! Alias cupiditate corporis reprehenderit porro accusantium?</p>
        </div>
        <div className="inputDiv">
            <input type="text" placeholder='...' />
            <p>dana</p>
        </div>
    </div>
  )
}
