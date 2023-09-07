import { useNavigate, useParams } from "react-router";
import ProfileEvidence from "../components/ProfileEvidence";
import { useState } from "react";
import api from '../../../api/apiCalls'
import { useEffect } from "react";

export default function ProfileEvidenceExcess() {
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
    { headerName: "Izdato učeniku", sort: false, dropdown: false },
    { headerName: "Datum izdavanja", sort: false, dropdown: false },
    { headerName: "Prekoračenje u danima", sort: false, dropdown: false },
    { headerName: "Trenutno zadržavanje knjige", sort: false, dropdown: true },
  ];
  useEffect(()=>{
    fetchUser()
  },[])

  return <ProfileEvidence userInfo={userInfo} headers={headers} />;
}
