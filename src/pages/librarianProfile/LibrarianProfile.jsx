import React, { useEffect } from "react";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useLoaderData, useNavigate } from "react-router";
import UserInfo from "../studentProfile/components/UserInfo";
import api from "../../api/apiCalls";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLibrarian } from "../../redux/actions";
import { toast } from "react-toastify";
import { auth } from "../../services/AuthService";

export default function LibrarianProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const fetchedData = useLoaderData();
  const librariansData = useSelector((state) => state.librarians);

  useEffect(() => {
    setUserInfo(fetchedData);
  }, []);

  const handleDelete = async () => {
    if (!!localStorage.getItem('token') && ((localStorage.getItem("role") == 'Bibliotekar' && localStorage.getItem("id") == fetchedData.id) || localStorage.getItem("role") == 'Administrator')) {  
      try{
        api.delete(`/users/${fetchedData.id}`);
        dispatch(deleteLibrarian(librariansData, fetchedData.id));
        toast.success("Bibliotekar izbrisan")
        navigate('/librarians')
      }catch (err){
        toast.error(err.response.data.date)
      }
    }else{
      toast.error("Nemate pravo iizbrisati ovog bibliotekara!")
    }
  };

  return (
    <div>
      <ProfileTitle
        userInfo={userInfo}
        linkOne={"Svi bibliotekari"}
        linkOnePath={"/librarians"}
        linkTwoPath={`/librarians/`}
        change={true}
        reset={true}
        deleteMssg={true}
        editPath={`/librarians/${fetchedData.id}/edit`}
        handleDelete={()=>handleDelete()}
      />
      <div className="student-info-wrapper">
        <UserInfo userInfo={userInfo} />
      </div>
    </div>
  );
}

export const LibrarianProfileLoader = async ({ params }) => {
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
    const id = params.id;
    try {
      const response = await api.get(`/users/${id}`);
      const responseData = response.data.data;
  
      if (responseData.role == "Bibliotekar") {
        return responseData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  }else{
    return []
  }
};
