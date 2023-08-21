import { NavLink } from "react-router-dom";
import "./AppLayout.css";
import {
  FaTachometerAlt,
  FaBars,
  FaAddressBook,
  FaUsers,
  FaCopy,
  FaExchangeAlt,
  FaExpand,
  FaCog,
} from "react-icons/fa";
function MainNav() {
  return (
    <nav>
      <FaBars />
      <ul>
        <li>
          <NavLink to="/dashboard">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/bibliotekari">
            <FaAddressBook />
            <span>Bibliotekari</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/ucenik">
            <FaUsers />
            <span>Ucenici</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/evidencijaKnjiga">
            <FaCopy />
            <span>Knjige</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/autori">
            <FaAddressBook />
            <span>Autori</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/izdateKnjige">
            <FaExchangeAlt />
            <span>Izdavanje Knjiga</span>
          </NavLink>
        </li>
        <li>
          <FaExpand />
          <span>Expand Example</span>
        </li>
      </ul>
      <div>
        <FaCog />
        <span>Settings</span>
      </div>
    </nav>
  );
}
export default MainNav;
