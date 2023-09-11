import { useEffect, useState } from "react";
import SettingsForm from "../../components/UI/SettingsForm";
import "./AuthorEdit.css";
import { useLoaderData } from "react-router";
import { createChangeHandler, getInvalidClass } from "../../util/Functions";

const EditAuthor = () => {
  const [richTextReset, setRichTextReset] = useState(false);
  const [authorInfo, setAuthorInfo] = useState({
    name: "",
    bio: "",
  });
  const fetchedData = useLoaderData();
  const nameSurname = `${fetchedData.name} ${fetchedData.surname}`;

  console.log(authorInfo)
  useEffect(() => {
    setAuthorInfo({ ...fetchedData, name: nameSurname });
  }, []);

  const nameHandler = createChangeHandler("name", setAuthorInfo);
  const nameClass = getInvalidClass(authorInfo.name);

  let formIsValid = false;
  if (nameClass === "form-control") {
    formIsValid = true;
  }

  const resetHandler = (event) => {
    event.preventDefault();
    setAuthorInfo({ ...fetchedData, name: nameSurname });
    setRichTextReset(!richTextReset)
  };
  return (
    <SettingsForm
      input={[
        {
          label: "Ime i prezime",
          inputClasses: nameClass,
          type: "text",
          name: "name",
          value: authorInfo.name,
          onChange: nameHandler,
        },
      ]}
      richTextarea={{
        label: "Opis",
        value: authorInfo.bio,
        reset: richTextReset
      }}
      className="edit-author-form"
      title="Izmijeni podatke"
      firstLinkName="Profil autora"
      path={`/authors/${authorInfo.id}`}
      pathDashboard="/dashboard"
      formIsValid={formIsValid}
      reset={resetHandler}
      edit={true}
    />
  );
};
export default EditAuthor;
