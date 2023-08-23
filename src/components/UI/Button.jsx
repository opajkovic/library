import "./Button.css";

const Button = (props) => {
  return (
    <button type={props.type} className={props.primary}>
      {props.children}
    </button>
  );
};

export default Button;
