import useInput from "../../../../hooks/useInput";
import { Link } from "react-router-dom";
import FormSubmitButtons from "../../../../components/UI/FormSubmitButtons";

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
    console.log(zanrValue);

    resetZanr();
  };

  const zanrClasses = zanrHasError ? "form-control invalid" : "form-control";

  return (
    <>
      <div className="new-item">
        <div>
          <h1 className="new-title">Novi zanr</h1>
          <div className="new-subtitle">
            <Link to={"/settings"}>Settings</Link>
            <span>/</span>
            <Link to={"/settings/zanrovi"}>Zanrovi</Link>
            <span>/</span>
            <Link to={"/settings/zanrovi/new"}>Nova zanr</Link>
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler} className="flex-between new-form">
        <div className="flex-column">
          <div className={zanrClasses}>
            <label htmlFor="naziv">
              Naziv zanra <sup>*</sup>
            </label>
            <input
              type="text"
              id="naziv"
              value={zanrValue}
              onChange={zanrChangeHandler}
              onBlur={zanrBlurHandler}
            />
            {zanrHasError && (
              <p className="error-message">Unesite naziv zanra</p>
            )}
          </div>
        </div>
        <FormSubmitButtons disabled={!formIsValid} reset={() => resetZanr()} />
      </form>
    </>
  );
};
export default NoviZanr;
