import "./Input.css";

const Input = (props) => {
  const {
    label,
    type,
    name,
    value,
    className,
    placeholder,
    inputClass,
    onChange,
    onBlur,
    hasError
  } = props.input;
  return (
    <div className={className}>
      <label htmlFor={inputClass}>{label}</label>
      <input
        className={inputClass}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required
      />
      {hasError && (
        <p className="error-message"> Uneseni podatak nije validan! </p>
      )}
    </div>
  );
};

export default Input;
