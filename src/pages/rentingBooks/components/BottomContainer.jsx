import "../rentingBooks.css";
import RentingOptions from "../../rentingBooks/components/RentingOptions";
import Table from "../../../components/UI/Table";
import TableControl from "../../../components/UI/TableControl";
import Pagination from "../../../components/UI/Pagination";
import { FaLevelUpAlt, FaRedo, FaRegFile } from "react-icons/fa";

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
          path={"/izdavanje"}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaRegFile />,
              path: "",
            },
            {
              text: "Otpisi knjigu",
              icon: <FaLevelUpAlt />,
              path: "otpisi-knjigu",
            },
            {
              text: "Vrati knjigu",
              icon: <FaRedo />,
              path: "vrati-knjigu",
            },
          ]}
        />
        <Pagination items={props.tableData} />
      </div>
    </div>
  );
}
