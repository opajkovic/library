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

export default function HeaderOptions({
  reset,
  change,
  deleteMssg,
  booksSpecial,
}) {
  let [openModule, setOpenModule] = useState(false);

  let closeModals = () => {
    setOpenModule(false);
  };
  return (
    <div className="right">
      {reset && (
        <p className="reset-password">
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
        {deleteMssg && openModule ? (
          <Modal
            setModalClose={setOpenModule}
            component={
              <div>
                <ModalItem
                  closeModals={closeModals}
                  path={""}
                  icon={<FaTrash />}
                  text={"Izbrisi"}
                />
              </div>
            }
          />
        ) : null}
      </div>
    </div>
  );
}
