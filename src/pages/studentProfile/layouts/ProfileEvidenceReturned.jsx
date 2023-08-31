import ProfileEvidence from "../components/ProfileEvidence";

export default function ProfileEvidenceReturned() {

  return (
    <ProfileEvidence
      headers={[
        "Naziv knjige",
        "Izdato učeniku",
        "Datum izdavanja",
        "Datum vraćanja",
        "Zadržavanje knjige",
        "Knjigu primio",
      ]}
    />
  );
}
