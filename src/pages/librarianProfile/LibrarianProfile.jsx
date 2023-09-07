import React, { useEffect } from "react";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import {
  redirect,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router";
import UserInfo from "../studentProfile/components/UserInfo";
import api from "../../api/apiCalls";
import { useState } from "react";

export default function LibrarianProfile() {
  const { setRoute } = useOutletContext();
  let [userInfo, setUserInfo] = useState({});
  const fetchedData = useLoaderData();
  console.log(fetchedData.id)

  useEffect(() => {
    setUserInfo(fetchedData);
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
        editPath={`/librarians/${fetchedData.id}/edit-profile`}
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
    } else if (response.data.data.role == "Učenik") {
      return redirect(`/students/${id}`);
    } else if (response.data.data.role == "Administrator") {
      return redirect(`/administrators/${id}`);
    }
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
