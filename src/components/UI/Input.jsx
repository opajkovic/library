import "./Input.css";

const Input = (props) => {
  const {label, type, name, defaultValue, className, placeholder, inputClass } = props.input;
  return (
    <div className={className}>
      <label htmlFor={inputClass}>{label}</label>
      <input
        className={inputClass}
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Input;
