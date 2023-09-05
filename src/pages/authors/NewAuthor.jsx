import useInput from "../../hooks/useInput";
import SettingsForm from "../../components/UI/SettingsForm";

const isNotEmptyString = (value) =>
  value.trim() !== "" && /^[a-zA-Z]+$/.test(value);

const NewAuthor = () => {
  const {
    value: authorValue,
    isValid: authorIsValid,
    hasError: authorHasError,
    valueChangeHandler: authorChangeHandler,
    inputBlurHandler: authorBlurHandler,
    reset: resetAuthor,
  } = useInput(isNotEmptyString);

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isNotEmptyString);

  let formIsValid = false;
  if (authorIsValid && descriptionIsValid) {
    formIsValid = true;
  }

  const resetHandler = () => {
    resetDescription();
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

  const descriptionClasses = descriptionHasError
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
      textarea={[
        {
          label: "Opis",
          type: "text",
          name: "description",
          textareaClasses: descriptionClasses,
          value: descriptionValue,
          hasError: descriptionHasError,
          onChange: descriptionChangeHandler,
          onBlur: descriptionBlurHandler,
        },
      ]}
      title="Novi autor"
      firstLinkName="Autori"
      path="/authors"
      formIsValid={formIsValid}
      reset={resetHandler}
      submitHandler={() => submitHandler()}
    />
  );
};
export default NewAuthor;
