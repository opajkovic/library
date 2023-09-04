
const Input = (props) => {

  const {
    label,
    type,
    name,
    value,
    placeholder,
    onChange,
    onBlur,
    hasError,
    inputClasses,
  } = props.input;

  return (
    <div className={props.className}>
      <label >
        {label} {props.sup && <sup>*</sup>}
      </label>
      <input
        className={inputClasses}
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
