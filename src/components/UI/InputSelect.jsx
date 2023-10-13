import Select from "react-select";
import "./InputSelect.css";

const InputSelect = (props) => {
  const { options, label, onChange, value } = props.select;

  return (
    <div className="input-select-container">
      <label htmlFor="select">{label}</label>
      <Select
        className="basic-single"
        classNamePrefix="select"
        id="select"
        name="colors"
        value={value}
        options={
          options !== undefined &&
          options.map((item) => ({
            value: item.surname ? item.name + " " + item.surname : item.name,
            label: item.surname ? item.name + " " + item.surname : item.name,
          }))
        }
        onChange={(selectedOption) => onChange(selectedOption)}
      />
    </div>
  );
};

export default InputSelect;
