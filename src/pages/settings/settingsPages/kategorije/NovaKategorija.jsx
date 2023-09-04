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

  let formIsValid = false;
  if (kategorijaIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log(kategorijaValue);

    resetKategorija();
  };

  const kategorijaClasses = kategorijaHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <SettingsForm
      input={{
        label: "Naziv kategorije",
        type: "text",
        name: "kategorija",
        value: kategorijaValue,
        hasError: kategorijaHasError,
        onChange: kategorijaChangeHandler,
        onBlur: kategorijaBlurHandler,
      }}
      title="Nova kategorija"
      firstLinkName="Kategorije"
      path="/settings/categories"
      classes={kategorijaClasses}
      formIsValid={formIsValid}
      reset={resetKategorija}
      submitHandler={() => submitHandler()}
    />
  );
};
export default NovaKategorija;
