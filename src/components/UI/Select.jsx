import "./Select.css";

const Select = ({ itemsPerPageHandler }) => {
  const numbers = [5, 10, 15, 20];

  const handleChange = (event) => {
    const selectedValue = +event.target.value;
    itemsPerPageHandler(selectedValue);
  };

  return (
    <div className="select-wrapper">
      <label htmlFor="number-select"> Prikazi </label>
      <select id="number-select" onChange={handleChange}>
        {numbers.map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
      <span className="additional-text"> zapisa </span>
    </div>
  );
};

export default Select;
