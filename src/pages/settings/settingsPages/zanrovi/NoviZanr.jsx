import useInput from "../../../../hooks/useInput";
import SettingsForm from "../../../../components/UI/SettingsForm";

const isNotEmpty = (value) => value.trim() !== "";

const NoviZanr = () => {
  const {
    value: zanrValue,
    isValid: zanrIsValid,
    hasError: zanrHasError,
    valueChangeHandler: zanrChangeHandler,
    inputBlurHandler: zanrBlurHandler,
    reset: resetZanr,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (zanrIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetZanr();
  };

  const zanrClasses = zanrHasError ? "form-control invalid" : "form-control";

  return (
    <SettingsForm
      input={[
        {
          label: "Naziv žanra",
          type: "text",
          name: "zanr",
          value: zanrValue,
          hasError: zanrHasError,
          onChange: zanrChangeHandler,
          onBlur: zanrBlurHandler,
        },
      ]}
      className="settings-new-item"
      title="Novi žanr"
      firstLinkName="Žanrovi"
      path="/settings/zanrovi"
      classes={zanrClasses}
      formIsValid={formIsValid}
      reset={resetZanr}
      submitHandler={() => submitHandler()}
    />
  );
};
export default NoviZanr;
