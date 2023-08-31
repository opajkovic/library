import ProfileEvidence from "../components/ProfileEvidence";

export default function ProfileEvidenceReserved() {

  return (
    <ProfileEvidence
      headers={[
        "Naziv knjige",
        "Datum rezervacije",
        "Rezervacija ističe",
        "Rezervaciju podnio",
        "Status",
      ]}
    />
  );
}
