import {
  FaPlus,
  FaCopy,
  FaRegAddressBook,
  FaUsers,
  FaAddressBook,
} from "react-icons/fa";
import "../header.css";
import Modal from "../../modal/Modal";
import ModalItem from "../../modal/modalItem/ModalItem";

const BellModalBox = ({ changeModal, modalPlus, setModalClose }) => {
  return (
    <div className="bell modalBox">
      <FaPlus onClick={changeModal} />
      {modalPlus ? (
        <Modal
          className="heading-modal"
          setModalClose={setModalClose()}
          component={
            <div>
              <ModalItem icon={<FaRegAddressBook />} text={"Bibliotekar"} />
              <ModalItem icon={<FaUsers />} text={"Ucenik"} />
              <ModalItem icon={<FaCopy />} text={"Knjiga"} />
              <ModalItem icon={<FaAddressBook />} text={"Autor"} />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default BellModalBox;
