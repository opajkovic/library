import { useState } from "react";
import useInput from "../../hooks/useInput";
import SettingsForm from "../../components/UI/SettingsForm";
import "./NewLibrarian.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import api from "../../api/apiCalls";

const nameRegex = /^[A-Za-z]+ [A-Za-z]+(?: [A-Za-z]+)?$/;
const nameTest = (value) => nameRegex.test(value);

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailTest = (value) => emailRegex.test(value);

const jmbgRegex = /^\d{13}$/;
const jmbgTest = (value) => jmbgRegex.test(value);

const usernameRegex = /^[a-zA-Z0-9_.-]{3,15}$/;
const usernameTest = (value) => usernameRegex.test(value);

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const passwordTest = (value) => passwordRegex.test(value);

const NewLibrarian = () => {
  const navigate = useNavigate();

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(nameTest);
  const {
    value: jmbgValue,
    isValid: jmbgIsValid,
    hasError: jmbgHasError,
    valueChangeHandler: jmbgChangeHandler,
    inputBlurHandler: jmbgBlurHandler,
    reset: resetJMBG,
  } = useInput(jmbgTest);
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
  } = useInput(usernameTest);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(passwordTest);
  const {
    value: repeatPasswordValue,
    isValid: repeatPasswordIsValid,
    hasError: repeatPasswordHasError,
    valueChangeHandler: repeatPasswordChangeHandler,
    inputBlurHandler: repeatPasswordBlurHandler,
    reset: resetRepeatPassword,
  } = useInput(passwordTest);

  let formIsValid = false;
  if (
    nameIsValid &&
    jmbgIsValid &&
    emailIsValid &&
    usernameIsValid &&
    passwordIsValid &&
    repeatPasswordIsValid 
  ) {
    formIsValid = true;
  }
  const resetHandler = () => {
    resetName();
    resetJMBG();
    resetEmail();
    resetUsername();
    resetPassword();
    resetRepeatPassword();
  };

  const submitHandler = async () => {
    const formData = {
      name: nameValue.split(" ")[0],
      surname: nameValue.split(" ").slice(1).join(" "),
      role_id: 1, // 1 = bibiliotekar, 2 = ucenik, 3 = admin
      jmbg: jmbgValue,
      email: emailValue,
      username: usernameValue,
      password: passwordValue,
      password_confirmation: repeatPasswordValue,
    };
    const response = await api.post(`/users/store`, formData);
    if (response.status === 200) {
      console.log("succssfully posted");
      navigate("/librarians");
    }
  };
  return (
    <div className="new-librarian-position-handler">
      <SettingsForm
        input={[
          {
            label: "Ime i prezime",
            inputClasses: nameHasError
              ? "form-control invalid"
              : "form-control",
            type: "text",
            name: "imePrezime",
            placeholder: "Unesite Vaše puno ime i prezime",
            value: nameValue,
            hasError: nameHasError,
            onChange: nameChangeHandler,
            onBlur: nameBlurHandler,
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
            inputClasses: jmbgHasError
              ? "form-control invalid"
              : "form-control",
            type: "number",
            name: "jmbg",
            placeholder: "Validan unos iznosi 13 cifri",
            value: jmbgValue,
            hasError: jmbgHasError,
            onChange: jmbgChangeHandler,
            onBlur: jmbgBlurHandler,
          },
          {
            label: "Email",
            inputClasses: emailHasError
              ? "form-control invalid"
              : "form-control",
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
            placeholder: "3 - 15 spojenih karaktera",
            name: "username",
            value: usernameValue,
            hasError: usernameHasError,
            onChange: usernameChangeHandler,
            onBlur: usernameBlurHandler,
          },
          {
            label: "Lozinka",
            inputClasses: passwordHasError
              ? "form-control invalid"
              : "form-control",
            type: "password",
            placeholder: "min 8 karaktera (cifre + slova)",
            name: "password",
            value: passwordValue,
            hasError: passwordHasError,
            onChange: passwordChangeHandler,
            onBlur: passwordBlurHandler,
          },
          {
            label: "Ponovite lozinku",
            inputClasses: repeatPasswordHasError || repeatPasswordValue !== passwordValue
              ? "form-control invalid"
              : "form-control",
            type: "password",
            placeholder: "Mora odgovarati prvobitno unesenoj lozinki",
            name: "username",
            value: repeatPasswordValue,
            hasError: repeatPasswordHasError,
            onChange: repeatPasswordChangeHandler,
            onBlur: repeatPasswordBlurHandler,
          },
        ]}
        className="new-librarian-form-left"
        title="Novi bibliotekar"
        firstLinkName="Bibliotekari"
        path="/librarians"
        pathDashboard="/dashboard"
        formIsValid={formIsValid}
        reset={() => resetHandler()}
        submit={() => submitHandler()}
      />
      <SettingsForm image={true} className="new-librarian-form-right" />
    </div>
  );
};
export default NewLibrarian;
