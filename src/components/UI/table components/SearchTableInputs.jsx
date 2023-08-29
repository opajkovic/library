import "../Table.css";

const SearchTableInputs = ({ combinedArray }) => {
  return (
    <tr>
      {combinedArray.map((item) => (
        <td key={item}>
          <input className="category-search" placeholder={`Pretraži ${item}`} />
        </td>
      ))}
    </tr>
  );
};

export default SearchTableInputs;
