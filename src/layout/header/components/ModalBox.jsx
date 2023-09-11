import { FaBookReader, FaFile, FaSignOutAlt } from "react-icons/fa";
import "../header.css";
import Modal from "../../modal/Modal";
import ModalItem from "../../modal/modalItem/ModalItem";
import api from "../../../api/apiCalls";
import { useNavigate } from "react-router";

const ModalBox = ({ changeModal, modalProfileShow, setModalClose }) => {
  let navigate = useNavigate();

  let clickProfile = async () => {
    try {
      const response = await api.post(`/users/me`);
      const responseData = response.data.data;
      if (responseData.role == "Bibliotekar") {
        navigate(`/librarians/${responseData.id}`);
      } else if (responseData.role == "Ucenik") {
        navigate(`/students/${responseData.id}`);
      }
      setModalClose(false);
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  };

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
                onClickModalItem={clickProfile}
                setModalClose={setModalClose}
                icon={<FaFile className="modalIcon" />}
                text={"Profile"}
                noPath={true}
              />
              <ModalItem
                setModalClose={setModalClose}
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
