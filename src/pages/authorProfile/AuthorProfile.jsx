import React, { useEffect, useState } from "react";
import "./AuthorProfile.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useLoaderData, useNavigate } from "react-router";
import AuthorInfo from "./components/AuthorInfo";
import api from "../../api/apiCalls";

export default function AuthorProfile() {
  const navigate = useNavigate();
  let [author, setAuthor] = useState({ name: "loading..." });
  const fetchedData = useLoaderData();

  useEffect(() => {
    setAuthor(fetchedData);
  }, []);

  const handleDelete = async () => {
    api.delete(`/authors/${fetchedData.id}`)
    navigate("/authors")
  }

  return (
    <>
      <ProfileTitle
        userInfo={author}
        linkOne={"Svi autori"}
        linkOnePath={"/authors"}
        linkTwoPath={`/authors/`}
        change={true}
        deleteMssg={true}
        editPath={`/authors/${fetchedData.id}/edit`}
        handleDelete={()=>handleDelete()}
      />
      <AuthorInfo userInfo={author} />
    </>
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