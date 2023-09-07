import { useState, useEffect } from "react";
import SettingsForm from "../../components/UI/SettingsForm";
import { createChangeHandler, getInvalidClass } from "../../util/Functions";
import "./NewBook.css";
import { redirect, useLoaderData, useParams } from "react-router";

const EditBook = () => {
  const fetchedData = useLoaderData();
  const [data, setData] = useState(null);
  const params = useParams();

  const [categoryIsValid, setCategoryIsValid] = useState(false);
  const [genreIsValid, setGenreIsValid] = useState(false);
  const [authorIsValid, setAuthorIsValid] = useState(false);
  const [publisherIsValid, setPublisherIsValid] = useState(false);
  const [yearIsValid, setYearIsValid] = useState(false);

  const [bookInfo, setBookInfo] = useState({
    name: "knjiga",
    category: "kategorija",
    description: "opis",
    genre: "zanr",
    year: "godina",
    quantity: "kolicina",
    author: "autor",
    publisher: "izdavac",
  });

  const nameHandler = createChangeHandler("name", setBookInfo);
  const quantityHandler = createChangeHandler("quantity", setBookInfo);

  const nameClass = getInvalidClass(bookInfo.name);
  const quantityClass = getInvalidClass(bookInfo.quantity);

  const categoryHandler = (value) => {
    setCategoryIsValid(value);
  };

  const genreHandler = (value) => {
    setGenreIsValid(value);
  };

  const authorHandler = (value) => {
    setAuthorIsValid(value);
  };

  const publisherHandler = (value) => {
    setPublisherIsValid(value);
  };

  const yearHandler = (value) => {
    setYearIsValid(value);
  };

  let formIsValid = false;
  if (
    nameClass === "form-control" &&
    categoryIsValid &&
    genreIsValid &&
    yearIsValid &&
    quantityClass === "form-control" &&
    authorIsValid &&
    publisherIsValid
  ) {
    formIsValid = true;
  }

  const resetHandler = () => {
    redirect((window.location.href = "/books/new"));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    return null;
  };

  useEffect(() => {
    setData(fetchedData);
  }, []);

  console.log(data);
  return (
    <div className="new-book-position-handler">
      <SettingsForm
        input={[
          {
            label: "Naziv knjige",
            inputClasses: nameClass,
            type: "text",
            name: "books",
            value: bookInfo.name,
            onChange: nameHandler,
          },
        ]}
        richTextarea={{
          label: "Kratki sadržaj",
          value: bookInfo.description,
        }}
        select={[
          {
            options: data && data.categories,
            input: {
              label: "Izaberite kategoriju",
              type: "text",
              name: "category",
              value: bookInfo.category,
            },
            validHandler: categoryHandler,
          },
          {
            options: data && data.genres,
            input: {
              label: "Izaberite žanr",
              type: "text",
              name: "genre",
              value: bookInfo.genre,
            },
            validHandler: genreHandler,
          },
        ]}
        reset={resetHandler}
        title="Izmijeni knjigu"
        firstLinkName="Knjige"
        path={`/books/${params.id}`}
        pathDashboard="/dashboard"
        formIsValid={formIsValid}
        submitHandler={(event) => submitHandler(event)}
        className="new-book-wrapper-left"
        headers={true}
        editHeaders={[
          {
            details: `/books/${params.id}/edit`,
            specification: `/books/${params.id}/edit/specification`,
            multimedia: `/books/${params.id}/edit/multimedia`,
          },
        ]}
        image={true}
        imagePath={bookInfo.photoPath}
        edit={true}
      />
      <SettingsForm
        select={[
          {
            options: [],
            input: {
              label: "Izaberite godinu izdavanja",
              type: "text",
              name: "year",
              value: bookInfo.year,
            },
            validHandler: yearHandler,
          },
          {
            options: data && data.publishers,
            input: {
              label: "Izaberite izdavača",
              type: "text",
              name: "publishers",
              value: bookInfo.publisher,
            },
            validHandler: publisherHandler,
          },

          {
            options: data && data.authors,
            input: {
              label: "Izaberite autore",
              type: "text",
              name: "authors",
              value: bookInfo.author,
            },
            validHandler: authorHandler,
          },
        ]}
        input={[
          {
            label: "Količina",
            inputClasses: quantityClass,
            type: "text",
            name: "quantity",
            value: bookInfo.quantity,
            onChange: quantityHandler,
          },
        ]}
        reset={resetHandler}
        submitHandler={(event) => submitHandler(event)}
        formIsValid={formIsValid}
        className="new-book-wrapper-right"
      />
    </div>
  );
};
export default EditBook;
