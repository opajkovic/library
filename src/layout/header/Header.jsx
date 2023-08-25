import { Link, NavLink } from "react-router-dom";
import { FaBookReader, FaBell, FaPlus, FaFile, FaSignOutAlt,FaCopy, FaRegAddressBook, FaUsers, FaAddressBook } from "react-icons/fa";
import "./header.css";
import Modal from "../modal/Modal";
import { useState } from "react";
import ModalItem from "../modal/modalItem/ModalItem";

const Header = () => {
  let [modalProfileShow, setModalProfileShow] = useState(false)
  let [modalPlus, setModalPlus] = useState(false)

  let changeModal = (setModal, modal) => {
    setModalPlus(false)
    setModalProfileShow(false)
    setModal(!modal)
  }
  let closeModals = () => {
    setModalPlus(false)
    setModalProfileShow(false)
  }

  return (
    <header className="header">
      <div>
        <FaBookReader />
        <NavLink onClick={closeModals}  to="./dashboard">
          <span className="bild">Online Library</span>
        </NavLink>
      </div>
      <div className="headerRight">
        <Link onClick={closeModals} to={'/activities'} className="bell">
          <FaBell />
        </Link>
        <div className="border"></div>
        <div className="bell modalBox">
          <FaPlus onClick={()=>{changeModal(setModalPlus, modalPlus)}} />
          {modalPlus ? <Modal component={<div>
            <ModalItem icon={<FaRegAddressBook />} text={"Bibliotekar"} />
            <ModalItem icon={<FaUsers />} text={"Ucenik"} />
            <ModalItem icon={<FaCopy />} text={"Knjiga"} />
            <ModalItem icon={<FaAddressBook />} text={"Autor"} />
          </div>} /> : <></>}
        </div>
        <NavLink to="./dashboard">
          <span className="bild">bildstudio</span>
        </NavLink>
        <div className="modalBox">
          <FaBookReader onClick={()=>{changeModal(setModalProfileShow,modalProfileShow)}} />
          {modalProfileShow ? <Modal className="a " component={<div className="modalHeader">
            <ModalItem closeModals={closeModals} icon={<FaFile className="modalIcon" />} text={"Profile"} path={`/librarians/2`} />
            <ModalItem closeModals={closeModals} icon={<FaSignOutAlt className="modalIcon" />} text={"Log out"} />
          </div>} /> : <></>}
        </div>
      </div>
    </header>
  );
};

export default Header;