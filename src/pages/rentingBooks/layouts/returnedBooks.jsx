import PageTitle from "../../../components/pageTitle/PageTitle";
import "../rentingBooks.css";
import BottomContainer from "../components/BottomContainer";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

export default function ReturnedBooks() {

  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false, dataKey: 'knjiga.title', path: '/books/:id', pathId: 'knjiga' },
    { headerName: "Izdato učeniku", sort: false, dropdown: false, dataKey: 'student.name+student.surname', path: '/students/:id', pathId: 'student' },
    { headerName: "Datum izdavanja", sort: false, dropdown: false, dataKey: 'borrow_date' },
    { headerName: "Datum vraćanja", sort: false, dropdown: false, dataKey: 'return_date' },
    { headerName: "Zadržavanje knjige", sort: false, dropdown: false, dataKey: '' },
    { headerName: "Trenutno zadržavanje knjige", sort: false, dropdown: true, dataKey: '' },
  ];
  let [vracene, setVracene] = useState([])
  const fetchedData = useLoaderData();

  useEffect(()=>{
    let vracene2 = fetchedData
    setVracene(vracene2.vracene)
  },[])

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer tableData={vracene} title="Nova knjiga" headers={headers} />
    </div>
  );
}
