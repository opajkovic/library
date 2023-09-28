import { useEffect } from "react";
import ProfileEvidence from "../components/ProfileEvidence";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { useState } from "react";
import api from '../../../api/apiCalls'

export default function ProfileEvidenceReserved() {
  let {id} = useParams()
  let [userInfo, setUserInfo] = useState()
  let navigate = useNavigate()
  let fetchData = useLoaderData()
  let [reservations, setReservations] = useState([])

  let fetchUser = () =>{
    api.get(`/users/${id}`).then(response => {
      if(response.data.data.role == 'Učenik'){
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
  }
  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false, dataKey: 'knjiga.title' },
    { headerName: "Datum rezervacije", sort: false, dropdown: false,dataKey: 'borrow_date' },
    { headerName: "Rezervacija ističe", sort: false, dropdown: false,dataKey: 'return_date'},
    { headerName: "Rezervaciju podnio", sort: false, dropdown: false, dataKey: 'bibliotekar0.name' },
    { headerName: "Status", sort: false, dropdown: true, dataKey: "status" },
  ];
  useEffect(()=>{
    let reservationsTest = fetchData
    setReservations(reservationsTest.active.filter(item => item.student.id == id));
    console.log(reservationsTest.active[0])
    fetchUser()
  },[])
  return <ProfileEvidence tableData={reservations} userInfo={userInfo} headers={headers} />;
}
