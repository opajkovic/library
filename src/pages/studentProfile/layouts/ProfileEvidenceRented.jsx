import { useLoaderData, useNavigate, useParams } from "react-router";
import ProfileEvidence from "../components/ProfileEvidence";
import { useState } from "react";
import { useEffect } from "react";
import api from '../../../api/apiCalls'

export default function ProfileEvidenceRented() {
  let {id} = useParams()
  let [userInfo, setUserInfo] = useState()
  let navigate = useNavigate()
  const fetchedData = useLoaderData();
  let [tableData, setTableData] = useState([])

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
    { headerName: "Naziv knjige", sort: true, dropdown: false, dataKey: 'knjiga.title'},
    { headerName: "Izdato učeniku", sort: false, dropdown: false, dataKey: 'student.name' },
    { headerName: "Datum izdavanja", sort: false, dropdown: false, dataKey: 'borrow_date' },
    { headerName: "Trenutno zadržavanje knjiga", sort: false, dropdown: false, dataKey: 'borrow_date' },
    { headerName: "Knjigu izdao", sort: false, dropdown: true, dataKey: 'bibliotekar0.name' },
  ];
  useEffect(()=>{
    setTableData(fetchedData)
    fetchedData
    fetchUser()
  },[])

  return <ProfileEvidence tableData={tableData} userInfo={userInfo} headers={headers} />;
}
  export const BooksRentingLoader = async ({params}) => {
    const id = params.id;
    try {
      const response = await api.get(`/books/borrows`);
      const responseData = response.data.data;
      let responseData2 = responseData.izdate.filter(izdat => izdat.student.id == id)
      console.log(responseData2)
      return responseData2;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  };
  