import { Link } from "react-router-dom";
import { FaBookReader, FaBell, FaPlus } from "react-icons/fa";
import "./AppLayout.css";

function Header() {
  return (
    <header className="header">
      <div className="flexItem">
        <FaBookReader />
        <Link to="/dashboard">Online Biblioteka</Link>
      </div>
      <div className="flexItem">
        <FaBell />
        <span>12</span>
        <FaPlus />
        <Link to="https://www.bild-studio.com/">bildstudio</Link>
      </div>
    </header>
  );
}

export default Header;
