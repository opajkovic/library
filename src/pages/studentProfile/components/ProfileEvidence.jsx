import { useParams } from "react-router";
import ProfileTitle from "../../../layout/profileTitle/ProfileTitle";
import LinkWrapper from "./LinkWrapper";
import BottomContainer from "../../rentingBooks/components/BottomContainer";
import "../studentProfile.css";

export default function ProfileEvidence(props) {
  const params = useParams();

  const paths = [
    `/students/${params.id}/evidencija/izdate-knjige`,
    `/students/${params.id}/evidencija/vracene-knjige`,
    `/students/${params.id}/evidencija/otpisane-knjige`,
    `/students/${params.id}/evidencija/knjige-u-prekoracenju`,
    `/students/${params.id}/evidencija/aktivne-rezervacije`,
    `/students/${params.id}/evidencija/arhivirane-rezervacije`,
  ];

  return (
    <div>
      <ProfileTitle
        userInfo={props.userInfo}
        linkOne={"Svi Studenti"}
        linkOnePath={"/students"}
        linkTwoPath={"/students/"}
      />
      <div className="student-info-wrapper">
        <LinkWrapper />
        <BottomContainer
          searchColumn={props.searchColumn}
          searchGlobal={props.searchGlobal}
          itemsPerPageHandler={props.itemsPerPageHandler}
          onPageChange={props.onPageChange}
          pageCount={props.pageCount}
          title="Nova knjiga"
          headers={props.headers}
          paths={paths}
          tableData={props.tableData}
        />
      </div>
    </div>
  );
}
