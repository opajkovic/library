import { useEffect, useState } from "react";
import SettingsForm from "../../components/UI/SettingsForm";
import "./NewBook.css";
import { useLoaderData, useNavigate } from "react-router";
import { filterAndMap } from "../../util/Functions";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../redux/new-book-data";
import api from "../../api/apiCalls";
import { updateCurrentData } from "../../redux/new-book-current";

const NewBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentBookData = useSelector((state) => state.newBookCurrent);

  const [categoryIsValid, setCategoryIsValid] = useState(false);
  const [genreIsValid, setGenreIsValid] = useState(false);
  const [authorIsValid, setAuthorIsValid] = useState(false);
  const [publisherIsValid, setPublisherIsValid] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [quantityIsValid, setQuantityIsValid] = useState(false);
  const [yearIsValid, setYearIsValid] = useState(false);

  const [clickedName, setClickedName] = useState(false);
  const [clickedYear, setClickedYear] = useState(false);
  const [clickedQuantity, setClickedQuantity] = useState(false);
  const [nextLevel, setNextLevel] = useState(false);

  const nameBlurHandler = () => {
    setClickedName(true);
  };

  const quantityBlurHandler = () => {
    setClickedQuantity(true);
  };

  const yearBlurHandler = () => {
    setClickedYear(true);
  };

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

  const [nameValue, setNameValue] = useState(currentBookData.nazivKnjiga || "");
  const nameChangeHandler = (event) => {
    setNameValue(event.target.value);
    setNameIsValid(event.target.value !== "");
  };

  const [yearValue, setYearValue] = useState(
    currentBookData.godinaIzdavanja || ""
  );
  const yearChangeHandler = (event) => {
    setYearValue(event.target.value);
    setYearIsValid(event.target.value !== "");
  };

  const [quantityValue, setQuantityValue] = useState(
    currentBookData.knjigaKolicina || ""
  );
  const quantityChangeHandler = (event) => {
    setQuantityValue(event.target.value);
    setQuantityIsValid(event.target.value !== "");
  };

  const fetchedData = useLoaderData();
  const [data, setData] = useState({});
  const [authors, setAuthors] = useState([]);

  let formIsValid = false;
  if (
    nameIsValid &&
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
      nazivKnjiga: nameValue,
      kratki_sadrzaj: richTextareaValue,
      categories: filterAndMap(data.categories, categoryValue),
      genres: filterAndMap(data.genres, genreValue),
      authors: filterAndMap(data.authors, authorValue),
      izdavac: filterAndMap(data.publishers, publisherValue),
      godinaIzdavanja: yearValue,
      knjigaKolicina: quantityValue,
    };
    dispatch(updateFormData(formData));

    dispatch(
      updateCurrentData({
        nazivKnjiga: nameValue,
        kratki_sadrzaj: richTextareaValue,
        categories: categoryValue,
        genres: genreValue,
        authors: authorValue,
        izdavac: publisherValue,
        godinaIzdavanja: yearValue,
        knjigaKolicina: quantityValue,
      })
    );
    navigate("/books/new/specifikacija");
  };

  const nameClasses =
    !nameIsValid && clickedName ? "form-control invalid" : "form-control";
  const quantityClasses =
    !quantityIsValid && clickedQuantity
      ? "form-control invalid"
      : "form-control";
  const yearClasses =
    !yearIsValid && clickedYear ? "form-control invalid" : "form-control";

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
    setGenreValue(currentBookData.genres);
    setCategoryValue(currentBookData.categories);
    setPublisherValue(currentBookData.izdavac);
    setAuthorValue(currentBookData.authors);
    setNextLevel(false);

    setNameIsValid(nameValue !== "");
    setYearIsValid(yearValue !== "");
    setQuantityIsValid(quantityValue !== "");
  }, []);

  const resetHandler = () => {
    setGenreValue("");
    setCategoryValue("");
    setRichTextareaValue("");
    setPublisherValue("");
    setAuthorValue("");
    setQuantityValue("");
    setYearValue("");
    setNameValue("");
  };

  return (
    <div className="new-book-position-handler">
      <SettingsForm
        input={[
          {
            label: "Naziv knjige",
            inputClasses: nameClasses,
            type: "text",
            name: "books",
            value: nameValue,
            onBlur: nameBlurHandler,
            onChange: nameChangeHandler,
          },
        ]}
        richTextarea={{
          label: "Kratki sadržaj",
          name: "description",
          value: currentBookData.kratki_sadrzaj || richTextareaValue,
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
        title="Nova knjiga"
        firstLinkName="Knjige"
        path="/books"
        pathDashboard="/dashboard"
        formIsValid={formIsValid}
        reset={() => resetHandler()}
        submit={() => submitHandler()}
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
            onBlur: yearBlurHandler,
            onChange: yearChangeHandler,
          },
          {
            label: "Količina",
            inputClasses: quantityClasses,
            type: "text",
            name: "quantity",
            value: quantityValue,
            onBlur: quantityBlurHandler,
            onChange: quantityChangeHandler,
          },
        ]}
        reset={() => resetHandler()}
        submit={() => submitHandler()}
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
