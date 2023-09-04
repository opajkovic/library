import React, { useEffect } from "react";
import "./studentProfile.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useNavigate, useOutletContext, useParams } from "react-router";
import LinkWrapper from "./components/LinkWrapper";
import UserInfo from "./components/UserInfo";
import { useState } from "react";
import api from '../../api/apiCalls'

export default function StudentProfile() {
  const { setRoute } = useOutletContext();
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

  useEffect(() => {
    fetchUser()
    setRoute("students");
  }, []);
  return (
    <div>
      <ProfileTitle
        userInfo={userInfo ? userInfo  : {name: "ha"}}
        linkOne={"Svi Studenti"}
        linkOnePath={"/students"}
        linkTwoPath={`/students/`}
        change={true}
        reset={true}
        deleteMssg={true}
      />
      <div className="student-info-wrapper">
        <LinkWrapper />
        <UserInfo userInfo={UserInfo} />
      </div>
    </div>
  );
}
