import { useLoaderData, useNavigate, useParams } from "react-router";
import ProfileEvidence from "../components/ProfileEvidence";
import { useState } from "react";
import { useEffect } from "react";
import api from '../../../api/apiCalls'
import { LoaderRented } from "../../rentingBooks/rentingBooks";
import { auth } from "../../../services/AuthService";

export default function ProfileEvidenceRented() {
  let {id} = useParams()
  let [userInfo, setUserInfo] = useState()
  let navigate = useNavigate()
  let [tableData, setTableData] = useState([])
  let loaderData = useLoaderData()

  const headers = [
    { headerName: "Naziv knjige", sort: true, dropdown: false, dataKey: 'knjiga.title',
    path: "/books/:id",
    pathId: "knjiga"},
    { headerName: "Izdato učeniku", sort: false, dropdown: false, dataKey: 'student.name+student.surname',
    path: "/students/:id",
    pathId: "student", },
    { headerName: "Datum izdavanja", sort: false, dropdown: false, dataKey: 'borrow_date' },
    { headerName: "Trenutno zadržavanje knjiga", sort: false, dropdown: false, dataKey: 'borrow_date' },
    { headerName: "Knjigu izdao", sort: false, dropdown: true, dataKey: 'bibliotekar0.name+bibliotekar0.surname', path: '/librarians/:id', pathId: 'bibliotekar' },
  ];
  useEffect(()=>{
    let dataUn = loaderData
    setTableData(dataUn)
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

  return <ProfileEvidence tableData={tableData} userInfo={userInfo} headers={headers} />;
}
  export let loaderTestRented = async({ params }) => {
  let data = []
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const responseData = await LoaderRented();
      let responseData2 = responseData.izdate.filter(el => el.student.id == id)
      data = responseData2
      return data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }else{
    return []
  }

}