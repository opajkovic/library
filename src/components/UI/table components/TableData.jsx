import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "../../../layout/modal/Modal";
import ModalItem from "../../../layout/modal/modalItem/ModalItem";
import Input from "../Input";
import ConfirmModal from "../../../layout/modal/confirmModal/ConfirmModal";
import "../Table.css";

const TableData = ({
  item,
  headers,
  options,
  path,
  handleDelete,
  className,
  checkChanged
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [confirmModalState, setConfirmModalStat] = useState(false);
  const navigate = useNavigate()

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
                  input={{ type: "checkbox", className: "table-checkbox", onChange: checkChanged, id: row.id}}
                />

                {/* Uslovno dadavanje linka za autore, bibliotekare, studente i ucenike */}
                {(path && !header.path) ? (
                  <Link to={`${path}/${row.id}`}>{cellData}</Link>
                ) : 
                  <span className={header.pathId ? 'linkCell' : ""} onClick={()=>{
                    if(header.pathId == 'knjiga'){
                      navigate(header.path.replace(":id", row.knjiga.id))
                    }
                  }}>{cellData}</span>
                }
              </div>
            )}

            {header.headerName == "Trenutno zadržavanje knjiga"
              ? daysDifference + " days"
              : !header.sort && (<span className={header.path ?"linkCell":''} onClick={()=>{
                if(header.path){
                  if(header.pathId){
                    if(header.pathId == 'knjiga'){
                      navigate(header.path.replace(":id", row.knjiga.id))
                    }else if(header.pathId == 'student'){
                      navigate(header.path.replace(":id", row.student.id))
                    }else if(header.pathId == 'id'){
                      navigate(header.path.replace(":id", row.id))
                    }else if(header.pathId == 'bibliotekar'){
                      navigate(header.path.replace(":id", row.bibliotekar0.id))
                    }else if(header.pathId == 'autor'){
                      navigate(header.path.replace(":id", row.authors[0].id))
                    }
                  }
                }
              }}>{cellData}</span>)}

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
                  }  else if(path.includes(":bookid")){
                    return (
                      <ModalItem
                        key={i}
                        newClassName="modalItemChange"
                        icon={option.icon}
                        text={option.text}
                        path={`${path.replace(':bookid', '')}/${row.knjiga.id}/${option.path}`}
                      />
                    );
                  }else {
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

export default TableData;
