import { useEffect } from "react";
import ProfileEvidence from "../components/ProfileEvidence";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { useState } from "react";
import api from '../../../api/apiCalls'
import { auth } from "../../../services/AuthService";

export default function ProfileEvidenceReserved() {
  let {id} = useParams()
  let [userInfo, setUserInfo] = useState()
  let navigate = useNavigate()
  let [reservations, setReservations] = useState([])
  let loaderData = useLoaderData()

  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false, dataKey: 'knjiga.title', path: '/books/:id', pathId: 'knjiga'  },
    { headerName: "Datum rezervacije", sort: false, dropdown: false,dataKey: 'borrow_date' },
    { headerName: "Rezervacija ističe", sort: false, dropdown: false,dataKey: 'return_date'},
    { headerName: "Rezervaciju podnio", sort: false, dropdown: false, dataKey: 'bibliotekar0.name+bibliotekar0.surname', path: '/librarians/:id', pathId: 'bibliotekar'  },
    { headerName: "Status", sort: false, dropdown: true, dataKey: "status" },
  ];
  useEffect(()=>{
    let dataUn = loaderData
    setReservations(dataUn)
    api.get(`/users/${id}`).then(response => {
      if(response.data.data.role == 'Učenik'){
        console.log(response.data.data)
        setUserInfo(response.data.data)
      }
      else if(response.data.data.role == "Bibliotekar"){
        navigate(`/librarians/${id}`)
      }else if(response.data.data.role == "Administrator"){
        navigate(`/administrators/${id}`)
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  },[])
  return <ProfileEvidence tableData={reservations} userInfo={userInfo} headers={headers} />;
}

export let loaderTestActive= async({ params }) => {
  let data = []
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/reservations`);
      const responseData = response.data.data;
      let responseData2 = responseData.active.filter(el => el.student.id == id)
      data = responseData2
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  }else{
    return []
  }

  return data
}