import "../Table.css";

const SearchTableInputs = ({ headers, searchColumn }) => {
  const handleInputChange = (event, headerName) => {
    const searchValue = event.target.value.toLowerCase();
    searchColumn([headerName], searchValue);
  };

  return (
    <tr>
      {headers.map((item, index) => (
        <td key={index}>
          <input
            className="category-search"
            onChange={(event) => handleInputChange(event, item)}
            placeholder={`Pretraži ${item.headerName}`}
          />
        </td>
      ))}
    </tr>
  );
};

export default SearchTableInputs;
