import SettingsForm from "../../../components/UI/SettingsForm";
import "./Multimedia.css"

export default function NewBookMultimedia() {
  return (
    <div className="new-book-multimedia">
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
