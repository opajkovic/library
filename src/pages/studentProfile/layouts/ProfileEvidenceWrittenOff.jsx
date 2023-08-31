import ProfileEvidence from "../components/ProfileEvidence";

export default function ProfileEvidenceWrittenOff() {

  return (
    <ProfileEvidence
      headers={[
        "Naziv knjige",
        "Izdato učeniku",
        "Datum izdavanja",
        "Trenutno zadržavanje knjiga",
        "Knjigu izdao",
      ]}
    />
  );
}
