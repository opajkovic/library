import "./Table.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaLongArrowAltDown } from "react-icons/fa";
import photo from "../../assets/profileStudent.jpg";
import Input from "./Input";

const Table = ({ headers, tableData }) => {
  const handleDots = () => {};
  return (
    <table id="table">
      <thead>
        <tr>
          <th>
            <Input input={{ type: "checkbox", className: "table-checkbox" }} />
            Ime i prezime
            <sub>
              <FaLongArrowAltDown className="arrow" />
            </sub>
          </th>
          {headers.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
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
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td className="flex-between">
              {item.lastAccess}
              <BsThreeDotsVertical className="dots" onClick={handleDots} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
