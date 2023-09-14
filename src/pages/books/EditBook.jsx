import { useState, useEffect } from "react";
import SettingsForm from "../../components/UI/SettingsForm";
import { createChangeHandler, getInvalidClass } from "../../util/Functions";
import "./NewBook.css";
import { useLoaderData, useParams } from "react-router";
import api from "../../api/apiCalls";

const EditBook = () => {
  const fetchedData = useLoaderData();
  const params = useParams();

  const [categoryIsValid, setCategoryIsValid] = useState(false);
  const [genreIsValid, setGenreIsValid] = useState(false);
  const [authorIsValid, setAuthorIsValid] = useState(false);
  const [publisherIsValid, setPublisherIsValid] = useState(false);

  const [bookInfo, setBookInfo] = useState({
    name: "",
    category: "",
    description: "",
    genre: "",
    year: "",
    quantity: "",
    author: "",
    publisher: "",
  });

  const nameHandler = createChangeHandler("name", setBookInfo);
  const quantityHandler = createChangeHandler("quantity", setBookInfo);
  const yearHandler = createChangeHandler("year", setBookInfo);

  const nameClass = getInvalidClass(bookInfo.name);
  const quantityClass = getInvalidClass(bookInfo.quantity);
  const yearClass = getInvalidClass(bookInfo.year);

  const [categoryValue, setCategoryValue] = useState(
    fetchedData.book.categories[0].name
  );
  const categoryChangeHandler = (newValue) => {
    setCategoryValue(newValue);
  };
  const categoryHandler = (value) => {
    setCategoryIsValid(value);
  };

  const [genreValue, setGenreValue] = useState(fetchedData.book.genres[0].name);
  const genreChangeHandler = (newValue) => {
    setGenreValue(newValue);
  };
  const genreHandler = (value) => {
    setGenreIsValid(value);
  };

  const [authorValue, setAuthorValue] = useState(
    fetchedData.book.authors[0].name + " " + fetchedData.book.authors[0].surname
  );
  const authorChangeHandler = (newValue) => {
    setAuthorValue(newValue);
  };
  const authorHandler = (value) => {
    setAuthorIsValid(value);
  };

  const [publisherValue, setPublisherValue] = useState(
    fetchedData.book.publisher.name
  );
  const publisherChangeHandler = (newValue) => {
    setPublisherValue(newValue);
  };
  const publisherHandler = (value) => {
    setPublisherIsValid(value);
  };

  const [richTextareaValue, setRichTextareaValue] = useState(fetchedData.book.description);
  const richTextareaChangeHandler = (newValue) => {
    setRichTextareaValue(newValue);
  };

  let formIsValid = false;
  if (
    nameClass === "form-control" &&
    categoryIsValid &&
    genreIsValid &&
    yearClass === "form-control" &&
    quantityClass === "form-control" &&
    authorIsValid &&
    publisherIsValid
  ) {
    formIsValid = true;
  }

  const resetHandler = () => {
    setBookInfo({
      name: fetchedData.book.title,
      year: fetchedData.book.pDate,
      quantity: fetchedData.book.samples,
    });
    setRichTextareaValue(fetchedData.book.description)
    setCategoryValue(fetchedData.book.categories[0].name);
    setAuthorValue(
      fetchedData.book.authors[0].name +
        " " +
        fetchedData.book.authors[0].surname
    );
    setPublisherValue(fetchedData.book.publisher.name);
    setGenreValue(fetchedData.book.genres[0].name);
  };

  const submitHandler = () => {
    // Post request
    return null;
  };

  useEffect(() => {
    resetHandler();
  }, []);

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
          value: richTextareaValue,
          valueUpdate: richTextareaChangeHandler,
        }}
        select={[
          {
            options: fetchedData.categories,
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
            options: fetchedData.genres,
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
        reset={() => resetHandler()}
        submit={() => submitHandler()}
        title="Izmijeni knjigu"
        firstLinkName="Knjige"
        path={`/books/${params.id}`}
        pathDashboard="/dashboard"
        formIsValid={formIsValid}
        className="new-book-wrapper-left"
        headers={true}
        editHeaders={[
          {
            details: `/books/${params.id}/edit`,
            specification: `/books/${params.id}/edit/specification`,
            multimedia: `/books/${params.id}/edit/multimedia`,
          },
        ]}
        imagePath={bookInfo.photoPath}
        edit={true}
      />
      <SettingsForm
        select={[
          {
            options: fetchedData.publishers,
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
            options: fetchedData.authors,
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
            label: "Količina",
            inputClasses: quantityClass,
            type: "text",
            name: "quantity",
            value: bookInfo.quantity,
            onChange: quantityHandler,
          },
          {
            label: "Izaberite godinu izdavanja",
            inputClasses: yearClass,
            type: "text",
            name: "year",
            value: bookInfo.year,
            onChange: yearHandler,
          },
        ]}
        reset={() => resetHandler()}
        submit={() => submitHandler()}
        formIsValid={formIsValid}
        className="new-book-wrapper-right"
      />
    </div>
  );
};
export default EditBook;

export const EditBookLoader = async ({ params }) => {
  const id = params.id;
  try {
    const response = await api.get(`/books/${id}/edit`);
    const responseData = response.data.data;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
