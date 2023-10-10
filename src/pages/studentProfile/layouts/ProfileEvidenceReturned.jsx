import { useEffect } from "react";
import ProfileEvidence from "../components/ProfileEvidence";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { useState } from "react";
import api from '../../../api/apiCalls'
import { LoaderRented } from "../../rentingBooks/rentingBooks";
import { auth } from "../../../services/AuthService";

export default function ProfileEvidenceReturned() {
  let {id} = useParams()
  let [userInfo, setUserInfo] = useState()
  let navigate = useNavigate()
  const [data, setData] = useState([]);
  let loaderData = useLoaderData()

  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false, dataKey: 'knjiga.title',
    path: "/books/:id",
    pathId: "knjiga"},
    { headerName: "Izdato učeniku", sort: false, dropdown: false, dataKey: 'student.name+student.surname',
    path: "/students/:id",
    pathId: "student", },
    { headerName: "Datum izdavanja", sort: false, dropdown: false, dataKey: 'borrow_date' },
    { headerName: "Datum vraćanja", sort: false, dropdown: false, dataKey: 'return_date' },
    { headerName: "Zadržavanje knjige", sort: false, dropdown: false, dataKey: '' },
    { headerName: "Trenutno zadržavanje knjige", sort: false, dropdown: true, dataKey: 'status' },
  ];
  useEffect(()=>{
    let dataUn = loaderData
    setData(dataUn)
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
  return <ProfileEvidence tableData={data} userInfo={userInfo} headers={headers} />;
}

export let loaderTestReturned = async({ params }) => {
  let data = []
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const responseData = await LoaderRented();
      let responseData2 = responseData.vracene.filter(el => el.student.id == id)
      data = responseData2
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }else{
    return []
  }

  return data
}