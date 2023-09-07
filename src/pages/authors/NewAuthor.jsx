import useInput from "../../hooks/useInput";
import SettingsForm from "../../components/UI/SettingsForm";
import "./NewAuthor.css"

const isNotEmptyString = (value) => /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/.test(value);

const NewAuthor = () => {
  const {
    value: authorValue,
    isValid: authorIsValid,
    hasError: authorHasError,
    valueChangeHandler: authorChangeHandler,
    inputBlurHandler: authorBlurHandler,
    reset: resetAuthor,
  } = useInput(isNotEmptyString);

  let formIsValid = false;
  if (authorIsValid) {
    formIsValid = true;
  }

  const resetHandler = () => {
    resetAuthor();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetAuthor();
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
        value: ""
      }}
      title="Novi autor"
      firstLinkName="Autori"
      path="/authors"
      pathDashboard="/dashboard"
      formIsValid={formIsValid}
      reset={resetHandler}
      submitHandler={() => submitHandler()}
      className="new-author-form"
    />
  );
};
export default NewAuthor;
