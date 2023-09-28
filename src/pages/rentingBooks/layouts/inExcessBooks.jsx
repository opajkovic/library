import PageTitle from "../../../components/pageTitle/PageTitle";
import "../rentingBooks.css";
import BottomContainer from "../components/BottomContainer";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

export default function InExcessBooks() {
  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false, dataKey: 'knjiga.title' },
    { headerName: "Izdato učeniku", sort: false, dropdown: false, dataKey: 'student.name+student.surname' },
    { headerName: "Datum izdavanja", sort: false, dropdown: false, dataKey: 'borrow_date' },
    { headerName: "Prekoračenje u danima", sort: false, dropdown: false, dataKey: '' },
    { headerName: "Trenutno zadržavanje knjige", sort: false, dropdown: true, dataKey: '' },
  ];
  let [inExcess, setInExcess] = useState([])
  const fetchedData = useLoaderData();

  useEffect(()=>{
    let prekoracene2 = fetchedData
    setInExcess(prekoracene2.prekoracene)
  },[])

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer tableData={inExcess} title="Nova knjiga" headers={headers} />
    </div>
  );
}
