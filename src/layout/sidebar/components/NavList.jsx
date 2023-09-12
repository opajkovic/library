import React from "react";
import "../Sidebar.css";
import {
  FaTachometerAlt,
  FaAddressBook,
  FaUsers,
  FaCopy,
  FaExchangeAlt,
} from "react-icons/fa";
import NavItem from "./NavItem";

const NavList = ({ isOpen, route, setClose }) => {
  const navItems = [
    { path: "dashboard", text: "Dashborad", icon: <FaTachometerAlt /> },
    { path: "librarians", text: "Bibliotekari", icon: <FaAddressBook /> },
    { path: "students", text: "Ucenici", icon: <FaUsers /> },
    { path: "books", text: "Knjige", icon: <FaCopy /> },
    { path: "authors", text: "Autori", icon: <FaAddressBook /> },
    {
      path: "rentingBooks/izdate-knjige",
      text: "Izdavanje Knjiga",
      icon: <FaExchangeAlt />,
    },
  ];

  return (
    <>
      {navItems.map((item) => (
        <li key={item.path}>
          <NavItem
            isOpen={isOpen}
            setClose={setClose}
            active={route === item.path}
            path={item.path}
            text={item.text}
            icon={React.cloneElement(item.icon, {
              className: route === item.path ? "icon activeIcon" : "icon",
            })}
          />
        </li>
      ))}
    </>
  );
};

export default NavList;
