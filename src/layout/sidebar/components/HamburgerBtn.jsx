import "../Sidebar.css";
import { FaBars, FaTimes } from "react-icons/fa";

function HamburgerBtn({ isOpen, setOpen, setClose }) {
  const handleClick = () => {
    if (isOpen) {
      setClose();
    } else {
      setOpen();
    }
  };

  return (
    <nav onClick={handleClick}>
      {isOpen ? <FaTimes className="faTimes" /> : <FaBars className="faBars" />}
    </nav>
  );
}

export default HamburgerBtn;
