import "../rentingBooks.css";
import RentingOptions from "../../rentingBooks/components/RentingOptions";
import Table from "../../../components/UI/Table";
import TableControl from "../../../components/UI/TableControl";
import Pagination from "../../../components/UI/Pagination";

const DUMMY_TABLE_DATA = [];

export default function BottomContainer(props) {
  return (
    <div className="bottom-container">
      <RentingOptions />
      <div className="table-wrapper">
        <TableControl title={props.title} hide="true" />
        <Table
          mainHeader=""
          headers={props.headers}
          lastHeader=""
          tableData={DUMMY_TABLE_DATA}
        />
        <Pagination items={DUMMY_TABLE_DATA} />
      </div>
    </div>
  );
}
