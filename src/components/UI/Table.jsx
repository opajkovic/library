import "./Table.css";
import Thead from "./table components/Thead";
import TableData from "./table components/TableData";
import SearchTableInputs from "./table components/SearchTableInputs";

const Table = ({ headers, tableData, options, path }) => {

  return (
    <table className="table-container">
      <Thead headers={headers} />
      <tbody>
        {tableData.length === 0 ? (
          <tr>
            <td className="blank-case">No items found</td>
          </tr>
        ) : (
          <TableData
            item={tableData}
            headers={headers}
            options={options}
            path={path}
          />
        )}
        <SearchTableInputs headers={headers} />
      </tbody>
    </table>
  );
};

export default Table;
