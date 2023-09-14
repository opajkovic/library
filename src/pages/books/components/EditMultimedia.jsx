import { useParams } from "react-router";
import SettingsForm from "../../../components/UI/SettingsForm";

export default function EditMultimedia() {
    const params = useParams()
  return (
    <div>
      <SettingsForm
        title="Izmijeni knjigu"
        firstLinkName="Knjige"
        path="/books"
        pathDashboard="/dashboard"
        headers={true}
        multimediaImage={true}
        editHeaders={[
            {
              details: `/books/${params.id}/edit`,
              specification: `/books/${params.id}/edit/specification`,
              multimedia: `/books/${params.id}/edit/multimedia`,
            },
          ]}
      />
    </div>
  );
}
