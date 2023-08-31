import React, { useEffect } from "react";
import "./studentProfile.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useOutletContext, useParams } from "react-router";
import LinkWrapper from "./components/LinkWrapper";
import BottomContainer from "../rentingBooks/components/BottomContainer";

export default function ProfileEvidence() {
  const params = useParams();
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
          paths={[
            `/students/${params.id}/evidencija/izdate-knjige`,
            `/students/${params.id}/evidencija/vracene-knjige`,
            `/students/${params.id}/evidencija/otpisane-knjige`,
            `/students/${params.id}/evidencija/knjige-u-prekoracenju`,
            `/students/${params.id}/evidencija/aktivne-rezervacije`,
            `/students/${params.id}/evidencija/arhivirane-rezervacije`,
          ]}
        />
      </div>
    </div>
  );
}
