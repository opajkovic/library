import { useEffect } from "react";
import ProfileEvidence from "../components/ProfileEvidence";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import api from '../../../api/apiCalls'

export default function ProfileEvidenceReserved() {
  let {id} = useParams()
  let [userInfo, setUserInfo] = useState()
  let navigate = useNavigate()

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
    { headerName: "Naziv knjige", sort: false, dropdown: false },
    { headerName: "Datum rezervacije", sort: false, dropdown: false },
    { headerName: "Rezervacija ističe", sort: false, dropdown: false },
    { headerName: "Rezervaciju podnio", sort: false, dropdown: false },
    { headerName: "Status", sort: false, dropdown: true },
  ];
  useEffect(()=>{
    fetchUser()
  },[])
  return <ProfileEvidence userInfo={userInfo} headers={headers} />;
}
