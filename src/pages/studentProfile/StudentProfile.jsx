import React, { useEffect } from "react";
import "./studentProfile.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { redirect, useLoaderData, useNavigate} from "react-router";
import LinkWrapper from "./components/LinkWrapper";
import UserInfo from "./components/UserInfo";
import { useState } from "react";
import api from "../../api/apiCalls";
import { deleteStudent } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../services/AuthService";

export default function StudentProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState();
  const fetchedData = useLoaderData();
  const studentsData = useSelector((state) => state.students);

  useEffect(() => {
    setUserInfo(fetchedData);
  }, []);

  const handleDelete = async () => {
    if(localStorage.getItem("role") != 'Student' || (localStorage.getItem("role") == 'Student') && localStorage.getItem("id") == id){
    try {
      const response = await api.delete(`/users/${fetchedData.id}`);
      toast.success("Izbrisan student");
      dispatch(deleteStudent([studentsData], fetchedData.id));
      navigate('/students');
    } catch (err) {
      if (err.response && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  }else{
    toast.error("Nemate pravo izbrisati drugog studenta!")
  }
  };
  

  return (
    <div>
      <ProfileTitle
        userInfo={userInfo ? userInfo : { name: "ha" }}
        linkOne={"Svi Studenti"}
        linkOnePath={"/students"}
        linkTwoPath={`/students/`}
        change={true}
        reset={true}
        deleteMssg={true}
        editPath={`/students/${fetchedData.id}/edit`}
        handleDelete={()=>handleDelete()}
      />
      <div className="student-info-wrapper">
        <LinkWrapper />
        <UserInfo userInfo={userInfo} />
      </div>
    </div>
  );
}

export const StudentProfileLoader = async ({ params }) => {
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/users/${id}`);
      const responseData = response.data.data;
  
      if (responseData.role == "Učenik") {
        return responseData;
      } else if (response.data.data.role == "Bibliotekar") {
        return redirect(`/librarians/${id}`);
      } else if (response.data.data.role == "Administrator") {
        return redirect(`/administrators/${id}`);
      }
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  }else{
    return []
  }
};
