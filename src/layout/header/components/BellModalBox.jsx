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
      {modalPlus && (
        <Modal
          className="heading-modal"
          setModalClose={setModalClose}
          component={
            <div>
              <ModalItem
                icon={<FaRegAddressBook />}
                text={"Bibliotekar"}
                path="/librarians/new"
                setModalClose={setModalClose}
              />
              <ModalItem
                icon={<FaUsers />}
                text={"Ucenik"}
                path="/students/new"
                setModalClose={setModalClose}
              />
              <ModalItem
                icon={<FaCopy />}
                text={"Knjiga"}
                path="/books/new/osnovni-detalji"
                setModalClose={setModalClose}
              />
              <ModalItem
                icon={<FaAddressBook />}
                text={"Autor"}
                path="/authors/new"
                setModalClose={setModalClose}
              />
            </div>
          }
        />
      )}
    </div>
  );
};

export default BellModalBox;
