import SettingsForm from "../../../components/UI/SettingsForm";
import { createChangeHandler, getInvalidClass } from "../../../util/Functions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEditData } from "../../../redux/edit-book-data";
import { filterAndMap } from "../../../util/Functions";
import api from "../../../api/apiCalls";
import "./Specification.css";
import { useLoaderData, useParams } from "react-router";

export default function EditSpecification() {
  const fetchedData = useLoaderData();
  const dispatch = useDispatch();
  const params = useParams();
  const editedData = useSelector(state => state.editBookData);

  const [scriptIsValid, setScriptIsValid] = useState(false);
  const [bookbindIsValid, setBookbindIsValid] = useState(false);
  const [formatIsValid, setFormatIsValid] = useState(false);

  const [bookInfo, setBookInfo] = useState({
    pages: "",
  });

  const [scriptValue, setScriptValue] = useState(fetchedData.book.script.name);
  const scriptChangeHandler = (newValue) => {
    setScriptValue(newValue);
  };
  const scriptHandler = (value) => {
    setScriptIsValid(value);
  };

  const [bookbindValue, setBookbindValue] = useState(
    fetchedData.book.bookbind.name
  );
  const bookbindChangeHandler = (newValue) => {
    setBookbindValue(newValue);
  };
  const bookbindHandler = (value) => {
    setBookbindIsValid(value);
  };

  const [formatValue, setFormatValue] = useState(fetchedData.book.format.name);
  const formatChangeHandler = (newValue) => {
    setFormatValue(newValue);
  };
  const formatHandler = (value) => {
    setFormatIsValid(value);
  };

  const pageHandler = createChangeHandler("pages", setBookInfo);
  const pagesClasses = getInvalidClass(bookInfo.pages);

  let formIsValid = false;
  if (
    pagesClasses === "form-control" &&
    scriptIsValid &&
    bookbindIsValid &&
    formatIsValid
  ) {
    formIsValid = true;
  }

  const resetHandler = () => {
    setBookInfo({
      pages: fetchedData.book.pages,
    });
    setScriptValue(fetchedData.book.script.name);
    setFormatValue(fetchedData.book.format.name);
    setBookbindValue(fetchedData.book.bookbind.name);
  };

  const submitHandler = () => {
    const updatedData = {
      brStrana: bookInfo.pages,
      povez: filterAndMap(fetchedData.bookbinds, bookbindValue),
      format: filterAndMap(fetchedData.formats, formatValue),
      pismo: filterAndMap(fetchedData.scripts, scriptValue),
    }
    dispatch(updateEditData(updatedData))
  };

  const updatingFunction = async () => {
    const response = await api.post(`/books/${params.id}/update`, editedData);
    if(response.status === 200){
      console.log("successfully updated")
      return response
    }
    else {
      console.log("unsuccesfull")
    }
  }

  useEffect(()=>{
    updatingFunction();
  },[editedData])

  useEffect(() => {
    dispatch(updateEditData({
      nazivKnjiga: fetchedData.book.title,
      kratki_sadrzaj: fetchedData.book.description,
      categories: fetchedData.book.categories[0].id,
      genres: fetchedData.book.genres[0].id,
      authors: fetchedData.book.authors[0].id,
      izdavac: fetchedData.book.publisher.id,
      godinaIzdavanja: fetchedData.book.pDate,
      knjigaKolicina: fetchedData.book.samples,
      brStrana: fetchedData.book.pages,
      povez: fetchedData.book.bookbind.id,
      format: fetchedData.book.format.id,
      pismo: fetchedData.book.script.id,
      isbn: fetchedData.book.isbn,
    }))
    resetHandler();
  }, []);

  return (
    <div>
      <SettingsForm
        input={[
          {
            label: "Broj strana",
            inputClasses: pagesClasses,
            type: "text",
            name: "pages",
            value: bookInfo.pages,
            onChange: pageHandler,
          },
        ]}
        select={[
          {
            options: fetchedData.scripts,
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
            options: fetchedData.bookbinds,
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
            options: fetchedData.formats,
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
        submit={() => submitHandler()}
        reset={() => resetHandler()}
        title="Izmijeni knjigu"
        firstLinkName="Knjige"
        path="/books"
        pathDashboard="/dashboard"
        formIsValid={formIsValid}
        headers={true}
        secondLevel={true}
        editHeaders={[
          {
            details: `/books/${params.id}/edit`,
            specification: `/books/${params.id}/edit/specification`,
            multimedia: `/books/${params.id}/edit/multimedia`,
          },
        ]}
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
        className="specification-serial-number"
      />
    </div>
  );
}
