import React, { useState } from "react";
import "./profileTitle.css";
import HeaderName from "./components/HeaderName";
import HeaderOptions from "./components/HeaderOptions";
import ChangePasswordModal from "../changePasswordModal/ChangePasswordModal";

export default function ProfileTitle({
  linkOne,
  linkOnePath,
  linkTwoPath,
  image,
  change,
  reset,
  deleteMssg,
  booksSpecial,
}) {

  let [changePassword, setChangePassword] = useState(false)
  return (
    <div className="title-wrapper">
      {image && <img src={image} />}
      <HeaderName
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
      />
      {changePassword ? <ChangePasswordModal setModalClose={setChangePassword} />  : <></>}
      
    </div>
  );
}
