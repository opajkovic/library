import "./Table.css";
import Thead from "./table components/Thead";
import TableData from "./table components/TableData";
import SearchTableInputs from "./table components/SearchTableInputs";

const Table = ({ headers, tableData, options, path, className, searchColumn, handleDelete, handleSort}) => {
  return (
    <table className={`${className} table-container`}>
      <Thead headers={headers} handleSort={handleSort}/>
      <tbody>
        {(tableData && tableData.length === 0) || !tableData ? (
          <tr>
            <td className="blank-case">No items found</td>
          </tr>
        ) : (
          <TableData
            item={tableData}
            headers={headers}
            options={options}
            path={path}
            handleDelete={handleDelete}
          />
        )}
        <SearchTableInputs headers={headers} searchColumn={searchColumn} />
      </tbody>
    </table>
  );
};

export default Table;
