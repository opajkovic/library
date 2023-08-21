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
import { useState } from "react";

function Sidebar() {

  var [isOpen, setIsOpen] = useState(false)
  var [isExtendOpen, setIsExtendOpen] = useState(false)

  let changeExpand = () => {
    if(isExtendOpen == false){
      setIsOpen(true)
    }
    setIsExtendOpen(isExtendOpen => !isExtendOpen )
  }

  return (
    <aside className={isOpen ? "sidebar open" : "sidebar closed"}>
      <nav>
      {isOpen ? <FaTimes className="faTimes" onClick={()=>{setIsOpen(false)}} />  :<FaBars className="faBars" onClick={()=>{setIsOpen(true)}} />}
      <ul>
        <li>
          <NavItem isOpen={isOpen} path="dashboard" text="Dashborad" icon={<FaTachometerAlt className="icon"/>} />
        </li>
        <li>
          <NavItem isOpen={isOpen} path="bibliotekari" text="Bibliotekari" icon={<FaAddressBook className="icon" />} />
        </li>
        <li>
          <NavItem isOpen={isOpen} path="ucenik" text="Ucenik" icon={<FaUsers className="icon" />} />
        </li>
        <li>
          <NavItem isOpen={isOpen} path="evidencijaKnjiga" text="Knjige" icon={<FaCopy className="icon" />} />
        </li>
        <li>
          <NavItem isOpen={isOpen} path="autori" text="Autori" icon={<FaAddressBook className="icon" />} />
        </li>
        <li>
          <NavItem isOpen={isOpen} path="izdateKnjige" text="Izdavanje Knjiga" icon={<FaExchangeAlt className="icon" />} />
        </li>
        <li>
        <div className='navLink' onClick={changeExpand}>
          <FaExpand className="icon" />
          { isOpen ? <p>Expand Example <span className="extendArrows">{isExtendOpen ? <FaAngleDown/> : <FaAngleRight/>}</span></p> : <></>}
        </div>
        <div className={(isOpen && isExtendOpen) ? "expandText openExpand" : "expandText closedExpand"}>
          <p>Basic Expand</p>
          <p>Basic Expand</p>
          <p>Basic Expand</p>
        </div>
        </li>
        <li>
          <NavItem isOpen={isOpen} path="settings" text="Settings" icon={<FaCog className="icon" />} />
        </li>
      </ul>
    </nav>
    </aside>
  );
}

export default Sidebar;
