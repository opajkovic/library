import SettingsForm from "../../components/UI/SettingsForm";
import useInput from "../../hooks/useInput";
import { useState } from "react";

const isNotEmptyString = (value) => /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/.test(value);
const NewBook = () => {
  const {
    value: bookValue,
    isValid: bookIsValid,
    hasError: bookHasError,
    valueChangeHandler: bookChangeHandler,
    inputBlurHandler: bookBlurHandler,
    reset: resetBook,
  } = useInput(isNotEmptyString);

  const [option, setOption] = useState("");

  let formIsValid = false;
  if (bookIsValid) {
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
          options: ["", "kategorija 1", "kategorija 2", "kategorija 3"],
          value: { option },
          onChange: (event) => setOption(event.target.value),
          input: {
            label: "Izaberite kategorije",
            inputClasses: bookClasses,
            type: "text",
            name: "author",
            value: bookValue,
            hasError: bookHasError,
            onChange: bookChangeHandler,
            onBlur: bookBlurHandler,
          },
        },
        {
          options: ["", "žanr 1", "žanr 2", "žanr 3"],
          value: { option },
          onChange: (event) => setOption(event.target.value),
          input: {
            label: "Izaberite žanrove",
            inputClasses: bookClasses,
            type: "text",
            name: "author",
            value: bookValue,
            hasError: bookHasError,
            onChange: bookChangeHandler,
            onBlur: bookBlurHandler,
          },
        },
      ]}
      title="Nova knjiga"
      firstLinkName="Knjige"
      path="/books"
      formIsValid={formIsValid}
      reset={resetHandler}
      submitHandler={() => submitHandler()}
    />
  );
};
export default NewBook;
