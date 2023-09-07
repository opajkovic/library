import React, { useEffect } from "react";
import "./studentProfile.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useOutletContext, redirect, useLoaderData} from "react-router";
import LinkWrapper from "./components/LinkWrapper";
import UserInfo from "./components/UserInfo";
import { useState } from "react";
import api from "../../api/apiCalls";

export default function StudentProfile() {
  const { setRoute } = useOutletContext();
  let [userInfo, setUserInfo] = useState();
  const fetchedData = useLoaderData();

  useEffect(() => {
    setUserInfo(fetchedData);
    setRoute("students");
  }, []);
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
