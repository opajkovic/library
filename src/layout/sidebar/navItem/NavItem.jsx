import React from "react";
import "./navItem.css";
import { NavLink } from "react-router-dom";

export default function NavItem({ text, icon, path, isOpen, active }) {
  return (
    <NavLink
      className={active ? "navLink navLinkActive" : "navLink"}
      to={`/${path}`}
    >
      {icon}
      {isOpen ? <p>{text}</p> : <></>}
    </NavLink>
  );
}
