import { useState } from "react";
import SettingsForm from "../../components/UI/SettingsForm";
import useInput from "../../hooks/useInput";

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
    reset: resetBook,
  } = useInput(isNotEmptyString);

  let formIsValid = false;
  if (
    bookIsValid &&
    genreIsValid &&
    categoryIsValid &&
    authorIsValid &&
    publisherIsValid &&
    yearIsValid
  ) {
    formIsValid = true;
  }

  const resetHandler = () => {
    resetBook();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetBook();
  };

  const bookClasses = bookHasError ? "form-control invalid" : "form-control";
  console.log(categoryIsValid);
  return (
    <SettingsForm
      input={[
        {
          label: "Naziv knjige",
          inputClasses: bookClasses,
          type: "text",
          name: "author",
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
        {
          options: ["Mark Twen", "Pero Peric"],
          input: {
            label: "Izaberite autore",
            type: "text",
            name: "author",
          },
          validHandler: authorHandler,
        },
        {
          options: ["Izdavac 1", "Izdavac 2"],
          input: {
            label: "Izdavac",
            type: "text",
            name: "publisher",
          },
          validHandler: publisherHandler,
        },
        {
          options: ["Godina izdavanja"],
          input: {
            label: "Godina izdavanja",
            type: "text",
            name: "year",
          },
          validHandler: yearHandler,
        },
      ]}
      title="Nova knjiga"
      firstLinkName="Knjige"
      path="/books"
      pathDashboard="/dashboard"
      formIsValid={formIsValid}
      reset={resetHandler}
      submitHandler={() => submitHandler()}
    />
  );
};
export default NewBook;
