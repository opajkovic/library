import React from "react";
import "./navItem.css";
import { NavLink } from "react-router-dom";

export default function NavItem({ text, icon, path, isOpen, active, setClose }) {
  return (
    <NavLink
      className={active ? "navLink navLinkActive" : "navLink"}
      to={`/${path}`}
      onClick={setClose}
    >
      {icon}
      {isOpen && <p>{text}</p>}
    </NavLink>
  );
}
