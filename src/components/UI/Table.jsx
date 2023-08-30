import "./Table.css";
import Thead from "./table components/Thead";
import FirstDataCell from "./table components/FirstDataCell";
import MiddleDataCell from "./table components/MiddleDataCell";
import LastDataCell from "./table components/LastDataCell";
import SearchTableInputs from "./table components/SearchTableInputs";
import { useState } from "react";
import { FaRegEdit, FaRegFile, FaTrash } from "react-icons/fa";

const Table = ({ headers, tableData, mainHeader, lastHeader }) => {
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const handleDots = (index) => {
    setShowModal(!showModal);
    setRow(index);
    console.log(showModal, row);
  };
  const combinedArray = [...[mainHeader], ...headers, ...[lastHeader]].filter(
    (item) => item !== ""
  );

  return (
    <table className="table-container">
      <Thead
        headers={headers}
        mainHeader={mainHeader}
        lastHeader={lastHeader}
      />
      <tbody>
        {tableData.length === 0 ? (
          <tr>
            <td className="blank-case">No items found</td>
          </tr>
        ) : (
          tableData.map((item, index) => (
            <tr key={index}>
              <FirstDataCell
                item={item}
                handleDots={() => handleDots(index)}
                lastHeader={lastHeader}
                mainHeader={mainHeader}
              />
              <MiddleDataCell item={item} headers={headers} />
              <LastDataCell
                item={item}
                lastHeader={lastHeader}
                handleDots={() => handleDots(index)}
              />
              {showModal && row == index && (
                <div className="dropDot">
                  <div className="dropDot-content">
                    <p>
                      <FaRegFile />
                      <span>Pogledaj detalje</span>
                    </p>
                    <p>
                      <FaRegEdit />
                      <span>Izmijeni korisnika</span>
                    </p>
                    <p>
                      <FaTrash />
                      <span>Izbrisi korisnika</span>
                    </p>
                  </div>
                </div>
              )}
            </tr>
          ))
        )}
        <SearchTableInputs combinedArray={combinedArray} />
      </tbody>
    </table>
  );
};

export default Table;
