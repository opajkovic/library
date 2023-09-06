import "../Table.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../layout/modal/Modal";
import ModalItem from "../../../layout/modal/modalItem/ModalItem";
import Input from "../Input";
import ConfirmModal from "../../../layout/modal/confirmModal/ConfirmModal";

const MiddleDataCell = ({ item, headers, options, path }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [confirmModalState, setCconfirmModalStat] = useState(false);

  const handleOpenModal = (rowId) => {
    setRowId(rowId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setRowId(null);
    setModalOpen(false);
  };

  return item.map((row, rowIndex) => (
    <tr key={rowIndex}>
      {/* Uslovno prikazivanje kolona koje imaju props sort = true za checkbox */}
      {headers.map((header, colIndex) => (
        <td key={colIndex}>
          {header.sort && (
            <div className="left-container">
              <Input
                input={{ type: "checkbox", className: "table-checkbox" }}
              />

              {/* Uslovno dadavanje linka za autore, bibliotekare, studente i ucenike */}
              {path ? (
                <Link to={`${path}/${row.id}`}>
                  {row[header.dataKey]}
                </Link>
              ) : (
                row[header.dataKey]
              )}
            </div>
          )}
          {!header.sort && row[header.dataKey]}
          {/* Uslovno prikazivanje tackica ako je props dropdown === true */}
          {header.dropdown && (
            <BsThreeDotsVertical
              className="dots"
              onClick={() => {
                handleOpenModal(row.id);
              }}
            />
          )}

          {/* Uslovno otvaranje modala sa opcijama */}
          {header.dropdown && modalOpen && row.id == rowId ? (
            <Modal
              setModalClose={() => {
                handleCloseModal();
              }}
              component={options.map((option, i) => {
                if(option.noPath == true){
                  return (
                    <ModalItem
                      key={i}
                      newClassName="modalItemChange"
                      setResponse={setCconfirmModalStat}
                      icon={option.icon}
                      text={option.text}
                      noPath={true}
                      closeModals={setModalOpen}
                    />
                  )
                }else{
                return (
                  <ModalItem
                    key={i}
                    newClassName="modalItemChange"
                    icon={option.icon}
                    text={option.text}
                    path={option.path}
                  />
                )}
              })}
            />
          ) : null}
        </td>
      ))}
      {confirmModalState ? <ConfirmModal text={"Jeste li sigurni da zelite da izbrisete?"} setCloseModal={setCconfirmModalStat} /> : <></>}
    </tr>
  ));
};

export default MiddleDataCell;
