import React, { useEffect } from "react";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useLoaderData } from "react-router";
import UserInfo from "../studentProfile/components/UserInfo";
import api from "../../api/apiCalls";
import { useState } from "react";

export default function LibrarianProfile() {
  let [userInfo, setUserInfo] = useState({});
  const fetchedData = useLoaderData();

  useEffect(() => {
    setUserInfo(fetchedData);
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
        editPath={`/librarians/${fetchedData.id}/edit`}
      />
      <div className="student-info-wrapper">
        <UserInfo userInfo={userInfo} />
      </div>
    </div>
  );
}

export const LibrarianProfileLoader = async ({ params }) => {
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
};
