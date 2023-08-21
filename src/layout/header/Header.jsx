import { NavLink } from "react-router-dom";
import { FaBookReader, FaBell, FaPlus } from "react-icons/fa";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div>
        <FaBookReader />
        <NavLink to="./dashboard">
          <span className="bild">Online Library</span>
        </NavLink>
      </div>
      <div>
        <span className="bell">
          <FaBell />
        </span>
        <span>
          <FaPlus />
        </span>
        <NavLink to="./dashboard">
          <span className="bild">bildstudio</span>
        </NavLink>
        <span>
          <FaBookReader />
        </span>
      </div>
    </header>

    // <header className="header">
    //   <div className="flexItem">
    //     <FaBookReader />
    //     <Link to="/dashboard">Online Biblioteka</Link>
    //   </div>
    //   <div className="flexItem">
    //     <FaBell />
    //     <span>12</span>
    //     <FaPlus />
    //     <Link to="https://www.bild-studio.com/">bildstudio</Link>
    //   </div>
    // </header>
  );
};

export default Header;
