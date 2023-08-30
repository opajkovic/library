import "../Table.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Input from "../Input";

const FirstDataCell = ({ item, handleDots, lastHeader, mainHeader}) => {
  return (
    mainHeader !== "" && <td>
      <div className="left-container">
        <Input input={{ type: "checkbox", className: "table-checkbox" }} />
        {item.name}
      </div>
      {lastHeader === "" && (
        <BsThreeDotsVertical
          className="main-header-dots"
          onClick={handleDots}
        />
      )}
    </td>
  );
};

export default FirstDataCell;
