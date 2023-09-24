import "../rentingBooks.css";
import RentingOptions from "../../rentingBooks/components/RentingOptions";
import Table from "../../../components/UI/Table";
import TableControl from "../../../components/UI/TableControl";
import Pagination from "../../../components/UI/Pagination";

export default function BottomContainer(props) {
  return (
    <div className="bottom-container">
      <RentingOptions paths={props.paths} />
      <div className="table-wrapper">
        <TableControl title={props.title} hide="true" />
        <Table
          mainHeader=""
          headers={props.headers}
          lastHeader=""
          tableData={props.tableData}
        />
        <Pagination items={props.tableData} />
      </div>
    </div>
  );
}
