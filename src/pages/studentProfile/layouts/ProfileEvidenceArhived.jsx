import ProfileEvidence from "../components/ProfileEvidence";

export default function ProfileEvidenceArchived() {

  return (
    <ProfileEvidence
      headers={[
        "Naziv knjige",
        "Datum rezervacije",
        "Rezervacija zatvorena",
        "Rezervaciju podnio",
        "Status",
      ]}
    />
  );
}
