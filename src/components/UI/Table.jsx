import "./Table.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaLongArrowAltDown } from "react-icons/fa";
import photo from "../../assets/profileStudent.jpg";
import Input from "./Input";

const Table = ({ headers, tableData, mainHeader, lastHeader }) => {
  const handleDots = () => {};
  const combinedArray = [...[mainHeader], ...headers, ...[lastHeader]].filter(
    (item) => item !== ""
  );

  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>
            <Input input={{ type: "checkbox", className: "table-checkbox" }} />
            {mainHeader}
            <sub>
              <FaLongArrowAltDown className="arrow" />
            </sub>
          </th>
          {headers && headers.map((item, index) => <th key={index}>{item}</th>)}
          {lastHeader && <th> {lastHeader}</th>}
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            <td>
              <Input
                input={{ type: "checkbox", className: "table-checkbox" }}
              />
              {item.name}
            </td>
            {headers &&
              headers.map((header, columnIndex) => (
                <td key={columnIndex}>{item[header.split(" ").join("")]}</td>
              ))}
            {lastHeader && (
              <td className="flex-between">
                {item.lastHeader}
                <BsThreeDotsVertical className="dots" onClick={handleDots} />
              </td>
            )}
          </tr>
        ))}
        <tr>
          {combinedArray.map((item) => (
            <td key={item}>
              <input
                className="category-search"
                placeholder={`Pretraži ${item}`}
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
