import React, { useEffect } from "react";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useOutletContext } from "react-router";
import UserInfo from "../studentProfile/components/UserInfo";

export default function LibrarianProfile() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("librarians");
  }, []);
  return (
    <div>
      <ProfileTitle
        linkOne={"Svi bibliotekari"}
        linkOnePath={"/librarians"}
        linkTwoPath={`/librarians/`}
        change={true}
        reset={true}
        deleteMssg={true}
      />
      <div className="student-info-wrapper">
        <UserInfo />
      </div>
    </div>
  );
}
