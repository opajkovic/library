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
        defaultValue={value}
        options={
          options !== undefined &&
          options.map((item) => ({
            value: item.name,
            label: item.name,
          }))
        }
        onChange={(selectedOption) => onChange(selectedOption)}
      />
    </div>
  );
};

export default InputSelect;
