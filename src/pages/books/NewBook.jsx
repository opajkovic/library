import { useEffect, useState } from "react";
import SettingsForm from "../../components/UI/SettingsForm";
import useInput from "../../hooks/useInput";
import "./NewBook.css";
import { useLoaderData, useNavigate } from "react-router";
import { filterAndMap } from "../../util/Functions";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, resetFormData } from "../../redux/new-book-data";
import api from "../../api/apiCalls";

const isNotEmptyString = (value) => value.trim().length > 0;

const NewBook = () => {
  const dispatch = useDispatch();
  const newBook = useSelector((state) => state.newBookData);
  console.log(newBook);
  const [categoryIsValid, setCategoryIsValid] = useState(false);
  const [genreIsValid, setGenreIsValid] = useState(false);
  const [authorIsValid, setAuthorIsValid] = useState(false);
  const [publisherIsValid, setPublisherIsValid] = useState(false);

  const [richTextareaValue, setRichTextareaValue] = useState("");
  const richTextareaChangeHandler = (newValue) => {
    setRichTextareaValue(newValue);
  };

  const [categoryValue, setCategoryValue] = useState("");
  const categoryChangeHandler = (newValue) => {
    setCategoryValue(newValue);
  };
  const categoryHandler = (value) => {
    setCategoryIsValid(value);
  };

  const [genreValue, setGenreValue] = useState("");
  const genreChangeHandler = (newValue) => {
    setGenreValue(newValue);
  };
  const genreHandler = (value) => {
    setGenreIsValid(value);
  };

  const [authorValue, setAuthorValue] = useState("");
  const authorChangeHandler = (newValue) => {
    setAuthorValue(newValue);
  };
  const authorHandler = (value) => {
    setAuthorIsValid(value);
  };

  const [publisherValue, setPublisherValue] = useState("");
  const publisherChangeHandler = (newValue) => {
    setPublisherValue(newValue);
  };
  const publisherHandler = (value) => {
    setPublisherIsValid(value);
  };

  const fetchedData = useLoaderData();
  let [data, setData] = useState({});
  let [authors, setAuthors] = useState([]);

  const [nextLevel, setNextLevel] = useState(false);
  const navigate = useNavigate();

  const {
    value: bookValue,
    isValid: bookIsValid,
    hasError: bookHasError,
    valueChangeHandler: bookChangeHandler,
    inputBlurHandler: bookBlurHandler,
    reset: resetBookValue,
  } = useInput(isNotEmptyString);

  const {
    value: yearValue,
    isValid: yearIsValid,
    hasError: yearHasError,
    valueChangeHandler: yearChangeHandler,
    inputBlurHandler: yearBlurHandler,
    reset: resetYearValue,
  } = useInput(isNotEmptyString);

  const {
    value: quantityValue,
    isValid: quantityIsValid,
    hasError: quantityHasError,
    valueChangeHandler: quantityChangeHandler,
    inputBlurHandler: quantityBlurHandler,
    reset: resetQuantityValue,
  } = useInput(isNotEmptyString);

  let formIsValid = false;
  if (
    bookIsValid &&
    genreIsValid &&
    categoryIsValid &&
    authorIsValid &&
    publisherIsValid &&
    yearIsValid &&
    quantityIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = () => {
    setNextLevel(true);

    const formData = {
      nazivKnjiga: bookValue,
      kratki_sadrzaj: richTextareaValue,
      categories: filterAndMap(data.categories, categoryValue),
      genres: filterAndMap(data.genres, genreValue),
      authors: filterAndMap(data.authors, authorValue),
      izdavac: filterAndMap(data.publishers, publisherValue),
      godinaIzdavanja: yearValue,
      knjigaKolicina: quantityValue,
    };

    dispatch(updateFormData(formData));
    navigate("/books/new/specifikacija");
  };

  const bookClasses = bookHasError ? "form-control invalid" : "form-control";
  const quantityClasses = quantityHasError
    ? "form-control invalid"
    : "form-control";
  const yearClasses = yearHasError ? "form-control invalid" : "form-control";

  let fetchAuthors = async () => {
    try {
      const response = await api.get(`/authors`);
      const responseData = response.data.data;
      setAuthors(responseData);
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAuthors();
    setData(fetchedData);
    setNextLevel(false);
  }, []);

  const resetHandler = () => {
    setGenreValue("");
    setCategoryValue("");
    setRichTextareaValue("");
    setPublisherValue("");
    setAuthorValue("");
    resetBookValue();
    resetYearValue();
    resetQuantityValue();
    navigate("/books/new/osnovni-detalji");
    dispatch(resetFormData());
  };

  return (
    <div className="new-book-position-handler">
      <SettingsForm
        input={[
          {
            label: "Naziv knjige",
            inputClasses: bookClasses,
            type: "text",
            name: "books",
            value: bookValue,
            hasError: bookHasError,
            onChange: bookChangeHandler,
            onBlur: bookBlurHandler,
          },
        ]}
        richTextarea={{
          label: "Kratki sadržaj",
          name: "description",
          value: richTextareaValue,
          valueUpdate: richTextareaChangeHandler,
        }}
        select={[
          {
            options: data.categories,
            input: {
              label: "Izaberite kategoriju",
              type: "text",
              name: "category",
              value: categoryValue,
              onChange: categoryChangeHandler,
            },
            validHandler: categoryHandler,
          },
          {
            options: data.genres,
            input: {
              label: "Izaberite žanr",
              type: "text",
              name: "genre",
              value: genreValue,
              onChange: genreChangeHandler,
            },
            validHandler: genreHandler,
          },
        ]}
        reset={resetHandler}
        title="Nova knjiga"
        firstLinkName="Knjige"
        path="/books"
        pathDashboard="/dashboard"
        formIsValid={formIsValid}
        submitHandler={(event) => submitHandler(event)}
        className="new-book-wrapper-left"
        headers={true}
        nextLevel={nextLevel}
      />
      <SettingsForm
        select={[
          {
            options: data.publishers,
            input: {
              label: "Izaberite izdavača",
              type: "text",
              name: "publishers",
              value: publisherValue,
              onChange: publisherChangeHandler,
            },
            validHandler: publisherHandler,
          },
          {
            options: authors,
            input: {
              label: "Izaberite autore",
              type: "text",
              name: "authors",
              value: authorValue,
              onChange: authorChangeHandler,
            },
            validHandler: authorHandler,
          },
        ]}
        input={[
          {
            label: "Godina izdavanja",
            inputClasses: yearClasses,
            type: "text",
            name: "year",
            value: yearValue,
            hasError: yearHasError,
            onChange: yearChangeHandler,
            onBlur: yearBlurHandler,
          },
          {
            label: "Količina",
            inputClasses: quantityClasses,
            type: "text",
            name: "quantity",
            value: quantityValue,
            hasError: quantityHasError,
            onChange: quantityChangeHandler,
            onBlur: quantityBlurHandler,
          },
        ]}
        reset={resetHandler}
        submitHandler={(event) => submitHandler(event)}
        formIsValid={formIsValid}
        className="new-book-wrapper-right"
        nextLevel={nextLevel}
      />
    </div>
  );
};
export default NewBook;

export async function LoaderCreateBook() {
  try {
    const response = await api.get(`/books/create`);
    const responseData = response.data.data;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
}
