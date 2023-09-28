import "../Table.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../layout/modal/Modal";
import ModalItem from "../../../layout/modal/modalItem/ModalItem";
import Input from "../Input";
import ConfirmModal from "../../../layout/modal/confirmModal/ConfirmModal";

const MiddleDataCell = ({
  item,
  headers,
  options,
  path,
  handleDelete,
  className,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [confirmModalState, setConfirmModalStat] = useState(false);

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
      {headers.map((header, colIndex) => {
        const cellData = header.dataKey
          ? header.dataKey
              .split("+")
              .reduce((acc, key) => {
                if (key.includes(".")) {
                  const nestedKeys = key.split(".");
                  let nestedValue = row;
                  for (const nestedKey of nestedKeys) {
                    nestedValue = nestedValue[nestedKey];
                    if (nestedValue === undefined) break;
                  }
                  return (
                    acc + (nestedValue !== undefined ? nestedValue : "") + " "
                  );
                } else {
                  return acc + (row[key] !== undefined ? row[key] : "") + " ";
                }
              }, "")
              .trim()
          : "";
        // samo za "Trenutno zadržavanje knjiga" u izdate-knjige
        const currentDate = new Date();
        const dayArraow = new Date(cellData);
        const timeDifference = currentDate - dayArraow;
        const daysDifference = Math.round(
          timeDifference / (1000 * 60 * 60 * 24)
        );

        return (
          <td key={colIndex}>
            {header.sort && (
              <div className="left-container">
                <Input
                  input={{ type: "checkbox", className: "table-checkbox" }}
                />

                {/* Uslovno dadavanje linka za autore, bibliotekare, studente i ucenike */}
                {path ? (
                  <Link to={`${path}/${row.id}`}>{cellData}</Link>
                ) : (
                  cellData
                )}
              </div>
            )}

            {header.headerName == "Trenutno zadržavanje knjiga"
              ? daysDifference + " days"
              : !header.sort && cellData}

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
            {header.dropdown && modalOpen && row.id == rowId && (
              <Modal
                setModalClose={() => {
                  handleCloseModal();
                }}
                component={options.map((option, i) => {
                  if (option.noPath === true) {
                    return (
                      <ModalItem
                        setModalClose={() => {
                          handleCloseModal();
                          setRowId(row.id);
                        }}
                        key={i}
                        newClassName="modalItemChange"
                        setResponse={() => setConfirmModalStat(true)}
                        icon={option.icon}
                        text={option.text}
                        close={true}
                        closeModals={setModalOpen}
                      />
                    );
                  } else {
                    return (
                      <ModalItem
                        key={i}
                        newClassName="modalItemChange"
                        icon={option.icon}
                        text={option.text}
                        path={`${path}/${row.id}/${option.path}`}
                      />
                    );
                  }
                })}
              />
            )}
            {confirmModalState && (
              <ConfirmModal
                className={`${className ? className : "table-confirm-modal"}`}
                text={"Da li ste sigurni da želite da izbrišete?"}
                setCloseModal={() => setConfirmModalStat(false)}
                handleDelete={() => {
                  handleDelete(rowId);
                  setConfirmModalStat(false);
                }}
              />
            )}
          </td>
        );
      })}
    </tr>
  ));
};

export default MiddleDataCell;
