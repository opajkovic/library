import "./Input.css";

const Input = (props) => {
    const {title,label,id,type,name,defaultValue} = props.input
    return (
      <div className="input">
      <label htmlFor={title}>{label}<sup>*</sup></label>
      <input 
        id={title}
        type={type}
        name={title}
        defaultValue={defaultValue}
        required
      />
      </div>  
        )
};

export default Input;
