import { useEffect, useState } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SettingsForm from "../../../components/UI/SettingsForm";
import { createChangeHandler, getInvalidClass } from "../../../util/Functions";
import { updateEditData } from "../../../redux/edit-book-data";
import { filterAndMap } from "../../../util/Functions";
import api from "../../../api/apiCalls";
import "./Specification.css";

export default function EditSpecification() {
  const fetchedData = useLoaderData();
  const dispatch = useDispatch();
  const params = useParams();
  const editedData = useSelector((state) => state.editBookData);
  const navigate = useNavigate();

  const [bookInfo, setBookInfo] = useState({
    pages: "",
  });

  const pageHandler = createChangeHandler("pages", setBookInfo);
  const pagesClasses = getInvalidClass(bookInfo.pages);

  const [scriptValue, setScriptValue] = useState({
    value: fetchedData.book.script.name,
    label: fetchedData.book.script.name,
  });
  const scriptChangeHandler = (newValue) => {
    setScriptValue(newValue);
  };

  const [bookbindValue, setBookbindValue] = useState({
    value: fetchedData.book.bookbind.name,
    label: fetchedData.book.bookbind.name,
  });
  const bookbindChangeHandler = (newValue) => {
    setBookbindValue(newValue);
  };

  const [formatValue, setFormatValue] = useState({
    value: fetchedData.book.format.name,
    label: fetchedData.book.format.name,
  });
  const formatChangeHandler = (newValue) => {
    setFormatValue(newValue);
  };

  const scriptIsValid = scriptValue.value !== "";
  const bookbindIsValid = bookbindValue.value !== "";
  const formatIsValid = formatValue.value !== "";
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
  };

  const submitHandler = async () => {
    try {
      const response = await api.post(`/books/${params.id}/update`, editedData);
      toast.success("successfully updated");
      navigate(`/books/${params.id}`);
      return response;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const updatingFunction = () => {
    const updatedData = {
      brStrana: bookInfo.pages,
      povez: +filterAndMap(fetchedData.bookbinds, bookbindValue.value),
      format: +filterAndMap(fetchedData.formats, formatValue.value),
      pismo: +filterAndMap(fetchedData.scripts, scriptValue.value),
    };
    dispatch(updateEditData(updatedData));
  };

  useEffect(() => {
    updatingFunction();
  }, [bookbindValue, formatValue, scriptValue, bookInfo]);

  useEffect(() => {
    dispatch(
      updateEditData({
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
      })
    );
    resetHandler();
  }, []);

  console.log(fetchedData.book)
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
            label: "Izaberite pismo",
            value: scriptValue,
            onChange: scriptChangeHandler,
          },
          {
            options: fetchedData.bookbinds,
            label: "Izaberite povez",
            value: bookbindValue,
            onChange: bookbindChangeHandler,
          },
          {
            options: fetchedData.formats,
            label: "Izaberite format",
            value: formatValue,
            onChange: formatChangeHandler,
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
        submit={() => submitHandler()}
        reset={() => resetHandler()}
        formIsValid={formIsValid}
      />
    </div>
  );
}
