import React, { useEffect, useState } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import "./rentingBooks.css";
import BottomContainer from "./components/BottomContainer";
import api from "../../api/apiCalls";
import { useLoaderData } from "react-router";
import { auth } from "../../services/AuthService";

export default function RentingBooks(props) {

  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false, dataKey: 'knjiga.title', path: `/books/:id`, pathId: 'knjiga' },
    { headerName: "Izdato učeniku", sort: false, dropdown: false, dataKey: 'student.name+student.surname', path: '/students/:id', pathId: 'student' },
    { headerName: "Datum izdavanja", sort: false, dropdown: false, dataKey: 'borrow_date' },
    { headerName: "Trenutno zadržavanje knjiga", sort: false, dropdown: false, dataKey: '' },
    { headerName: "Knjigu izdao", sort: false, dropdown: true, dataKey: 'bibliotekar0.name+bibliotekar0.surname', path: '/librarians/:id', pathId: 'bibliotekar' },
  ];
  let [izdate, setIzdate] = useState([])
  const fetchedData = useLoaderData();

  useEffect(()=>{
    let izdate2 = fetchedData
    setIzdate(izdate2.izdate)
  },[])

  return (
    <div className={props.className}>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer tableData={izdate} title="Nova knjiga" headers={headers} />
    </div>
  );
}
export async function LoaderRented() {
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/borrows`);
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
