import "./Sidebar.css";
import {
  FaTachometerAlt,
  FaBars,
  FaAddressBook,
  FaUsers,
  FaCopy,
  FaExchangeAlt,
  FaExpand,
  FaCog,
  FaTimes,
  FaAngleRight,
  FaAngleDown,
} from "react-icons/fa";


import { useEffect, useState } from "react";
import NavItem from "./navItem/NavItem";

function Sidebar({route}) {

  var [isOpen, setIsOpen] = useState(false)
  var [isExtendOpen, setIsExtendOpen] = useState(false)

  let changeExpand = () => {
    if (isExtendOpen == false) {
      setIsOpen(true);
    }
    setIsExtendOpen((isExtendOpen) => !isExtendOpen);
  };

  useEffect(()=>{
    setIsOpen(false)
    setIsExtendOpen(false)
  },[window.location.href])
  
  return (
    <aside className={isOpen ? "sidebar open" : "sidebar closed"}>
      <div onClick={()=>{setIsOpen(false)}} className={isOpen ? "selfClose" : ""}></div>
      <nav>
      {isOpen ? <FaTimes className="faTimes" onClick={()=>{setIsOpen(false)}} />  :<FaBars className="faBars" onClick={()=>{setIsOpen(true)}} />}
      <ul>
        <li>
          <NavItem isOpen={isOpen} active={(route == "dashboard") ? true : false} path="dashboard" text="Dashborad" icon={<FaTachometerAlt className={(route == "dashboard") ? "icon activeIcon" : "icon"}/>} />
        </li>
        <li>
          <NavItem isOpen={isOpen} active={(route == "librarians") ? true : false} path="librarians" text="Bibliotekari" icon={<FaAddressBook  className={(route == "librarians") ? "icon activeIcon" : "icon"} />} />
        </li>
        <li>
          <NavItem isOpen={isOpen} active={(route == "students") ? true : false} path="students" text="Ucenici" icon={<FaUsers  className={(route == "students") ? "icon activeIcon" : "icon"} />} />
        </li>
        <li>
          <NavItem isOpen={isOpen} active={(route == "books") ? true : false} path="books" text="Knjige" icon={<FaCopy  className={(route == "books") ? "icon activeIcon" : "icon"} />} />
        </li>
        <li>
          <NavItem isOpen={isOpen} active={(route == "authors") ? true : false} path="authors" text="Autori" icon={<FaAddressBook  className={(route == "authors") ? "icon activeIcon" : "icon"} />} />
        </li>
        <li>
          <NavItem isOpen={isOpen} active={(route == "rentingBooks") ? true : false} path="rentingBooks" text="Izdavanje Knjiga" icon={<FaExchangeAlt  className={(route == "rentingBooks") ? "icon activeIcon" : "icon"} />} />
        </li>
        <li>
        <div className='navLink' onClick={changeExpand}>
          <FaExpand  className={(route == "dashboard") ? "icon activeIcon" : "icon"} />
          { isOpen ? <p>Expand Example <span className="extendArrows">{isExtendOpen ? <FaAngleDown/> : <FaAngleRight/>}</span></p> : <></>}
        </div>
        <div className={(isOpen && isExtendOpen) ? "expandText openExpand" : "expandText closedExpand"}>
          <p>Basic Expand</p>
          <p>Basic Expand</p>
          <p>Basic Expand</p>
        </div>
        </li>
        <li>
          <NavItem isOpen={isOpen} active={(route == "settings") ? true : false} path="settings" text="Settings" icon={<FaCog  className={(route == "settings") ? "icon activeIcon" : "icon"} />} />
        </li>
      </ul>
    </nav>
    </aside>
  );
}

export default Sidebar;
