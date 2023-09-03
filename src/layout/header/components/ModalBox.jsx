import { FaBookReader, FaFile, FaSignOutAlt } from "react-icons/fa";
import "../header.css";
import Modal from "../../modal/Modal";
import ModalItem from "../../modal/modalItem/ModalItem";

const ModalBox = ({
  changeModal,
  modalProfileShow,
  setModalClose,
  closeModals,
}) => {
  return (
    <div className="modalBox">
      <FaBookReader onClick={changeModal} />
      {modalProfileShow ? (
        <Modal
          setModalClose={setModalClose}
          className="profile-modal"
          component={
            <div className="modalHeader">
              <ModalItem
                closeModals={closeModals}
                icon={<FaFile className="modalIcon" />}
                text={"Profile"}
                path={`/librarians/2`}
              />
              <ModalItem
                closeModals={closeModals}
                icon={<FaSignOutAlt className="modalIcon" />}
                text={"Log out"}
                path={"/login"}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default ModalBox;
