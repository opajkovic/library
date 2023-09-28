import { useEffect } from "react";
import ProfileEvidence from "../components/ProfileEvidence";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import api from '../../../api/apiCalls'
import { LoaderRented } from "../../rentingBooks/rentingBooks";

export default function ProfileEvidenceWrittenOff() {
  let {id} = useParams()
  let [userInfo, setUserInfo] = useState()
  let navigate = useNavigate()
  const [data, setData] = useState([]);

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
    { headerName: "Izdato učeniku", sort: false, dropdown: false, dataKey: 'student.name+student.surname' },
    { headerName: "Datum izdavanja", sort: false, dropdown: false },
    { headerName: "Datum otpisivanja", sort: false, dropdown: false },
    { headerName: "Zadržavanje knjige", sort: false, dropdown: false },
    { headerName: "Knjigu otpisao", sort: false, dropdown: true },
  ];
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const responseData = await LoaderRented();
        let responseData2 = responseData.otpisane.filter(el => el.student.id == id)
        setData(responseData2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()
    fetchUser()
  },[])
  return <ProfileEvidence tableData={data} userInfo={userInfo} headers={headers} />;
}
