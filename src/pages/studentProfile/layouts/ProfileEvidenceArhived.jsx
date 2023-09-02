import ProfileEvidence from "../components/ProfileEvidence";

export default function ProfileEvidenceArchived() {
  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false },
    { headerName: "Datum rezervacije", sort: false, dropdown: false },
    { headerName: "Rezervacija zatvorena", sort: false, dropdown: false },
    { headerName: "Rezervaciju podnio", sort: false, dropdown: false },
    { headerName: "Status", sort: false, dropdown: true },
  ];
  return <ProfileEvidence headers={headers} />;
}
