import { useState } from "react";
import useInput from "../../hooks/useInput";
import SettingsForm from "../../components/UI/SettingsForm";
import "./NewAuthor.css";
import api from "../../api/apiCalls";

const nameRegex = /^[A-Za-z]+ [A-Za-z]+(?: [A-Za-z]+)?$/;
const nameTest = (value) => nameRegex.test(value.trim());

const NewAuthor = () => {
  const {
    value: authorValue,
    isValid: authorIsValid,
    hasError: authorHasError,
    valueChangeHandler: authorChangeHandler,
    inputBlurHandler: authorBlurHandler,
    reset: resetAuthor,
  } = useInput(nameTest);

  const [richTextareaValue, setRichTextareaValue] = useState("");

  const richTextareaChangeHandler = (newValue) => {
    setRichTextareaValue(newValue);
  };

  let formIsValid = false;
  if (authorIsValid && richTextareaValue !== "") {
    formIsValid = true;
  }

  const formData = {
    name: authorValue.split(" ")[0],
    surname: authorValue.split(" ").slice(1).join(" "),
    biography: richTextareaValue,
    image: null,
  };

  const submitHandler = async () => {
    const response = await api.post(`/authors/store`, formData);
    if (response.status === 200) {
      console.log("succssfully posted");
      setRichTextareaValue("");
      resetAuthor();
    }
  };

  const resetHandler = () => {
    resetAuthor();
    setRichTextareaValue("");
  };

  const authorClasses = authorHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <SettingsForm
      input={[
        {
          label: "Ime i prezime",
          inputClasses: authorClasses,
          type: "text",
          name: "author",
          value: authorValue,
          hasError: authorHasError,
          onChange: authorChangeHandler,
          onBlur: authorBlurHandler,
        },
      ]}
      richTextarea={{
        label: "Opis",
        name: "description",
        value: richTextareaValue,
        valueUpdate: richTextareaChangeHandler,
      }}
      title="Novi autor"
      firstLinkName="Autori"
      path="/authors"
      pathDashboard="/dashboard"
      formIsValid={formIsValid}
      reset={()=>resetHandler()}
      submit={()=>submitHandler()}
      className="new-author-form"
    />
  );
};
export default NewAuthor;
