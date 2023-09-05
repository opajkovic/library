import "./FormSelect.css";
import Input from "./Input";

const FormSelect = (props) => {
  const { label, options, onChange, input } =
    props.select;

  return (
    <div className="form-select-wrapper">
      <Input input={input} label={label}/>
      {/* <select
        id="number-select"
        onChange={onChange}
      >
        {options.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select> */}
      {/* {hasError && (
        <p className="error-message"> Uneseni podatak nije validan! </p>
      )} */}
    </div>
  );
};

export default FormSelect;
