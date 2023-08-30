import "./Dropdown.css";
import { FaRegEdit, FaRegFile, FaTrash } from "react-icons/fa";

const Dropdown = ({ options, onClick }) => {
  console.log(options);
  return (
    <td className="dropdown-wrapper">
      {options.first !== "" && (
        <p>
          <FaRegFile />
          <span onClick={onClick}>{options.first}</span>
        </p>
      )}
      <p>
        <FaRegEdit />
        <span>{options.second}</span>
      </p>
      <p>
        <FaTrash />
        <span>{options.third}</span>
      </p>
    </td>
  );
};

export default Dropdown;
