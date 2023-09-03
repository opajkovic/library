import useInput from "../../../../hooks/useInput";
import { Link } from "react-router-dom";
import FormSubmitButtons from "../../../../components/UI/FormSubmitButtons";

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
    console.log(formatValue);

    resetFormat();
  };

  const formatClasses = formatHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <>
      <div className="new-item">
        <div>
          <h1 className="new-title">Novi format</h1>
          <div className="new-subtitle">
            <Link to={"/settings"}>Settings</Link>
            <span>/</span>
            <Link to={"/settings/format"}>Formati</Link>
            <span>/</span>
            <Link to={"/settings/format/new"}>Novi format</Link>
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler} className="flex-between new-form">
        <div className="flex-column">
          <div className={formatClasses}>
            <label htmlFor="format">
              Naziv formata <sup>*</sup>
            </label>
            <input
              type="text"
              id="format"
              value={formatValue}
              onChange={formatChangeHandler}
              onBlur={formatBlurHandler}
            />
            {formatHasError && (
              <p className="error-message">Unesite naziv formata</p>
            )}
          </div>
        </div>
        <FormSubmitButtons
          disabled={!formIsValid}
          reset={() => resetFormat()}
        />
      </form>
    </>
  );
};
export default NoviFormat;
