import "./Table.css";
import Thead from "./table components/Thead";
import MiddleDataCell from "./table components/MiddleDataCell";
import SearchTableInputs from "./table components/SearchTableInputs";

const Table = ({ headers, tableData, options }) => {
  console.log(headers)
  return (
    <table className="table-container">
      <Thead headers={headers} />
      <tbody>
        {tableData.length === 0 ? (
          <tr>
            <td className="blank-case">No items found</td>
          </tr>
        ) : (
          <MiddleDataCell
            item={tableData}
            headers={headers}
            options={options}
          />
        )}
        <SearchTableInputs headers={headers} />
      </tbody>
    </table>
  );
};

export default Table;
