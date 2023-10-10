import { useEffect } from "react";
import ProfileEvidence from "../components/ProfileEvidence";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { useState } from "react";
import api from '../../../api/apiCalls'
import { LoaderRented } from "../../rentingBooks/rentingBooks";
import { auth } from "../../../services/AuthService";

export default function ProfileEvidenceWrittenOff() {
  let {id} = useParams()
  let [userInfo, setUserInfo] = useState()
  let navigate = useNavigate()
  const [data, setData] = useState([]);
  let loaderData = useLoaderData()

  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false, dataKey: 'knjiga.title' },
    { headerName: "Izdato učeniku", sort: false, dropdown: false, dataKey: 'student.name+student.surname' },
    { headerName: "Datum izdavanja", sort: false, dropdown: false, dataKey: 'borrow_date' },
    { headerName: "Datum otpisivanja", sort: false, dropdown: false },
    { headerName: "Zadržavanje knjige", sort: false, dropdown: false },
    { headerName: "Knjigu otpisao", sort: false, dropdown: true,dataKey: 'bibliotekar0.name+bibliotekar0.surname', path: '/librarians/:id', pathId: 'bibliotekar' },
  ];
  useEffect(()=>{
    let dataUn = loaderData
    setData(dataUn)
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
  
  },[])
  return <ProfileEvidence tableData={data} userInfo={userInfo} headers={headers} />;
}
export let loaderTestWrittenOff= async({ params }) => {
  let data = []
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const responseData = await LoaderRented();
      let responseData2 = responseData.otpisane.filter(el => el.student.id == id)
      data = responseData2
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }else{
    return []
  }
  return data
}