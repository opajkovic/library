import { useEffect } from "react";
import ProfileEvidence from "../components/ProfileEvidence";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import api from "../../../api/apiCalls";
import { reservationLoader } from "../../dashboard/Dashboard";

export default function ProfileEvidenceArchived() {
  let { id } = useParams();
  let [userInfo, setUserInfo] = useState();
  let [data, setData] = useState([]);
  let navigate = useNavigate();

  let fetchUser = () => {
    api
      .get(`/users/${id}`)
      .then((response) => {
        if (response.data.data.role == "Učenik") {
          setUserInfo(response.data.data);
        } else if (response.data.data.role == "Bibliotekar") {
          navigate(`/librarians/${id}`);
        } else if (response.data.data.role == "Administrator") {
          navigate(`/administrators/${id}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false, dataKey: 'knjiga.title', path: '/books/:id', pathId: 'knjiga'  },
    { headerName: "Datum rezervacije", sort: false, dropdown: false, dataKey: 'borrow_date' },
    { headerName: "Rezervacija zatvorena", sort: false, dropdown: false, dataKey: '' },
    { headerName: "Rezervaciju podnio", sort: false, dropdown: false, dataKey: 'bibliotekar0.name+bibliotekar0.surname', path: '/librarians/:id', pathId: 'bibliotekar'  },
    { headerName: "Status", sort: false, dropdown: true, dataKey: 'status' },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await reservationLoader();
        let responseData2 = responseData.archive.filter(el => el.student.id == id)
        setData(responseData2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()
    fetchUser();
  }, []);
  return <ProfileEvidence tableData={data} userInfo={userInfo} headers={headers} />;
}
