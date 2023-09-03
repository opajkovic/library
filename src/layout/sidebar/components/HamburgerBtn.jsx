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
    <nav>
      {isOpen ? (
        <FaTimes className="faTimes" onClick={handleClick} />
      ) : (
        <FaBars className="faBars" onClick={handleClick} />
      )}
    </nav>
  );
}

export default HamburgerBtn;
