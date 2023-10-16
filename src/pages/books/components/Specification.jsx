import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { filterAndMap } from "../../../util/Functions";
import { updateFormData } from "../../../redux/new-book-data";
import SettingsForm from "../../../components/UI/SettingsForm";
import { updateCurrentData } from "../../../redux/new-book-current";
import "./Specification.css";

export default function NewBookSpecification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentBookData = useSelector((state) => state.newBookCurrent);
  const [pagesIsValid, setPagesIsValid] = useState(false);

  const [clickedPages, setClickedPages] = useState(false);
  const [secondLevel, setSecondLevel] = useState(false);

  const fetchedData = useLoaderData();
  const [data, setData] = useState({});

  const [scriptValue, setScriptValue] = useState({
    value: "",
    label: "",
  });
  const scriptChangeHandler = (newValue) => {
    setScriptValue(newValue);
  };

  const [bookbindValue, setBookbindValue] = useState({
    value: "",
    label: "",
  });
  const bookbindChangeHandler = (newValue) => {
    setBookbindValue(newValue);
  };

  const [formatValue, setFormatValue] = useState({
    value: "",
    label: "",
  });
  const formatChangeHandler = (newValue) => {
    setFormatValue(newValue);
  };

  const pagesBlurHandler = () => {
    setClickedPages(true);
  };

  const [pagesValue, setPagesValue] = useState(currentBookData.brStrana || "");
  const pagesChangeHandler = (event) => {
    setPagesValue(event.target.value);
    setPagesIsValid(pagesValue !== "");
  };

  const scriptIsValid = scriptValue.value !== "";
  const bookbindIsValid = bookbindValue.value !== "";
  const formatIsValid = formatValue.value !== "";
  let formIsValid = false;
  if (pagesIsValid && scriptIsValid && bookbindIsValid && formatIsValid) {
    formIsValid = true;
  }

  const submitHandler = () => {
    setSecondLevel(true);
    const formData = {
      brStrana: pagesValue,
      pismo: Number(filterAndMap(data.scripts, scriptValue)),
      povez: Number(filterAndMap(data.bookbinds, bookbindValue)),
      format: Number(filterAndMap(data.formats, formatValue)),
      isbn: 1234567891011,
    };
    dispatch(updateFormData(formData));
    dispatch(
      updateCurrentData({
        brStrana: pagesValue,
        povez: bookbindValue,
        format: formatValue,
        pismo: scriptValue,
      })
    );
    navigate("/books/new/multimedija");
  };

  const pagesClasses =
    !pagesIsValid && clickedPages ? "form-control invalid" : "form-control";

  useEffect(() => {
    setData(fetchedData);
    setSecondLevel(false);
    setBookbindValue(currentBookData.povez);
    setScriptValue(currentBookData.pismo);
    setFormatValue(currentBookData.format);
    setPagesIsValid(pagesValue !== "");
  }, []);

  const resetHandler = () => {
    setPagesValue("");
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
            label: "Izaberite pismo",
            value: currentBookData.pismo || scriptValue.value,
            onChange: scriptChangeHandler,
          },
          {
            options: data.bookbinds,
            label: "Izaberite povez",
            value: currentBookData.povez || bookbindValue.value,
            onChange: bookbindChangeHandler,
          },
          {
            options: data.formats,
            label: "Izaberite format",
            value: currentBookData.format || formatValue.value,
            onChange: formatChangeHandler,
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
