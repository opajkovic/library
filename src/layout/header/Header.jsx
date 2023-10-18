import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBookReader, FaBell } from "react-icons/fa";
import ModalBox from "./components/ModalBox";
import BellModalBox from "./components/BellModalBox";
import "./header.css";

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
      <Link to="./dashboard" className="online-library">
        <FaBookReader />
        <span>Online biblioteka</span>
      </Link>

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

        <Link to="/dashboard">
          <span className="bild">DataDesign</span>
        </Link>

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
