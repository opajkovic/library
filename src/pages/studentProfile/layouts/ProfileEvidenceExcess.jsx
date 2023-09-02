import ProfileEvidence from "../components/ProfileEvidence";

export default function ProfileEvidenceExcess() {
  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false },
    { headerName: "Izdato učeniku", sort: false, dropdown: false },
    { headerName: "Datum izdavanja", sort: false, dropdown: false },
    { headerName: "Prekoračenje u danima", sort: false, dropdown: false },
    { headerName: "Trenutno zadržavanje knjige", sort: false, dropdown: true },
  ];

  return <ProfileEvidence headers={headers} />;
}
