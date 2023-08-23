import { NavLink } from "react-router-dom";
import { FaBookReader, FaBell, FaPlus, FaFile, FaSignOutAlt,FaCopy, FaRegAddressBook, FaUsers, FaAddressBook } from "react-icons/fa";
import "./header.css";
import Modal from "../modal/Modal";
import { useState } from "react";
import ModalItem from "../../components/modalItem/ModalItem";

const Header = () => {
  let [modalProfileShow, setModalProfileShow] = useState(false)
  let [modalPlus, setModalPlus] = useState(false)

  return (
    <header className="header">
      <div>
        <FaBookReader />
        <NavLink to="./dashboard">
          <span className="bild">Online Library</span>
        </NavLink>
      </div>
      <div className="headerRight">
        <div className="bell">
          <FaBell />
        </div>
        <div className="border"></div>
        <div className="bell modalBox">
          <FaPlus onClick={()=>{setModalPlus(!modalPlus)}} />
          {modalPlus ? <Modal component={<div>
            <ModalItem icon={<FaRegAddressBook />} text={"Bibliotekari"} />
            <ModalItem icon={<FaUsers />} text={"Ucenik"} />
            <ModalItem icon={<FaCopy />} text={"Knjiga"} />
            <ModalItem icon={<FaAddressBook />} text={"Autor"} />
          </div>} /> : <></>}
        </div>
        <NavLink to="./dashboard">
          <span className="bild">bildstudio</span>
        </NavLink>
        <div className="modalBox">
          <FaBookReader onClick={()=>{setModalProfileShow(!modalProfileShow)}} />
          {modalProfileShow ? <Modal className="a " component={<div className="modalHeader">
            <ModalItem icon={<FaFile className="modalIcon" />} text={"Profile"} />
            <ModalItem icon={<FaSignOutAlt className="modalIcon" />} text={"Log out"} />
          </div>} /> : <></>}
        </div>
      </div>
    </header>
  );
};

export default Header;
