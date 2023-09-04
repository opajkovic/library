import useInput from "../../../../hooks/useInput";
import SettingsForm from "../../../../components/UI/SettingsForm";

const isNotEmpty = (value) => value.trim() !== "";

const NovaKategorija = () => {
  const {
    value: kategorijaValue,
    isValid: kategorijaIsValid,
    hasError: kategorijaHasError,
    valueChangeHandler: kategorijaChangeHandler,
    inputBlurHandler: kategorijaBlurHandler,
    reset: resetKategorija,
  } = useInput(isNotEmpty);

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (kategorijaIsValid && descriptionIsValid) {
    formIsValid = true;
  }

  const resetHandler =()=>{
    resetDescription();
    resetKategorija();
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetKategorija();
  };

  const kategorijaClasses = kategorijaHasError
    ? "form-control invalid"
    : "form-control";

  const descriptionClasses = descriptionHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <SettingsForm
      input={[
        {
          label: "Naziv kategorije",
          type: "text",
          name: "kategorija",
          value: kategorijaValue,
          hasError: kategorijaHasError,
          onChange: kategorijaChangeHandler,
          onBlur: kategorijaBlurHandler,
        },
      ]}
      textarea={[
        {
          label: "Opis",
          type: "text",
          name: "description",
          value: descriptionValue,
          hasError: descriptionHasError,
          onChange: descriptionChangeHandler,
          onBlur: descriptionBlurHandler,
        },
      ]}
      title="Nova kategorija"
      firstLinkName="Kategorije"
      path="/settings/categories"
      inputClasses={kategorijaClasses}
      descriptionClasses={descriptionClasses}
      formIsValid={formIsValid}
      reset={resetHandler}
      submitHandler={() => submitHandler()}
    />
  );
};
export default NovaKategorija;
