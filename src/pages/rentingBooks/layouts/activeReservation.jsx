import PageTitle from "../../../components/pageTitle/PageTitle";
import "../rentingBooks.css";
import BottomContainer from "../components/BottomContainer";
import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import api from "../../../api/apiCalls";
import { auth } from "../../../services/AuthService";

export default function ActiveReservations() {
  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false, dataKey: 'knjiga.title', path: '/books/:id', pathId: 'knjiga' },
    { headerName: "Datum rezervacije", sort: false, dropdown: false, dataKey: 'action_date' },
    { headerName: "Rezervacija ističe", sort: false, dropdown: false, dataKey: '' },
    { headerName: "Rezervaciju podnio", sort: false, dropdown: false, dataKey: 'student.name+student.surname', path: '/students/:id', pathId: 'student' },
    { headerName: "Status", sort: false, dropdown: true, dataKey: 'status' },
  ];
  let fetchedData = useLoaderData()
  let [activeData, setActiveData] = useState([])

  useEffect(()=>{
    let aktivne = fetchedData.active
    setActiveData(aktivne)
  },[])

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer tableData={activeData} title="Nova knjiga" headers={headers} />
    </div>
  );
}
export async function LoaderReservations() {
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/reservations`);
      const responseData = response.data.data;
      console.log(responseData)
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  }else{
    return []
  }
}
