import React, { useEffect, useState } from "react";
import "./AuthorProfile.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useLoaderData } from "react-router";
import AuthorInfo from "./components/AuthorInfo";

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