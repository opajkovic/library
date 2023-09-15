import React, { useState } from "react";
import "./profileTitle.css";
import HeaderName from "./components/HeaderName";
import HeaderOptions from "./components/HeaderOptions";
import ChangePasswordModal from "../changePasswordModal/ChangePasswordModal";

export default function ProfileTitle({
  userInfo,
  linkOne,
  linkOnePath,
  linkTwoPath,
  editPath,
  image,
  change,
  reset,
  deleteMssg,
  booksSpecial,
  handleDelete
}) {
  let [changePassword, setChangePassword] = useState(false);
  return (
    <div className="title-wrapper">
      {image && <img src={image} />}
      <HeaderName
        userInfo={userInfo}
        linkOne={linkOne}
        linkOnePath={linkOnePath}
        linkTwoPath={linkTwoPath}
        image={image}
      />
      <HeaderOptions
        change={change}
        reset={reset}
        deleteMssg={deleteMssg}
        booksSpecial={booksSpecial}
        setModalPassword={setChangePassword}
        editPath={editPath}
        handleDelete={handleDelete}
      />
      {changePassword && (
        <ChangePasswordModal setModalClose={setChangePassword} />
      )}
    </div>
  );
}
