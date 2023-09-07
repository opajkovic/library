import React, { useEffect, useState } from "react";
import "./AuthorProfile.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useLoaderData, useOutletContext } from "react-router";
import AuthorInfo from "./components/AuthorInfo";
import api from "../../api/apiCalls";

export default function AuthorProfile() {
  const { setRoute } = useOutletContext();
  let [author, setAuthor] = useState({name: 'loading...'})
  const fetchedData = useLoaderData();

  useEffect(() => {
    setAuthor(fetchedData);
    setRoute("students");
  }, []);
  return (
    <div>
      <ProfileTitle
        userInfo={author}
        linkOne={"Svi autori"}
        linkOnePath={"/authors"}
        linkTwoPath={`/authors/`}
        change={true}
        deleteMssg={true}
      />
      <AuthorInfo userInfo={author} />
    </div>
  );
}
export const AuthorLoader = async ({ params }) => {
  const id = params.id;
  try {
    const response = await api.get(`/authors/${id}`);
    const responseData = response.data.data;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
