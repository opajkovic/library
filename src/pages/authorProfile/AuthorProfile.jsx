import React, { useEffect, useState } from "react";
import "./AuthorProfile.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useLoaderData } from "react-router";
import AuthorInfo from "./components/AuthorInfo";
import api from "../../api/apiCalls";

export default function AuthorProfile() {
  let [author, setAuthor] = useState({ name: "loading..." });
  const fetchedData = useLoaderData();

  useEffect(() => {
    setAuthor(fetchedData);
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
        editPath={`/authors/${fetchedData.id}/edit`}
      />
      <AuthorInfo userInfo={author} />
    </div>
  );
}
export async function LoaderAuthorProfile({ params }) {
  const id = params.id;
  try {
    const response = await api.get(`/authors/${id}`);
    const responseData = response.data.data;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
}