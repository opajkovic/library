import "./Button.css";

const Button = (props) => {
  return (
    <div className="button">
    <button type={props.type} className={props.btn} onClick={props.onClick}>
      {props.children}
    </button>
    </div>
  );
};

export default Button;
