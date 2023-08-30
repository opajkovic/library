import React, { useEffect } from "react";
import "./studentProfile.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useOutletContext } from "react-router";
import LinkWrapper from "./components/LinkWrapper";
import RentingOptions from "../rentingBooks/components/RentingOptions";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import BottomContainer from "../rentingBooks/components/BottomContainer";

const DUMMY_TABLE_DATA = [];

export default function ProfileEvidence() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("students");
  }, []);
  return (
    <div>
      <ProfileTitle
        linkOne={"Svi Studenti"}
        linkOnePath={"/students"}
        linkTwoPath={"/students/"}
      />
      <div className="student-info-wrapper">
        <LinkWrapper />
        <BottomContainer
          title="Nova knjiga"
          headers={[
            "Naziv knjige",
            "Izdato učeniku",
            "Datum izdavanja",
            "Trenutno zadržavanje knjiga",
            "Knjigu izdao",
          ]}
        />
      </div>
    </div>
  );
}
