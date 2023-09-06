import { useState } from "react";
import useInput from "../../hooks/useInput";
import SettingsForm from "../../components/UI/SettingsForm";

const isNotEmptyString = (value) => /^[a-zA-Z]+$/.test(value);

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailTest = (value) => emailRegex.test(value);

const isNotEmptyNumber = (value) =>
  value.trim() !== "" && /^-?\d+(\.\d+)?$/.test(value);

const NewLibrarian = () => {
  const {
    value: imePrezimeValue,
    isValid: imePrezimeIsValid,
    hasError: imePrezimeHasError,
    valueChangeHandler: imePrezimeChangeHandler,
    inputBlurHandler: imePrezimeBlurHandler,
    reset: resetImePrezime,
  } = useInput(isNotEmptyString);
  const {
    value: jmbgValue,
    isValid: jmbgIsValid,
    hasError: jmbgHasError,
    valueChangeHandler: jmbgChangeHandler,
    inputBlurHandler: jmbgBlurHandler,
    reset: resetJMBG,
  } = useInput(isNotEmptyNumber);
  const {
    value: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(emailTest);
  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(isNotEmptyString);

  const [librarianImage, setLibrarianImage] = useState(null);

  let formIsValid = false;
  if (imePrezimeIsValid && jmbgIsValid && emailIsValid && usernameIsValid) {
    formIsValid = true;
  }
  const resetHandler = () => {
    resetImePrezime();
    resetJMBG();
    resetEmail();
    resetUsername();
    resetPassword();
    resetConfirmPassword();
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetHandler();
    setLibrarianImage(null);
  };
  return (
    <SettingsForm
      input={[
        {
          label: "Ime i prezime",
          inputClasses: imePrezimeHasError
            ? "form-control invalid"
            : "form-control",
          type: "text",
          name: "imePrezime",
          value: imePrezimeValue,
          hasError: imePrezimeHasError,
          onChange: imePrezimeChangeHandler,
          onBlur: imePrezimeBlurHandler,
        },
        {
          label: "Tip korisnika",
          type: "text",
          name: "userType",
          value: "Bibliotekar",
          disabled: true,
        },
        {
          label: "JMBG",
          inputClasses: jmbgHasError ? "form-control invalid" : "form-control",
          type: "text",
          name: "jmbg",
          value: jmbgValue,
          hasError: jmbgHasError,
          onChange: jmbgChangeHandler,
          onBlur: jmbgBlurHandler,
        },
        {
          label: "Email",
          inputClasses: emailHasError ? "form-control invalid" : "form-control",
          type: "email",
          name: "email",
          value: emailValue,
          hasError: emailHasError,
          onChange: emailChangeHandler,
          onBlur: emailBlurHandler,
        },
        {
          label: "Korisničko ime",
          inputClasses: usernameHasError
            ? "form-control invalid"
            : "form-control",
          type: "text",
          name: "username",
          value: usernameValue,
          hasError: usernameHasError,
          onChange: usernameChangeHandler,
          onBlur: usernameBlurHandler,
        },
      ]}
      title="Novi bibliotekar"
      firstLinkName="Bibliotekari"
      path="/librarians"
      pathDashboard="/dashboard"
      formIsValid={formIsValid}
      reset={resetHandler}
      submitHandler={submitHandler}
      image={true}
      handleImageUpload={(image) => setLibrarianImage(image)}
    />
  );
};
export default NewLibrarian;
