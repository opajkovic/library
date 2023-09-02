import ProfileEvidence from "../components/ProfileEvidence";

export default function ProfileEvidenceWrittenOff() {
  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false },
    { headerName: "Izdato učeniku", sort: false, dropdown: false },
    { headerName: "Datum izdavanja", sort: false, dropdown: false },
    { headerName: "Datum otpisivanja", sort: false, dropdown: false },
    { headerName: "Zadržavanje knjige", sort: false, dropdown: false },
    { headerName: "Knjigu otpisao", sort: false, dropdown: true },
  ];
  return <ProfileEvidence headers={headers} />;
}
