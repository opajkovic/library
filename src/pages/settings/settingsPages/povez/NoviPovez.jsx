import useInput from "../../../../hooks/useInput";
import { Link } from "react-router-dom";
import FormSubmitButtons from "../../../../components/UI/FormSubmitButtons";

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
    console.log(povezValue);

    resetPovez();
  };

  const povezClasses = povezHasError ? "form-control invalid" : "form-control";

  return (
    <>
      <div className="new-item">
        <div>
          <h1 className="new-title">Novi zanr</h1>
          <div className="new-subtitle">
            <Link to={"/settings"}>Settings</Link>
            <span>/</span>
            <Link to={"/settings/povezi"}>Povezi</Link>
            <span>/</span>
            <Link to={"/settings/povezi/new"}>Nova povez</Link>
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler} className="flex-between new-form">
        <div className="flex-column">
          <div className={povezClasses}>
            <label htmlFor="povez">
              Naziv poveza <sup>*</sup>
            </label>
            <input
              type="text"
              id="naziv"
              value={povezValue}
              onChange={povezChangeHandler}
              onBlur={povezBlurHandler}
            />
            {povezHasError && (
              <p className="error-message">Unesite naziv poveza</p>
            )}
          </div>
        </div>
        <FormSubmitButtons disabled={!formIsValid} reset={() => resetPovez()} />
      </form>
    </>
  );
};
export default NoviZanr;
