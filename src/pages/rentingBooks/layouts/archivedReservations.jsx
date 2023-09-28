import PageTitle from "../../../components/pageTitle/PageTitle";
import "../rentingBooks.css";
import BottomContainer from "../components/BottomContainer";
import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";


export default function ArchivedReservations() {

  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false, dataKey: 'knjiga.title' },
    { headerName: "Datum rezervacije", sort: false, dropdown: false, dataKey: 'action_date' },
    { headerName: "Rezervacija zatvorena", sort: false, dropdown: false },
    { headerName: "Rezervaciju podnio", sort: false, dropdown: false, dataKey: 'student.name' },
    { headerName: "Status", sort: false, dropdown: true, dataKey: 'status' },
  ];
  let fetchedData = useLoaderData()
  let [arhivedData, setArhivedData] = useState([])

  useEffect(()=>{
    let aktivne = fetchedData.archive
    setArhivedData(aktivne)
  },[])

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer
        title="Nova knjiga"
        headers={headers}
        tableData={arhivedData}
      />
    </div>
  );
}
