import "./SettingsTable.css";
import Table from "../../../components/UI/Table";
import TableControl from "../../../components/UI/TableControl";
import Pagination from "../../../components/UI/Pagination";

export default function SettingsTable(props) {
  return (
    <div className="settings-table-wrapper">
      <TableControl title={props.title} onClick={props.onClick} />
      <Table
        tableData={props.tableData}
        headers={props.headers}
        options={props.options}
      />
      <Pagination items={props.tableData} />
    </div>
  );
}
