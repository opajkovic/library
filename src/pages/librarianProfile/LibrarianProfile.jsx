import React, { useEffect } from "react";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useNavigate, useOutletContext, useParams } from "react-router";
import UserInfo from "../studentProfile/components/UserInfo";
import api from "../../api/apiCalls";
import { useState } from "react";

export default function LibrarianProfile() {
  const { setRoute } = useOutletContext();
  const { id } = useParams()
  let [userInfo, setUserInfo] = useState({})
  let navigate = useNavigate()

  let fetchUser = () =>{
    api.get(`/users/${id}`).then(response => {
      if(response.data.data.role == 'Bibliotekar'){
        setUserInfo(response.data.data)
      }
      else if(response.data.data.role == "Učenik"){
        navigate(`/students/${id}`)
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
    setRoute("librarians");
  }, []);
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
      />
      <div className="student-info-wrapper">
        <UserInfo userInfo={userInfo} />
      </div>
    </div>
  );
}
