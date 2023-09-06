import { useState } from "react";
import SettingsForm from "../../components/UI/SettingsForm";
import useInput from "../../hooks/useInput";

const isNotEmptyString = (value) => /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/.test(value);

const NewBook = () => {
  const [categoryIsValid, setCategoryIsValid] = useState(false);
  const [genreIsValid, setGenreIsValid] = useState(false);

  const categoryHandler = (value) => {
    setCategoryIsValid(value);
  };

  const genreHandler = (value) => {
    setGenreIsValid(value);
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
  if (bookIsValid && genreIsValid && categoryIsValid) {
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
  console.log(categoryIsValid)
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
