import "../Table.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../layout/modal/Modal";
import ModalItem from "../../../layout/modal/modalItem/ModalItem";
import Input from "../Input";

const MiddleDataCell = ({ item, headers, options, path }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowId, setRowId] = useState(null);

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
              {path ? (
                <Link to={`${path}/${row.id}`}>
                  {row[header.headerName.split(" ").join("")]}
                </Link>
              ) : (
                row[header.headerName.split(" ").join("")]
              )}
            </div>
          )}

          {!header.sort && row[header.headerName.split(" ").join("")]}
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
                return (
                  <ModalItem
                    key={i}
                    newClassName="modalItemChange"
                    icon={option.icon}
                    text={option.text}
                    path={option.path}
                  />
                );
              })}
            />
          ) : null}
        </td>
      ))}
    </tr>
  ));
};

export default MiddleDataCell;
