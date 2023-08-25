import "./Button.css";

const Button = (props) => {
  return (
    <button type={props.type} className={props.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
