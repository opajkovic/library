    import React from 'react'
    import "./navItem.css"
    import { NavLink } from "react-router-dom";

    export default function NavItem({text, icon,path, isOpen}) {
    return (
        <NavLink className='navLink' to={`/${path}`}>
                {icon}
               {isOpen ? <p>{text}</p> : <></>}
            </NavLink>
    )
    }
