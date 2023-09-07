import useInput from "../../../../hooks/useInput";
import SettingsForm from "../../../../components/UI/SettingsForm";

const isNotEmpty = (value) => value.trim() !== "";

const NoviFormat = () => {
  const {
    value: formatValue,
    isValid: formatIsValid,
    hasError: formatHasError,
    valueChangeHandler: formatChangeHandler,
    inputBlurHandler: formatBlurHandler,
    reset: resetFormat,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (formatIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    resetFormat();
  };

  const formatClasses = formatHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <SettingsForm
      input={[
        {
          label: "Naziv formata",
          type: "text",
          name: "format",
          value: formatValue,
          hasError: formatHasError,
          onChange: formatChangeHandler,
          onBlur: formatBlurHandler,
        },
      ]}
      className="settings-new-item"
      title="Novi format"
      firstLinkName="Formati"
      path="/settings/format"
      classes={formatClasses}
      formIsValid={formIsValid}
      reset={resetFormat}
      submitHandler={() => submitHandler()}
    />
  );
};
export default NoviFormat;
