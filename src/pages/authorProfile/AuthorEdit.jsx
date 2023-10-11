import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import SettingsForm from "../../components/UI/SettingsForm";
import { createChangeHandler, getInvalidClass } from "../../util/Functions";
import api from "../../api/apiCalls";
import "./AuthorEdit.css";

const EditAuthor = () => {
  const [richTextReset, setRichTextReset] = useState(false);
  const [authorInfo, setAuthorInfo] = useState({
    name: "",
    bio: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  const fetchedData = useLoaderData();
  const nameSurname = `${fetchedData.name} ${fetchedData.surname}`;

  const [richTextareaValue, setRichTextareaValue] = useState(fetchedData.bio);

  const richTextareaChangeHandler = (newValue) => {
    setRichTextareaValue(newValue);
  };

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
    surname: authorInfo.name.split(" ").slice(1).join(" "),
    biography: richTextareaValue,
    image: null,
  };

  const submitHandler = async () => {
    try {
      const response = await api.put(`/authors/${params.id}`, formData);
      if (response.status === 200) {
        toast.success("Autor izmijenjen");
        navigate("/authors");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const resetHandler = () => {
    setAuthorInfo({ ...fetchedData, name: nameSurname });
    setRichTextReset(!richTextReset);
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
        value: richTextareaValue,
        valueUpdate: richTextareaChangeHandler,
        reset: richTextReset,
      }}
      className="edit-author-form"
      title="Izmijeni podatke"
      firstLinkName="Profil autora"
      path={`/authors/${authorInfo.id}`}
      pathDashboard="/dashboard"
      formIsValid={formIsValid}
      reset={() => resetHandler()}
      submit={() => submitHandler()}
      edit={true}
    />
  );
};
export default EditAuthor;
