import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useInput from "../../hooks/useInput";
import SettingsForm from "../../components/UI/SettingsForm";
import api from "../../api/apiCalls";
import "./NewAuthor.css";

const nameRegex =
  /^[A-Za-zćčžšđĆČŽŠĐ]+ [A-Za-zćčžšđĆČŽŠĐ]+(?: [A-Za-zćčžšđĆČŽŠĐ]+)?$/;
const nameTest = (value) => nameRegex.test(value.trim());

const NewAuthor = () => {
  const navigate = useNavigate();
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
    try {
      const response = await api.post(`/authors/store`, formData);
      if (response.status === 200) {
        toast.success("Dodat autor");
        setRichTextareaValue("");
        resetAuthor();
        navigate("/authors");
      }
    } catch (err) {
      toast.error(err.response.data.message);
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
      reset={() => resetHandler()}
      submit={() => submitHandler()}
      className="new-author-form"
    />
  );
};
export default NewAuthor;
