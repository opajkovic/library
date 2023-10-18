import { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import Modal from "../../modal/Modal";
import ModalItem from "../../modal/modalItem/ModalItem";
import ConfirmModal from "../../modal/confirmModal/ConfirmModal";
import "../profileTitle.css";

export default function HeaderOptions({
  reset,
  change,
  editPath,
  deleteMssg,
  booksSpecial,
  setModalPassword,
  handleDelete
}) {

  const params = useParams();
  const [openModule, setOpenModule] = useState(false);
  const [confirmState, setConfirmState] = useState(false);

  const closeModals = () => {
    setConfirmState(false)
  };

  return (
    <div className="right">
      {reset && (
        <p
          onClick={() => {
            setModalPassword(true);
          }}
          className="reset-password"
        >
          <FaRedo />
          Resetuj sifru
        </p>
      )}

      {change && (
        <Link to={editPath ? editPath : `/books/${params.id}/edit`} className="change-info">
          <FaEdit />
          Izmijeni podatke
        </Link>
      )}

      {booksSpecial && (
        <>
          <Link to={`/books/${params.id}/otpisi-knjigu`} className="change-info">
            <FaBook />
            Otpiši knjigu
          </Link>
          <Link to={`/books/${params.id}/izdaj-knjigu`} className="change-info">
            <FaHandPointUp />
            Izdaj knjigu
          </Link>
          <Link to={`/books/${params.id}/vrati-knjigu`}  className="change-info">
            <FaReply />
            Vrati knjigu
          </Link>
          <Link to={`/books/${params.id}/rezervisi-knjigu`} className="change-info">
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
                  setResponse={()=>setConfirmState(true)}
                  setModalClose={() => setOpenModule(false)}
                  icon={<FaTrash />}
                  text={"Izbrisi"}
                  close={true}
                />
              </div>
            }
          />
        )}
        {confirmState && (
          <ConfirmModal
            setCloseModal={()=>closeModals()}
            text={"Da li ste sigurni da zelite da izbrisete?"}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
