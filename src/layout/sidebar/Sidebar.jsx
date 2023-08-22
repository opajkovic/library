import "./Sidebar.css"
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
  FaAngleDown
} from "react-icons/fa";
import NavItem from "../../components/navItem/navItem";
import { useEffect, useState } from "react";

function Sidebar({route}) {

  var [isOpen, setIsOpen] = useState(false)
  var [isExtendOpen, setIsExtendOpen] = useState(false)

  let changeExpand = () => {
    if(isExtendOpen == false){
      setIsOpen(true)
    }
    setIsExtendOpen(isExtendOpen => !isExtendOpen )
  }

  useEffect(()=>{
    setIsOpen(false)
    setIsExtendOpen(false)
  },[window.location.href])
  return (
    <aside className={isOpen ? "sidebar open" : "sidebar closed"}>
      <nav>
      {isOpen ? <FaTimes className="faTimes" onClick={()=>{setIsOpen(false)}} />  :<FaBars className="faBars" onClick={()=>{setIsOpen(true)}} />}
      <ul>
        <li>
          <NavItem isOpen={isOpen} active={(route == "dashboard") ? true : false} path="dashboard" text="Dashborad" icon={<FaTachometerAlt className={(route == "dashboard") ? "icon activeIcon" : "icon"}/>} />
        </li>
        <li>
          <NavItem isOpen={isOpen} active={(route == "bibliotekari") ? true : false} path="bibliotekari" text="Bibliotekari" icon={<FaAddressBook  className={(route == "bibliotekari") ? "icon activeIcon" : "icon"} />} />
        </li>
        <li>
          <NavItem isOpen={isOpen} active={(route == "ucenik") ? true : false} path="ucenik" text="Ucenik" icon={<FaUsers  className={(route == "ucenik") ? "icon activeIcon" : "icon"} />} />
        </li>
        <li>
          <NavItem isOpen={isOpen} active={(route == "evidencijaKnjiga") ? true : false} path="evidencijaKnjiga" text="Knjige" icon={<FaCopy  className={(route == "evidencijaKnjiga") ? "icon activeIcon" : "icon"} />} />
        </li>
        <li>
          <NavItem isOpen={isOpen} active={(route == "autori") ? true : false} path="autori" text="Autori" icon={<FaAddressBook  className={(route == "autori") ? "icon activeIcon" : "icon"} />} />
        </li>
        <li>
          <NavItem isOpen={isOpen} active={(route == "izdateKnjige") ? true : false} path="izdateKnjige" text="Izdavanje Knjiga" icon={<FaExchangeAlt  className={(route == "izdateKnjige") ? "icon activeIcon" : "icon"} />} />
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
