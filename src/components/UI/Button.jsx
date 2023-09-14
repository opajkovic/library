import "./Button.css";

const Button = (props) => {
  const btnClass = `button-div ${props.className}`;
  return (
    <div className={btnClass}>
    <button type={props.type} className={props.btn} onClick={props.function}>
      {props.children}
    </button>
    </div>
  );
};

export default Button;
