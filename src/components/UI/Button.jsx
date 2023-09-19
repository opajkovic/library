import "./Button.css";

const Button = (props) => {
  const btnClass = `button-div ${props.className}`;
  return (
    <div className={btnClass}>
    <button type={props.type} className={props.btn} onClick={props.function} disabled={props.disabled}>
      {props.children}
    </button>
    </div>
  );
};

export default Button;
