import "./Textarea.css";

const Textarea = (props) => {
  const {
    label,
    type,
    name,
    value,
    placeholder,
    inputClass,
    onChange,
    onBlur,
    hasError,
  } = props.textarea;

  return (
    <div className={props.className}>
      <label htmlFor={inputClass}>
        {label} {props.sup && <sup>*</sup>}
      </label>
      <textarea
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

export default Textarea;
