import SettingsForm from "../../../components/UI/SettingsForm";
import { useEffect, useState } from "react";
import "./Specification.css";
import { filterAndMap } from "../../../util/Functions";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../../redux/new-book-data";
import { useLoaderData, useNavigate } from "react-router";
import { updateCurrentData } from "../../../redux/new-book-current";

export default function NewBookSpecification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentBookData = useSelector((state) => state.newBookCurrent);

  const [scriptIsValid, setScriptIsValid] = useState(false);
  const [bookbindIsValid, setBookbindIsValid] = useState(false);
  const [formatIsValid, setFormatIsValid] = useState(false);
  const [pagesIsValid, setPagesIsValid] = useState(false);

  const [clickedPages, setClickedPages] = useState(false);
  const [secondLevel, setSecondLevel] = useState(false);

  const fetchedData = useLoaderData();
  const [data, setData] = useState({});

  const [scriptValue, setScriptValue] = useState(currentBookData.pismo || "");
  const scriptChangeHandler = (newValue) => {
    setScriptValue(newValue);
  };
  const scriptHandler = (value) => {
    setScriptIsValid(value);
  };

  const [bookbindValue, setBookbindValue] = useState(currentBookData.povez || "");
  const bookbindChangeHandler = (newValue) => {
    setBookbindValue(newValue);
  };
  const bookbindHandler = (value) => {
    setBookbindIsValid(value);
  };

  const [formatValue, setFormatValue] = useState(currentBookData.format || "");
  const formatChangeHandler = (newValue) => {
    setFormatValue(newValue);
  };
  const formatHandler = (value) => {
    setFormatIsValid(value);
  };

  const pagesBlurHandler = () => {
    setClickedPages(true);
  };

  const [pagesValue, setPagesValue] = useState(currentBookData.brStrana || "");
  const pagesChangeHandler = (event) => {
    setPagesValue(event.target.value);
    setPagesIsValid(pagesValue !== "");
  };

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
      isbn: 1234567891011,
    };
    dispatch(updateFormData(formData));
    dispatch(updateCurrentData({
      brStrana: pagesValue,
      povez: bookbindValue,
      format: formatValue,
      pismo: scriptValue,
    })
    )
    navigate("/books/new/multimedija");
  };

  const pagesClasses = !pagesIsValid && clickedPages ? "form-control invalid" : "form-control";

  useEffect(() => {
    setData(fetchedData);
    setSecondLevel(false);
    setPagesIsValid(pagesValue !== "");
  }, []);

  const resetHandler = () => {
    setPagesValue("")
    setScriptValue("");
    setBookbindValue("");
    setFormatValue("");
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
        reset={() => resetHandler()}
        submit={() => submitHandler()}
        title="Nova knjiga"
        firstLinkName="Knjige"
        path="/books"
        pathDashboard="/dashboard"
        formIsValid={formIsValid}
        headers={true}
        secondLevel={secondLevel}
      />
      <SettingsForm
        input={[
          {
            label: "International Standard Book Num",
            type: "text",
            name: "pages",
            value: 1234567891011,
            disabled: true,
          },
        ]}
        secondLevel={secondLevel}
        reset={() => resetHandler()}
        submit={() => submitHandler()}
        formIsValid={formIsValid}
        className="specification-serial-number"
      />
    </div>
  );
}
