import Select from "react-select";
import "./InputSelect.css";

const InputSelect = (props) => {
  const { options, label, onChange } = props.select;

  return (
    <div className="input-select-container">
      <label htmlFor="select">{label}</label>
      <Select
        id="select"
        name="colors"
        className="basic-multi-select"
        classNamePrefix="select"
        options={
          options !== undefined &&
          options.map((item) => ({
            value: item.name,
            label: item.name,
          }))
        }
        onChange={(value) => onChange(value.value)}
      />
    </div>
  );
};

export default InputSelect;
