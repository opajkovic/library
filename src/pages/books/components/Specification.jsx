import SettingsForm from "../../../components/UI/SettingsForm";
import useInput from "../../../hooks/useInput";
import { useState } from "react";

export default function NewBookSpecification() {
  const [languageIsValid, setLanguageIsValid] = useState(false);
  const [bookbindIsValid, setBookbindIsValid] = useState(false);
  const [formatIsValid, setFormatIsValid] = useState(false);

  const languageHandler = (value) => {
    setLanguageIsValid(value);
  };

  const bookbindHandler = (value) => {
    setBookbindIsValid(value);
  };

  const formatHandler = (value) => {
    setFormatIsValid(value);
  };

  const isNotEmptyString = (value) => value.trim().length > 0;
  const {
    value: pagesValue,
    isValid: pagesIsValid,
    hasError: pagesHasError,
    valueChangeHandler: pagesChangeHandler,
    inputBlurHandler: pagesBlurHandler,
  } = useInput(isNotEmptyString);

  let formIsValid = false;
  if (pagesIsValid && languageIsValid && bookbindIsValid && formatIsValid) {
    formIsValid = true;
  }

  console.log(languageIsValid, bookbindIsValid, formIsValid)
  const resetHandler = () => {
    redirect((window.location.href = "/books/new"));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    return null;
  };

  const pagesClasses = pagesHasError ? "form-control invalid" : "form-control";

  return (
    <div className="new-book-position-handler">
      <SettingsForm
        input={[
          {
            label: "Broj strana",
            inputClasses: pagesClasses,
            type: "text",
            name: "pages",
            value: pagesValue,
            hasError: pagesHasError,
            onChange: pagesChangeHandler,
            onBlur: pagesBlurHandler,
          },
        ]}
        select={[
          {
            options: ["pismo 1", "pismo 2", "pismo 3"],
            input: {
              label: "Izaberite pismo",
              type: "text",
              name: "language",
            },
            validHandler: languageHandler,
          },
          {
            options: ["povez 1", "povez 2", "povez 3"],
            input: {
              label: "Izaberite povez",
              type: "text",
              name: "bookbind",
            },
            validHandler: bookbindHandler,
          },
          {
            options: ["format 1", "format 2", "format 3"],
            input: {
              label: "Izaberite format",
              type: "text",
              name: "format",
            },
            validHandler: formatHandler,
          },
        ]}
        reset={resetHandler}
        title="Nova knjiga"
        firstLinkName="Knjige"
        path="/books"
        pathDashboard="/dashboard"
        formIsValid={formIsValid}
        submitHandler={(event) => submitHandler(event)}
        className="new-book-wrapper-left"
        headers={true}
      />
    </div>
  );
}
