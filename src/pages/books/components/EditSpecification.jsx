import SettingsForm from "../../../components/UI/SettingsForm";
import useInput from "../../../hooks/useInput";
import { useEffect, useState } from "react";
import "./Specification.css";
import { useLoaderData, useParams } from "react-router";

export default function EditSpecification() {
  const [languageIsValid, setLanguageIsValid] = useState(false);
  const [bookbindIsValid, setBookbindIsValid] = useState(false);
  const [formatIsValid, setFormatIsValid] = useState(false);
  const fetchedData = useLoaderData()
  let [data, setData] = useState({})
  const params = useParams();
  
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

  const {
    value: serialNumberValue,
    isValid: serialNumberIsValid,
    hasError: serialNumberHasError,
    valueChangeHandler: serialNumberChangeHandler,
    inputBlurHandler: serialNumberBlurHandler,
  } = useInput(isNotEmptyString);

  let formIsValid = false;
  if (
    pagesIsValid &&
    languageIsValid &&
    bookbindIsValid &&
    formatIsValid &&
    serialNumberIsValid
  ) {
    formIsValid = true;
  }

  console.log(languageIsValid, bookbindIsValid, formatIsValid);
  const resetHandler = () => {
    redirect((window.location.href = "/books/new"));
  };

  const submitHandler = () => {
    return null;
  };

  const pagesClasses = pagesHasError ? "form-control invalid" : "form-control";
  const serialNumberClasses = serialNumberHasError
    ? "form-control invalid"
    : "form-control";

    useEffect(()=>{
      setData(fetchedData)
    },[])
  return (
    <div>
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
            options: data.scripts,
            input: {
              label: "Izaberite pismo",
              type: "text",
              name: "language",
            },
            validHandler: languageHandler,
          },
          {
            options: data.bookbinds,
            input: {
              label: "Izaberite povez",
              type: "text",
              name: "bookbind",
            },
            validHandler: bookbindHandler,
          },
          {
            options: data.formats,
            input: {
              label: "Izaberite format",
              type: "text",
              name: "format",
            },
            validHandler: formatHandler,
          },
        ]}
        submit={() => submitHandler()}
        reset={() => resetHandler()}
        title="Nova knjiga"
        firstLinkName="Knjige"
        path="/books"
        pathDashboard="/dashboard"
        formIsValid={formIsValid}
        headers={true}
        editHeaders={[
          {
            details: `/books/${params.id}/edit`,
            specification: `/books/${params.id}/edit/specification`,
            multimedia: `/books/${params.id}/edit/multimedia`,
          },
        ]}
      />
      <SettingsForm
        input={[
          {
            label: "International Standard Book Num",
            inputClasses: serialNumberClasses,
            type: "text",
            name: "pages",
            value: serialNumberValue,
            hasError: serialNumberHasError,
            onChange: serialNumberChangeHandler,
            onBlur: serialNumberBlurHandler,
          },
        ]}
        reset={resetHandler}
        formIsValid={formIsValid}
        submitHandler={(event) => submitHandler(event)}
        className="specification-serial-number"
      />
    </div>
  );
}
