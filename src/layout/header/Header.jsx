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
        <NavLink onClick={closeModals}  to="./dashboard">
        <FaBookReader />
          <span className="bild">Online biblioteka</span>
        </NavLink>
      </div>
      <div className="headerRight">
        <Link onClick={closeModals} to={'/activities'} className="bell">
          <FaBell />
        </Link>
        <div className="border"></div>
        <div className="bell modalBox">
          <FaPlus onClick={()=>{changeModal(setModalPlus, modalPlus)}} />
          {modalPlus ? <Modal setModalClose={setModalPlus} component={<div>
            <ModalItem icon={<FaRegAddressBook />} text={"Bibliotekar"} />
            <ModalItem icon={<FaUsers />} text={"Ucenik"} />
            <ModalItem icon={<FaCopy />} text={"Knjiga"} />
            <ModalItem icon={<FaAddressBook />} text={"Autor"} />
          </div>} /> : <></>}
        </div>
        <NavLink to="/dashboard">
          <span className="bild">DataDesign</span>
        </NavLink>
        <div className="modalBox">
          <FaBookReader onClick={()=>{changeModal(setModalProfileShow,modalProfileShow)}} />
          {modalProfileShow ? <Modal setModalClose={setModalProfileShow} className="a " component={<div className="modalHeader">
            <ModalItem closeModals={closeModals} icon={<FaFile className="modalIcon" />} text={"Profile"} path={`/librarians/2`} />
            <ModalItem closeModals={closeModals} icon={<FaSignOutAlt className="modalIcon" />} text={"Log out"} />
          </div>} /> : <></>}
        </div>
      </div>
    </header>
  );
};

export default Header;
