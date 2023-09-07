import useInput from "../../../../hooks/useInput";
import SettingsForm from "../../../../components/UI/SettingsForm";

const isNotEmpty = (value) => value.trim() !== "";

const NovoPismo = () => {
  const {
    value: pismoValue,
    isValid: pismoIsValid,
    hasError: pismoHasError,
    valueChangeHandler: pismoChangeHandler,
    inputBlurHandler: pismoBlurHandler,
    reset: resetPismo,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (pismoIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    resetPismo();
  };

  const pismoClasses = pismoHasError ? "form-control invalid" : "form-control";

  return (
    <SettingsForm
      input={[
        {
          label: "Naziv pisma",
          type: "text",
          name: "pismo",
          value: pismoValue,
          hasError: pismoHasError,
          onChange: pismoChangeHandler,
          onBlur: pismoBlurHandler,
        },
      ]}
      className="settings-new-item"
      title="Novo pismo"
      firstLinkName="Pisma"
      path="/settings/pismo"
      classes={pismoClasses}
      formIsValid={formIsValid}
      reset={resetPismo}
      submitHandler={() => submitHandler()}
    />
  );
};
export default NovoPismo;
