import "./Table.css";
import Thead from "./table components/Thead";
import FirstDataCell from "./table components/FirstDataCell";
import MiddleDataCell from "./table components/MiddleDataCell";
import LastDataCell from "./table components/LastDataCell";
import SearchTableInputs from "./table components/SearchTableInputs";
import { useState } from "react";
import Dropdown from "./table components/Dropdown";

const Table = ({
  headers,
  tableData,
  mainHeader,
  lastHeader,
  options,
  onClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState(null);

  const handleDots = (index) => {
    setShowModal(true);
    setRow(index);
    setTimeout(() => {
      setShowModal(false);
    }, [3000]);
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
              {showModal && row === index && (
                <Dropdown options={options} onClick={() => onClick(item.id)} />
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
