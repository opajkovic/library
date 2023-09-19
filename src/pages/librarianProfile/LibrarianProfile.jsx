import React, { useEffect } from "react";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useLoaderData, useNavigate } from "react-router";
import UserInfo from "../studentProfile/components/UserInfo";
import api from "../../api/apiCalls";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteLibrarian } from "../../redux/actions";

export default function LibrarianProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const fetchedData = useLoaderData();

  useEffect(() => {
    setUserInfo(fetchedData);
  }, []);

  const handleDelete = async () => {
    api.delete(`/users/${fetchedData.id}`);
    dispatch(deleteLibrarian(fetchedData, fetchedData.id));
    window.location.href="/librarians";
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
