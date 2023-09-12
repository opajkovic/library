import { useEffect, useState } from "react";
import SettingsForm from "../../components/UI/SettingsForm";
import "./AuthorEdit.css";
import { useLoaderData, useParams } from "react-router";
import { createChangeHandler, getInvalidClass } from "../../util/Functions";
import api from "../../api/apiCalls";

const EditAuthor = () => {
  const [richTextReset, setRichTextReset] = useState(false);
  const [authorInfo, setAuthorInfo] = useState({
    name: "",
    bio: "",
  });
  const params = useParams();
  const fetchedData = useLoaderData();
  const nameSurname = `${fetchedData.name} ${fetchedData.surname}`;

  useEffect(() => {
    setAuthorInfo({ ...fetchedData, name: nameSurname });
  }, []);

  const nameHandler = createChangeHandler("name", setAuthorInfo);
  const nameClass = getInvalidClass(authorInfo.name);

  let formIsValid = false;
  if (nameClass === "form-control") {
    formIsValid = true;
  }

  const formData = {
    name: authorInfo.name.split(" ")[0],
    surname: authorInfo.name.split(" ")[1],
    biography: authorInfo.bio,
    image: null,
  };

  console.log(formData)
  const submitHandler = async () => {
    const response = await api.put(`/authors/${params.id}`, formData);
    if (response.status === 200) {
      console.log("succssfully posted")
  };
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
      submitHandler={submitHandler}
      edit={true}
    />
  );
};
export default EditAuthor;
