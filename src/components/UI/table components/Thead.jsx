import "../Table.css";
import { FaLongArrowAltDown } from "react-icons/fa";
import Input from "../Input";

const Thead = ({ headers, mainHeader, lastHeader }) => {
  return (
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
  );
};

export default Thead;
