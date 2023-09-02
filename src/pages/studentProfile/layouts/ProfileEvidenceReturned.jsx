import ProfileEvidence from "../components/ProfileEvidence";

export default function ProfileEvidenceReturned() {
  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false },
    { headerName: "Izdato učeniku", sort: false, dropdown: false },
    { headerName: "Datum izdavanja", sort: false, dropdown: false },
    { headerName: "Datum vraćanja", sort: false, dropdown: false },
    { headerName: "Zadržavanje knjige", sort: false, dropdown: false },
    { headerName: "Trenutno zadržavanje knjige", sort: false, dropdown: true },
  ];
  return <ProfileEvidence headers={headers} />;
}
