import useInput from "../../../../hooks/useInput";
import { Link } from "react-router-dom";
import FormSubmitButtons from "../../../../components/UI/FormSubmitButtons";

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
    console.log(pismoValue);

    resetPismo();
  };

  const pismoClasses = pismoHasError ? "form-control invalid" : "form-control";

  return (
    <>
      <div className="new-item">
        <div>
          <h1 className="new-title">Novi pismo</h1>
          <div className="new-subtitle">
            <Link to={"/settings"}>Settings</Link>
            <span>/</span>
            <Link to={"/settings/pismo"}>Pisma</Link>
            <span>/</span>
            <Link to={"/settings/pismo/new"}>Novo pismo</Link>
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler} className="flex-between new-form">
        <div className="flex-column">
          <div className={pismoClasses}>
            <label htmlFor="pismo">
              Naziv pisma <sup>*</sup>
            </label>
            <input
              type="text"
              id="pismo"
              value={pismoValue}
              onChange={pismoChangeHandler}
              onBlur={pismoBlurHandler}
            />
            {pismoHasError && (
              <p className="error-message">Unesite naziv pisma</p>
            )}
          </div>
        </div>
        <FormSubmitButtons disabled={!formIsValid} reset={() => resetPismo()} />
      </form>
    </>
  );
};
export default NovoPismo;
