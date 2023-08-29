import Button from "./Button";
import { FaPlus, FaSearch } from "react-icons/fa";
import Input from "./Input";
import "./TableControl.css";
import Select from "./Select";

const TableControl = (props) => {
  return (
    <div className="table-control">
      <Button type="button" btn="btn btn-primary">
        <FaPlus />
        <span> {props.title} </span>
      </Button>
      <Select />
      <div className="input-div">
        <span>
          <FaSearch className="search-icon" />
        </span>
        <Input
          input={{
            type: "text",
            className: "table-global-search",
            inputClass: "form-control",
            placeholder: "Search...",
          }}
        />
      </div>
    </div>
  );
};

export default TableControl;
