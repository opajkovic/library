import React from 'react'
import './menu.css'
import { Link } from 'react-router-dom'


export default function Menu({selectedSettings}) {
  return (
    <div className='menu'>
        <Link className={(selectedSettings == 'polisa') ? 'linkMenu selectedLinkMenu' :'linkMenu'} to= '/settings'>Polisa</Link>
        <Link className={(selectedSettings == 'kategorije') ? 'linkMenu selectedLinkMenu' :'linkMenu'} to= '/settings/categories'>Kategorije</Link>
        <Link className={(selectedSettings == 'zanrovi') ? 'linkMenu selectedLinkMenu' :'linkMenu'} to= '/settings/zanrovi'>Zanrovi</Link>
        <Link className={(selectedSettings == 'izdavac') ? 'linkMenu selectedLinkMenu' :'linkMenu'} to= '/settings/izdavac'>Izdavac</Link>
        <Link className={(selectedSettings == 'povez') ? 'linkMenu selectedLinkMenu' :'linkMenu'} to= '/settings/povez'>Povez</Link>
        <Link className={(selectedSettings == 'format') ? 'linkMenu selectedLinkMenu' :'linkMenu'} to= '/settings/format'>Format</Link>
        <Link className={(selectedSettings == 'pismo') ? 'linkMenu selectedLinkMenu' :'linkMenu'} to= '/settings/pismo'>Pismo</Link>
    </div>
  )
}
