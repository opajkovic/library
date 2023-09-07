import React from "react";
import "../profileTitle.css";
import { Link, useParams } from "react-router-dom";

export default function HeaderName({
  userInfo,
  linkOne,
  linkOnePath,
  linkTwoPath,
  image,
}) {
  const params = useParams();

  return (
    <div className={image ? "margined" : "left"}>
      <h1 className="name">{userInfo ? userInfo.name : ""} {userInfo ? userInfo.surname : ""}</h1>
      <div className="subtitle">
        <Link to={`${linkOnePath}`}>{linkOne}</Link>
        <span>/</span>
        <Link to={`${linkTwoPath}${params.id}`}>ID - {params.id}</Link>
      </div>
    </div>
  );
}
