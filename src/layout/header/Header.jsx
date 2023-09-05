import { Link, NavLink } from "react-router-dom";
import { FaBookReader, FaBell } from "react-icons/fa";
import "./header.css";
import { useState } from "react";
import ModalBox from "./components/ModalBox";
import BellModalBox from "./components/BellModalBox";

const Header = () => {
  const [modalProfileShow, setModalProfileShow] = useState(false);
  const [modalPlus, setModalPlus] = useState(false);

  const openModalPlus = () => {
    setModalPlus(true);
    setModalProfileShow(false);
  };

  const openModalProfile = () => {
    setModalProfileShow(true);
    setModalPlus(false);
  };

  const closeModals = () => {
    setModalPlus(false);
    setModalProfileShow(false);
  };

  return (
    <header className="header">
      <NavLink to="./dashboard" className="online-library">
        <FaBookReader />
        <span>Online biblioteka</span>
      </NavLink>

      <div className="headerRight">
        <Link to={"/activities"} className="bell">
          <FaBell />
        </Link>
        <div className="border"></div>

        <BellModalBox
          modalPlus={modalPlus}
          setModalClose={closeModals}
          changeModal={() => openModalPlus()}
        />

        <NavLink to="/dashboard">
          <span className="bild">DataDesign</span>
        </NavLink>

        <ModalBox
          modalProfileShow={modalProfileShow}
          changeModal={() => openModalProfile()}
          setModalClose={closeModals}
        />
      </div>
    </header>
  );
};

export default Header;
