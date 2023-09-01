import { useEffect, useState } from "react";
import "../Table.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../../layout/modal/Modal";
import ModalItem from "../../../layout/modal/modalItem/ModalItem";
import { FaAd, FaRegAddressBook } from "react-icons/fa";

const LastDataCell = ({ item, lastHeader, options }) => {
  
  const [modalOpen, setModalOpen] = useState(false);
  return (
    lastHeader && (
      <td className="flex-between">
        {item.lastHeader}
        <BsThreeDotsVertical className="dots" onClick={() => {setModalOpen(true)}} />
        {modalOpen ? <Modal setModalClose={setModalOpen} component={<div>
          {options.map((option, i) => {
            return(<ModalItem key={i} newClassName="modalItemChange" icon={option.icon} text={option.text} path={option.path} />)
          })}
          </div>} /> : <></>}
      </td>
    )
  );
};

export default LastDataCell;
