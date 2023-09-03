import useInput from "../../../../hooks/useInput";
import { Link } from "react-router-dom";
import FormSubmitButtons from "../../../../components/UI/FormSubmitButtons";

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
    console.log(izdavacValue);

    resetIzdavac();
  };

  const izdavacClasses = izdavacHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <>
      <div className="new-item">
        <div>
          <h1 className="new-title">Novi izdavac</h1>
          <div className="new-subtitle">
            <Link to={"/settings"}>Settings</Link>
            <span>/</span>
            <Link to={"/settings/izdavac"}>Izdavaci</Link>
            <span>/</span>
            <Link to={"/settings/izdavac/new"}>Nova izdavac</Link>
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler} className="flex-between new-form">
        <div className="flex-column">
          <div className={izdavacClasses}>
            <label htmlFor="izdavac">
              Naziv izdavaca <sup>*</sup>
            </label>
            <input
              type="text"
              id="izdavac"
              value={izdavacValue}
              onChange={izdavacChangeHandler}
              onBlur={izdavacBlurHandler}
            />
            {izdavacHasError && (
              <p className="error-message">Unesite naziv izdavaca</p>
            )}
          </div>
        </div>
        <FormSubmitButtons
          disabled={!formIsValid}
          reset={() => resetIzdavac()}
        />
      </form>
    </>
  );
};
export default NoviIzdavac;
