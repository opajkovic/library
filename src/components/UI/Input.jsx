const Input = (props) => {
  const {
    label,
    type,
    name,
    value,
    placeholder,
    onChange,
    onBlur,
    onClick,
    onKeyUp,
    hasError,
    inputClasses,
    disabled,
    id
  } = props.input;

  return (
    <div className={props.className}>
      {label ? <label>
        {label} {props.sup && <sup>*</sup>}
      </label> : <></>}
      <input
        id={id}
        className={inputClasses}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onClick={onClick}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        required
      />
      {hasError && (
        <p className="error-message"> Uneseni podatak nije validan! </p>
      )}
    </div>
  );
};

export default Input;
