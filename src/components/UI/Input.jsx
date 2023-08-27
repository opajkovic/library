import "./Input.css";

const Input = (props) => {
  const { title, label, id, type, name, defaultValue, className } = props.input;
  return (
    <div className={`${className ? className : "input"}`}>
      <label htmlFor={title}>
        {label}
      </label>
      <input
        id={title}
        type={type}
        name={title}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};

export default Input;
