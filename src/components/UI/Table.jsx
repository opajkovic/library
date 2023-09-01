import "./Table.css";
import Thead from "./table components/Thead";
import FirstDataCell from "./table components/FirstDataCell";
import MiddleDataCell from "./table components/MiddleDataCell";
import LastDataCell from "./table components/LastDataCell";
import SearchTableInputs from "./table components/SearchTableInputs";
import { useState } from "react";
import { FaRegAddressBook } from "react-icons/fa";

const Table = ({
  headers,
  tableData,
  mainHeader,
  lastHeader,
  options
}) => {
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState(1);


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
                lastHeader={lastHeader}
                mainHeader={mainHeader}
                options={options}
              />
              <MiddleDataCell item={item} headers={headers} />
              <LastDataCell
                item={item}
                lastHeader={lastHeader}
                options={options}
              />
            </tr>
          ))
        )}
        <SearchTableInputs combinedArray={combinedArray} />
      </tbody>
    </table>
  );
};

export default Table;
