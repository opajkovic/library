import useInput from "../../../../hooks/useInput";
import SettingsForm from "../../../../components/UI/SettingsForm";

const isNotEmpty = (value) => value.trim() !== "";

const NoviIzdavac = () => {
  const {
    value: izdavacValue,
    isValid: izdavacIsValid,
    hasError: izdavacHasError,
    valueChangeHandler: izdavacChangeHandler,
    inputBlurHandler: izdavacBlurHandler,
    reset: resetIzdavac,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (izdavacIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    resetIzdavac();
  };

  const izdavacClasses = izdavacHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <SettingsForm
      input={[
        {
          label: "Naziv izdavača",
          type: "text",
          name: "izdavac",
          value: izdavacValue,
          hasError: izdavacHasError,
          onChange: izdavacChangeHandler,
          onBlur: izdavacBlurHandler,
        },
      ]}
      className="settings-new-item"
      title="Novi izdavač"
      firstLinkName="Izdavači"
      path="/settings/izdavac"
      classes={izdavacClasses}
      formIsValid={isNotEmpty(izdavacValue)}
      reset={resetIzdavac}
      submitHandler={() => submitHandler()}
    />
  );
};
export default NoviIzdavac;
