import "../profileTitle.css";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaEllipsisV,
  FaBook,
  FaHandPointUp,
  FaRedo,
  FaReply,
  FaTrash,
  FaBookmark,
} from "react-icons/fa";
import { useState } from "react";
import Modal from "../../modal/Modal";
import ModalItem from "../../modal/modalItem/ModalItem";
import ConfirmModal from "../../modal/confirmModal/ConfirmModal";

export default function HeaderOptions({
  reset,
  change,
  deleteMssg,
  booksSpecial,
  setModalPassword
}) {
  let [openModule, setOpenModule] = useState(false);
  let [confirmState, setConfirmState] = useState(false);

  let closeModals = () => {
    setOpenModule(false);
  };
  return (
    <div className="right">
      {reset && (
        <p onClick={()=>{setModalPassword(true)}} className="reset-password">
          <FaRedo />
          Resetuj sifru
        </p>
      )}

      {change && (
        <Link to={`/izmijeniPodatke`} className="change-info">
          <FaEdit />
          Izmeni podatke
        </Link>
      )}

      {booksSpecial && (
        <>
          <Link to={`/izmijeniPodatke`} className="change-info">
            <FaBook />
            Otpiši knjigu
          </Link>
          <Link to={`/izmijeniPodatke`} className="change-info">
            <FaHandPointUp />
            Izdaj knjigu
          </Link>
          <Link to={`/izmijeniPodatke`} className="change-info">
            <FaReply />
            Vrati knjigu
          </Link>
          <Link to={`/izmijeniPodatke`} className="change-info">
            <FaBookmark />
            Rezerviši knjigu
          </Link>
        </>
      )}

      <div className="moduleBox">
        <FaEllipsisV
          onClick={() => {
            setOpenModule(!openModule);
          }}
        />
        {deleteMssg && openModule && (
          <Modal
            setModalClose={setOpenModule}
            component={
              <div>
                <ModalItem
                  setResponse={setConfirmState}
                  closeModals={closeModals}
                  noPath={true}
                  icon={<FaTrash />}
                  text={"Izbrisi"}
                />
              </div>
            }
          />
        )}
        {confirmState && <ConfirmModal setCloseModal={setConfirmState} text={"Da li ste sigurni da zelite da izbrisete?"} setResponse={setConfirmState} />}
      </div>
    </div>
  );
}
