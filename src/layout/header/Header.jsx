import { Link, NavLink } from "react-router-dom";
import { FaBookReader, FaBell } from "react-icons/fa";
import "./header.css";
import { useState } from "react";
import ModalBox from "./components/ModalBox";
import BellModalBox from "./components/BellModalBox";

const Header = () => {
  const [modalProfileShow, setModalProfileShow] = useState(false);
  const [modalPlus, setModalPlus] = useState(false);

  const changeModal = (setModal, modal) => {
    setModalPlus(false);
    setModalProfileShow(false);
    setModal(!modal);
  };
  const closeModals = () => {
    setModalPlus(false);
    setModalProfileShow(false);
  };

  return (
    <header className="header">
      <NavLink onClick={closeModals} to="./dashboard">
        <FaBookReader />
        <span className="bild">Online biblioteka</span>
      </NavLink>

      <div className="headerRight">
        <Link onClick={closeModals} to={"/activities"} className="bell">
          <FaBell />
        </Link>
        <div className="border"></div>

        <BellModalBox
          modalPlus={modalPlus}
          changeModal={() => {
            changeModal(setModalPlus, modalPlus);
          }}
          setModalClose={() => closeModals}
        />

        <NavLink to="/dashboard">
          <span className="bild">DataDesign</span>
        </NavLink>

        <ModalBox
          changeModal={() => {
            changeModal(setModalProfileShow, modalProfileShow);
          }}
          modalProfileShow={modalProfileShow}
          setModalClose={() => closeModals()}
          closeModals={closeModals}
        />
      </div>
    </header>
  );
};

export default Header;
