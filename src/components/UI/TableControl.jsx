import Button from "./Button";
import { FaPlus, FaSearch } from "react-icons/fa";
import Input from "./Input";
import "./TableControl.css";
import Select from "./Select";

const TableControl = (props) => {
  return (
    <div className="table-control">
      {!props.hide && (
        <Button type="button" btn="btn btn-primary" onClick={props.onClick}>
          <FaPlus />
          <span> {props.title} </span>
        </Button>
      )}
      <Select />
      <div className="input-div">
        <span>
          <FaSearch className="search-icon" />
        </span>
        <Input
          input={{
            type: "text",
            inputClass: "form-control",
            placeholder: "Search...",
          }}
          className="table-global-search"
        />
      </div>
    </div>
  );
};

export default TableControl;
