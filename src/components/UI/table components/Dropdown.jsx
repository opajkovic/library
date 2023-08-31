import "./Dropdown.css";
import { FaRegEdit, FaRegFile, FaTrash, FaBook } from "react-icons/fa";

const Dropdown = ({ options, onClick }) => {
  console.log(options.forth.forth);
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
      {options.forth !== "" &&
        options.forth.forth.map((item, index) => (
          <p key={index}>
            <FaBook /> <span key={index}>{item}</span>
          </p>
        ))}
      <p>
        <FaTrash />
        <span>{options.third}</span>
      </p>
    </td>
  );
};

export default Dropdown;
