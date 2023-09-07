import SettingsForm from "../../../components/UI/SettingsForm";

export default function NewBookMultimedia() {
  return (
    <div>
      <SettingsForm
        title="Nova knjiga"
        firstLinkName="Knjige"
        path="/books"
        pathDashboard="/dashboard"
        headers={true}
        multimediaImage={true}
      />
    </div>
  );
}
