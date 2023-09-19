import "../Table.css";
import { FaLongArrowAltDown } from "react-icons/fa";
import Input from "../Input";

const Thead = ({ headers, handleSort }) => {
  return (
    <thead>
      <tr>
        {headers.map((item, index) => (
          <th key={index}>
            {item.sort && (
              <Input
                input={{ type: "checkbox", className: "table-checkbox" }}
              />
            )}
            {item.headerName}
            {item.sort && (
              <sub>
                <FaLongArrowAltDown onClick={handleSort} className="arrow" />
              </sub>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
