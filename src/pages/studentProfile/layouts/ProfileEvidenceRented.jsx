import ProfileEvidence from "../components/ProfileEvidence";

export default function ProfileEvidenceRented() {
  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false },
    { headerName: "Izdato učeniku", sort: false, dropdown: false },
    { headerName: "Datum izdavanja", sort: false, dropdown: false },
    { headerName: "Trenutno zadržavanje knjiga", sort: false, dropdown: false },
    { headerName: "Knjigu izdao", sort: false, dropdown: true },
  ];

  return <ProfileEvidence headers={headers} />;
}
