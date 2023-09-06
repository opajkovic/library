import { useState } from "react";
import SettingsForm from "../../components/UI/SettingsForm";
import useInput from "../../hooks/useInput";
import "./NewBook.css";
import { redirect } from "react-router";

const isNotEmptyString = (value) => /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/.test(value);

const NewBook = () => {
  const [categoryIsValid, setCategoryIsValid] = useState(false);
  const [genreIsValid, setGenreIsValid] = useState(false);
  const [authorIsValid, setAuthorIsValid] = useState(false);
  const [publisherIsValid, setPublisherIsValid] = useState(false);
  const [yearIsValid, setYearIsValid] = useState(false);

  const categoryHandler = (value) => {
    setCategoryIsValid(value);
  };

  const genreHandler = (value) => {
    setGenreIsValid(value);
  };

  const authorHandler = (value) => {
    setAuthorIsValid(value);
  };

  const publisherHandler = (value) => {
    setPublisherIsValid(value);
  };

  const yearHandler = (value) => {
    setYearIsValid(value);
  };

  const {
    value: bookValue,
    isValid: bookIsValid,
    hasError: bookHasError,
    valueChangeHandler: bookChangeHandler,
    inputBlurHandler: bookBlurHandler,
  } = useInput(isNotEmptyString);

  const {
    value: quantityValue,
    isValid: quantityIsValid,
    hasError: quantityHasError,
    valueChangeHandler: quantityChangeHandler,
    inputBlurHandler: quantityBlurHandler,
  } = useInput(isNotEmptyString);

  let formIsValid = false;
  if (
    bookIsValid &&
    genreIsValid &&
    categoryIsValid &&
    authorIsValid &&
    publisherIsValid &&
    yearIsValid &&
    quantityIsValid
  ) {
    formIsValid = true;
  }

  const resetHandler = () => {
    redirect((window.location.href = "/books/new"));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return (window.location.href = "/books/new");
    }
  };

  const bookClasses = bookHasError ? "form-control invalid" : "form-control";
  const quantityClasses = quantityHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <div className="new-book-position-handler">
      <SettingsForm
        input={[
          {
            label: "Naziv knjige",
            inputClasses: bookClasses,
            type: "text",
            name: "books",
            value: bookValue,
            hasError: bookHasError,
            onChange: bookChangeHandler,
            onBlur: bookBlurHandler,
          },
        ]}
        richTextarea={{
          label: "Kratki sadržaj",
        }}
        select={[
          {
            options: ["kategorija 1", "kategorija 2", "kategorija 3"],
            input: {
              label: "Izaberite kategoriju",
              type: "text",
              name: "category",
            },
            validHandler: categoryHandler,
          },
          {
            options: ["žanr 1", "žanr 2", "žanr 3"],
            input: {
              label: "Izaberite žanr",
              type: "text",
              name: "genre",
            },
            validHandler: genreHandler,
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
      />
      <SettingsForm
        select={[
          {
            options: ["godina 1", "godina 2", "godina 3"],
            input: {
              label: "Izaberite godinu izdavanja",
              type: "text",
              name: "year",
            },
            validHandler: yearHandler,
          },
          {
            options: ["izdavač 1", "izdavač 2", "izdavač 3"],
            input: {
              label: "Izaberite izdavača",
              type: "text",
              name: "publishers",
            },
            validHandler: publisherHandler,
          },

          {
            options: ["autor 1", "autor 2", "autor 3"],
            input: {
              label: "Izaberite autore",
              type: "text",
              name: "authors",
            },
            validHandler: authorHandler,
          },
        ]}
        input={[
          {
            label: "Količina",
            inputClasses: quantityClasses,
            type: "text",
            name: "quantity",
            value: quantityValue,
            hasError: quantityHasError,
            onChange: quantityChangeHandler,
            onBlur: quantityBlurHandler,
          },
        ]}
        reset={resetHandler}
        submitHandler={(event) => submitHandler(event)}
        formIsValid={formIsValid}
        className="new-book-wrapper-right"
      />
    </div>
  );
};
export default NewBook;
