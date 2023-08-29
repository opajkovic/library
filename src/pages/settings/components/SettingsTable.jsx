import "./SettingsTable.css";
import Table from "../../../components/UI/Table";
import TableControl from "../../../components/UI/TableControl";

export default function SettingsTable(props) {

  return (
    <div className="settings-table-wrapper">
      <TableControl title={props.title} />
      <Table
        mainHeader={props.mainHeader}
        lastHeader={props.lastHeader}
        tableData={props.tableData}
        headers={props.headers}
      />
    </div>
  );
}