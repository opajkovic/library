import React, { useEffect } from "react";
import "./studentProfile.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { redirect, useLoaderData, useNavigate} from "react-router";
import LinkWrapper from "./components/LinkWrapper";
import UserInfo from "./components/UserInfo";
import { useState } from "react";
import api from "../../api/apiCalls";
import { deleteStudent } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function StudentProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState();
  const fetchedData = useLoaderData();

  useEffect(() => {
    setUserInfo(fetchedData);
  }, []);

  const handleDelete = async () => {
    api.delete(`/users/${fetchedData.id}`);
    dispatch(deleteStudent(fetchedData, fetchedData.id));
    navigate("/students");
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
};
