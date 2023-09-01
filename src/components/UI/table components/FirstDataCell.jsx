import "../Table.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Input from "../Input";
import { useState } from "react";
import Modal from "../../../layout/modal/Modal";
import ModalItem from "../../../layout/modal/modalItem/ModalItem";

const FirstDataCell = ({ item, options, lastHeader, mainHeader}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    mainHeader !== "" && <td>
      <div className="left-container">
        <Input input={{ type: "checkbox", className: "table-checkbox" }} />
        {item.name}
      </div>
      {lastHeader === "" && (<>
        <BsThreeDotsVertical
          className="main-header-dots"
          onClick={()=>{setModalOpen(true)}}
        />
        {modalOpen ? <Modal setModalClose={setModalOpen} component={<div>
          {options.map((option, i) => {
            return(<ModalItem key={i} newClassName="modalItemChange" icon={option.icon} text={option.text} path={option.path} />)
          })}
          </div>} /> : <></>}
      </>)}
    </td>
  );
};

export default FirstDataCell;
