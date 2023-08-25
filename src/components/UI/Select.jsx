import "./Select.css";

const Select = (props) => {
    return (
        <div>
            <label htmlFor={props.option}>Option</label>
            <select 
                name={props.option} 
                id={props.option}
                value={props.option}
                onChange={props.handleOption}
                >
            {props.options.map((option) => {
                return <option key={option}>{option}</option>
            })}
            </select>
        </div>
    )
};

export default Select;
