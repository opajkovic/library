import useInput from "../../../../hooks/useInput";
import { Link } from "react-router-dom";
import FormSubmitButtons from "../../../../components/UI/FormSubmitButtons";

const isNotEmpty = (value) => value.trim() !== "";

const NovaKategorija = () => {
  const {
    value: kategorijaValue,
    isValid: kategorijaIsValid,
    hasError: kategorijaHasError,
    valueChangeHandler: kategorijaChangeHandler,
    inputBlurHandler: kategorijaBlurHandler,
    reset: resetKategorija,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (kategorijaIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log(kategorijaValue);

    resetKategorija();
  };

  const kategorijaClasses = kategorijaHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <>
      <div className="new-item">
        <div>
          <h1 className="new-title">Nova kategorija</h1>
          <div className="new-subtitle">
            <Link to={"/settings"}>Settings</Link>
            <span>/</span>
            <Link to={"/settings/categories"}>Sve kategorije</Link>
            <span>/</span>
            <Link to={"/settings/categories/new"}>Nova kategorija</Link>
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler} className="flex-between new-form">
        <div className="flex-column">
          <div className={kategorijaClasses}>
            <label htmlFor="kategorija">
              Naziv kategorije <sup>*</sup>
            </label>
            <input
              type="text"
              id="kategorija"
              value={kategorijaValue}
              onChange={kategorijaChangeHandler}
              onBlur={kategorijaBlurHandler}
            />
            {kategorijaHasError && (
              <p className="error-message">Unesite naziv kategorije</p>
            )}
          </div>
        </div>
        <div>
          <FormSubmitButtons
            disabled={!formIsValid}
            reset={() => resetKategorija()}
          />
        </div>
      </form>
    </>
  );
};
export default NovaKategorija;
