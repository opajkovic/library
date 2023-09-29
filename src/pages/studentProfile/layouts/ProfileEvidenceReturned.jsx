import { useEffect } from "react";
import ProfileEvidence from "../components/ProfileEvidence";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import api from '../../../api/apiCalls'
import { LoaderRented } from "../../rentingBooks/rentingBooks";

export default function ProfileEvidenceReturned() {
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
    { headerName: "Naziv knjige", sort: false, dropdown: false, dataKey: 'knjiga.title', path: '/books/:id', pathId: 'knjiga' },
    { headerName: "Izdato učeniku", sort: false, dropdown: false, dataKey: 'student.name+student.surname' },
    { headerName: "Datum izdavanja", sort: false, dropdown: false, dataKey: 'borrow_date' },
    { headerName: "Datum vraćanja", sort: false, dropdown: false, dataKey: 'return_date' },
    { headerName: "Zadržavanje knjige", sort: false, dropdown: false, dataKey: '' },
    { headerName: "Trenutno zadržavanje knjige", sort: false, dropdown: true, dataKey: 'status' },
  ];
  useEffect(()=>{
      const fetchData = async () => {
        try {
          const responseData = await LoaderRented();
          let responseData2 = responseData.vracene.filter(el => el.student.id == id)
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
