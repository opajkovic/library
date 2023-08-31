import React, { useEffect } from "react";
import "./AuthorProfile.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useOutletContext, useParams } from "react-router";
import AuthorInfo from "./components/AuthorInfo";

export default function AuthorProfile() {
  const params = useParams();
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("students");
  }, []);
  return (
    <div>
      <ProfileTitle
        linkOne={"Svi autori"}
        linkOnePath={"/authors"}
        linkTwoPath={`/authors/${params.id}`}
      />
      <AuthorInfo />
    </div>
  );
}
