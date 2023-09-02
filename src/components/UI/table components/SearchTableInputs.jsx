import "../Table.css";

const SearchTableInputs = ({ headers }) => {
  return (
    <tr>
      {headers.map((item, index) => (
        <td key={index}>
          <input className="category-search" placeholder={`Pretraži ${item.headerName}`} />
        </td>
      ))}
    </tr>
  );
};

export default SearchTableInputs;
