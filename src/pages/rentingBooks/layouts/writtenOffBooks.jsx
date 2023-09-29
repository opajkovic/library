import PageTitle from "../../../components/pageTitle/PageTitle";
import "../rentingBooks.css";
import BottomContainer from "../components/BottomContainer";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

export default function WrittenOffBooks() {

  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false, dataKey: 'knjiga.title', path: '/books/:id', pathId: 'knjiga' },
    { headerName: "Izdato učeniku", sort: false, dropdown: false, dataKey: 'student.name+student.surname', path: '/students/:id', pathId: 'student' },
    { headerName: "Datum izdavanja", sort: false, dropdown: false },
    { headerName: "Datum otpisivanja", sort: false, dropdown: false },
    { headerName: "Zadržavanje knjige", sort: false, dropdown: false },
    { headerName: "Knjigu otpisao", sort: false, dropdown: true },
  ];
  let [otpisane, setOtpisane] = useState([])
  const fetchedData = useLoaderData();

  useEffect(()=>{
    let otpisane2 = fetchedData
    setOtpisane(otpisane2.otpisane)
  },[])

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer tableData={otpisane} title="Nova knjiga" headers={headers} />
    </div>
  );
}
