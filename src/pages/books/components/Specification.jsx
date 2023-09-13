import SettingsForm from "../../../components/UI/SettingsForm";
import useInput from "../../../hooks/useInput";
import { useEffect, useState } from "react";
import "./Specification.css";
import { filterAndMap } from "../../../util/Functions";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, resetFormData } from "../../../redux/new-book-data";
import { useLoaderData, useNavigate } from "react-router";

export default function NewBookSpecification() {
  const dispatch = useDispatch();
  const newBook = useSelector((state) => state.newBookData);
  console.log(newBook);

  const [scriptIsValid, setScriptIsValid] = useState(false);
  const [bookbindIsValid, setBookbindIsValid] = useState(false);
  const [formatIsValid, setFormatIsValid] = useState(false);
  const fetchedData = useLoaderData();
  const [data, setData] = useState({});

  const [secondLevel, setSecondLevel] = useState(false);
  const navigate = useNavigate();

  const [scriptValue, setScriptValue] = useState("");
  const scriptChangeHandler = (newValue) => {
    setScriptValue(newValue);
  };
  const scriptHandler = (value) => {
    setScriptIsValid(value);
  };

  const [bookbindValue, setBookbindValue] = useState("");
  const bookbindChangeHandler = (newValue) => {
    setBookbindValue(newValue);
  };
  const bookbindHandler = (value) => {
    setBookbindIsValid(value);
  };

  const [formatValue, setFormatValue] = useState("");
  const formatChangeHandler = (newValue) => {
    setFormatValue(newValue);
  };
  const formatHandler = (value) => {
    setFormatIsValid(value);
  };

  const isNotEmptyString = (value) => value.trim().length > 0;
  const {
    value: pagesValue,
    isValid: pagesIsValid,
    hasError: pagesHasError,
    valueChangeHandler: pagesChangeHandler,
    inputBlurHandler: pagesBlurHandler,
    reset: pagesReset,
  } = useInput(isNotEmptyString);

  let formIsValid = false;
  if (pagesIsValid && scriptIsValid && bookbindIsValid && formatIsValid) {
    formIsValid = true;
  }

  const submitHandler = () => {
    setSecondLevel(true);
    const formData = {
      brStrana: pagesValue,
      pismo: filterAndMap(data.scripts, scriptValue),
      povez: filterAndMap(data.bookbinds, bookbindValue),
      format: filterAndMap(data.formats, formatValue),
      isbn: "1234567891011",
    };
    dispatch(updateFormData(formData));
    navigate("/books/new/multimedija");
  };

  const pagesClasses = pagesHasError ? "form-control invalid" : "form-control";

  useEffect(() => {
    setData(fetchedData);
    setSecondLevel(false);
  }, []);

  const resetHandler = () => {
    pagesReset();
    setScriptValue("");
    setBookbindValue("");
    setFormatValue("");
    navigate("/books/new/osnovni-detalji");
    dispatch(resetFormData());
  };

  return (
    <div className="new-book-specification-wrapper">
      <SettingsForm
        input={[
          {
            label: "Broj strana",
            inputClasses: pagesClasses,
            type: "text",
            name: "pages",
            value: pagesValue,
            hasError: pagesHasError,
            onChange: pagesChangeHandler,
            onBlur: pagesBlurHandler,
          },
        ]}
        select={[
          {
            options: data.scripts,
            input: {
              label: "Izaberite pismo",
              type: "text",
              name: "language",
              value: scriptValue,
              onChange: scriptChangeHandler,
            },
            validHandler: scriptHandler,
          },
          {
            options: data.bookbinds,
            input: {
              label: "Izaberite povez",
              type: "text",
              name: "bookbind",
              value: bookbindValue,
              onChange: bookbindChangeHandler,
            },
            validHandler: bookbindHandler,
          },
          {
            options: data.formats,
            input: {
              label: "Izaberite format",
              type: "text",
              name: "format",
              value: formatValue,
              onChange: formatChangeHandler,
            },
            validHandler: formatHandler,
          },
        ]}
        reset={resetHandler}
        title="Nova knjiga"
        firstLinkName="Knjige"
        path="/books"
        pathDashboard="/dashboard"
        formIsValid={formIsValid}
        submitHandler={(event) => submitHandler(event)}
        headers={true}
        secondLevel={secondLevel}
      />
      <SettingsForm
        input={[
          {
            label: "International Standard Book Num",
            type: "text",
            name: "pages",
            value: "1234567891011",
            disabled: true,
          },
        ]}
        secondLevel={secondLevel}
        reset={resetHandler}
        formIsValid={formIsValid}
        submitHandler={(event) => submitHandler(event)}
        className="specification-serial-number"
      />
    </div>
  );
}
