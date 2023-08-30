import "./Dropdown.css";
import { FaRegEdit, FaRegFile, FaTrash } from "react-icons/fa";

const Dropdown = () => {
  return (
    <td className="dropdown-wrapper">
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
    </td>
  );
};

export default Dropdown;
