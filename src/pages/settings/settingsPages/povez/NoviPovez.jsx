import useInput from "../../../../hooks/useInput";
import SettingsForm from "../../../../components/UI/SettingsForm";

const isNotEmpty = (value) => value.trim() !== "";

const NoviZanr = () => {
  const {
    value: povezValue,
    isValid: povezIsValid,
    hasError: povezHasError,
    valueChangeHandler: povezChangeHandler,
    inputBlurHandler: povezBlurHandler,
    reset: resetPovez,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (povezIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    resetPovez();
  };

  const povezClasses = povezHasError ? "form-control invalid" : "form-control";

  return (
    <SettingsForm
      input={[
        {
          label: "Naziv poveza",
          type: "text",
          name: "povez",
          value: povezValue,
          hasError: povezHasError,
          onChange: povezChangeHandler,
          onBlur: povezBlurHandler,
        },
      ]}
      className="settings-new-item"
      title="Novi povez"
      firstLinkName="Povezi"
      path="/settings/povez"
      classes={povezClasses}
      formIsValid={formIsValid}
      reset={resetPovez}
      submitHandler={() => submitHandler()}
    />
  );
};
export default NoviZanr;
