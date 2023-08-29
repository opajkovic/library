import "../Table.css";

const MiddleDataCell = ({ item, headers }) => {
  return (
    headers &&
    headers.map((header, columnIndex) => (
      <td key={columnIndex}>{item[header.split(" ").join("")]}</td>
    ))
  );
};

export default MiddleDataCell;
