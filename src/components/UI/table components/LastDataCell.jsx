import "../Table.css";
import { BsThreeDotsVertical } from "react-icons/bs";

const LastDataCell = ({ item, lastHeader, handleDots }) => {
  return (
    lastHeader && (
      <td className="flex-between">
        {item.lastHeader}
        <BsThreeDotsVertical className="dots" onClick={handleDots} />
      </td>
    )
  );
};

export default LastDataCell;
