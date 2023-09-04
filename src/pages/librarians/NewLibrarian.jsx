import { useState } from "react";
import useInput from "../../hooks/useInput";
import SettingsForm from "../../components/UI/SettingsForm";

const isNotEmpty = (value) => value.trim() !== "";
const NewLibrarian = () => {
  const {
    value: imePrezimeValue,
    isValid: imePrezimeIsValid,
    hasError: imePrezimeHasError,
    valueChangeHandler: imePrezimeChangeHandler,
    inputBlurHandler: imePrezimeBlurHandler,
    reset: resetImePrezime,
  } = useInput(isNotEmpty);
  const {
    value: jmbgValue,
    isValid: jmbgIsValid,
    hasError: jmbgHasError,
    valueChangeHandler: jmbgChangeHandler,
    inputBlurHandler: jmbgBlurHandler,
    reset: resetJMBG,
  } = useInput(isNotEmpty);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isNotEmpty);
  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(isNotEmpty);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);
  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput(isNotEmpty);
  const [librarianImage, setLibrarianImage] = useState(null);
  let formIsValid = false;
  if (
    imePrezimeIsValid &&
    jmbgIsValid &&
    emailIsValid &&
    usernameIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid
  ) {
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
          placeholder: "Bibliotekar",
          readOnly: true,
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
        {
          label: "Šifra",
          inputClasses: passwordHasError
            ? "form-control invalid"
            : "form-control",
          type: "password",
          name: "password",
          value: passwordValue,
          hasError: passwordHasError,
          onChange: passwordChangeHandler,
          onBlur: passwordBlurHandler,
        },
        {
          label: "Ponovi šifru",
          inputClasses: confirmPasswordHasError
            ? "form-control invalid"
            : "form-control",
          type: "password",
          name: "confirmPassword",
          value: confirmPasswordValue,
          hasError: confirmPasswordHasError,
          onChange: confirmPasswordChangeHandler,
          onBlur: confirmPasswordBlurHandler,
        },
      ]}
      title="Novi bibliotekar"
      firstLinkName="Bibliotekari"
      path="/librarians"
      formIsValid={formIsValid}
      reset={resetHandler}
      submitHandler={submitHandler}
      image={true}
      handleImageUpload={(image) => setLibrarianImage(image)}
    />
  );
};
export default NewLibrarian;
