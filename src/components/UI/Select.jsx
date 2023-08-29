import "./Select.css";

const Select = () => {
  const numbers = [];
  for (let i = 5; i <= 20; i += 5) {
    numbers.push(i);
  }

  return (
    <div className="select-wrapper">
      <label htmlFor="number-select"> Prikazi </label>
      <select id="number-select">
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
