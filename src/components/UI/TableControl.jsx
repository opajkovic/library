import Button from "./Button";
import { FaPlus, FaSearch } from "react-icons/fa";
import Input from "./Input";
import "./TableControl.css";
import Select from "./Select";

const TableControl = ({hide, onClick, title, itemsPerPageHandler, searchGlobal}) => {
  return (
    <div className="table-control">
      {!hide && (
        <Button type="button" btn="btn btn-primary" onClick={onClick}>
          <FaPlus />
          <span> {title} </span>
        </Button>
      )}
      <Select itemsPerPageHandler={itemsPerPageHandler}/>
      <div className="input-div">
        <span>
          <FaSearch className="search-icon" />
        </span>
        <Input
          input={{
            type: "text",
            inputClass: "form-control",
            placeholder: "Search...",
            onChange: searchGlobal
          }}
          className="table-global-search"
        />
      </div>
    </div>
  );
};

export default TableControl;
