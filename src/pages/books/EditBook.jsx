import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SettingsForm from "../../components/UI/SettingsForm";
import { createChangeHandler, getInvalidClass } from "../../util/Functions";
import api from "../../api/apiCalls";
import { filterAndMap } from "../../util/Functions";
import { updateEditData } from "../../redux/edit-book-data";
import { auth } from "../../services/AuthService";
import "./NewBook.css";

const EditBook = () => {
  const fetchedData = useLoaderData();
  const dispatch = useDispatch();
  const params = useParams();
  const editedData = useSelector((state) => state.editBookData);
  const navigate = useNavigate();

  const [bookInfo, setBookInfo] = useState({
    name: "",
    year: "",
    quantity: "",
  });

  const nameHandler = createChangeHandler("name", setBookInfo);
  const quantityHandler = createChangeHandler("quantity", setBookInfo);
  const yearHandler = createChangeHandler("year", setBookInfo);

  const nameClass = getInvalidClass(bookInfo.name);
  const quantityClass = getInvalidClass(bookInfo.quantity);
  const yearClass = getInvalidClass(bookInfo.year);

  const [categoryValue, setCategoryValue] = useState({
    value: fetchedData.book.categories[0].name,
    label: fetchedData.book.categories[0].name,
  });
  const categoryChangeHandler = (newValue) => {
    setCategoryValue(newValue);
  };

  const [genreValue, setGenreValue] = useState({
    value: fetchedData.book.genres[0].name,
    label: fetchedData.book.genres[0].name,
  });
  const genreChangeHandler = (newValue) => {
    setGenreValue(newValue);
  };

  const [authorValue, setAuthorValue] = useState({
    value: fetchedData.book.authors[0].name + " " + fetchedData.book.authors[0].surname,
    label: fetchedData.book.authors[0].name + " " + fetchedData.book.authors[0].surname,
  });
  const authorChangeHandler = (newValue) => {
    setAuthorValue(newValue);
  };

  const [publisherValue, setPublisherValue] = useState({
    value: fetchedData.book.publisher.name,
    label: fetchedData.book.publisher.name,
  });
  const publisherChangeHandler = (newValue) => {
    setPublisherValue(newValue);
  };

  const [richTextareaValue, setRichTextareaValue] = useState(
    fetchedData.book.description
  );
  const richTextareaChangeHandler = (newValue) => {
    setRichTextareaValue(newValue);
  };

  const categoryIsValid = categoryValue.value !== "";
  const genreIsValid = genreValue.value !== "";
  const authorIsValid = authorValue.value !== "";
  const publisherIsValid = publisherValue.value !== "";

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
  };

  const updatingFunction = async () => {
    const updatedData = {
      nazivKnjiga: bookInfo.name,
      kratki_sadrzaj: richTextareaValue,
      categories: filterAndMap(fetchedData.categories, categoryValue.value),
      genres: filterAndMap(fetchedData.genres, genreValue.value),
      authors: filterAndMap(fetchedData.authors, authorValue.value.split(" ")[0]),
      izdavac: Number(
        filterAndMap(fetchedData.publishers, publisherValue.value)
      ),
      godinaIzdavanja: bookInfo.year,
      knjigaKolicina: bookInfo.quantity,
    };
    dispatch(updateEditData(updatedData));
  };

  useEffect(() => {
    updatingFunction();
  }, [
    categoryValue,
    richTextareaValue,
    genreValue,
    bookInfo,
    genreValue,
    authorValue,
  ]);

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

  useEffect(() => {
    dispatch(
      updateEditData({
        nazivKnjiga: fetchedData.book.title,
        kratki_sadrzaj: fetchedData.book.description,
        categories: fetchedData.book.categories[0].id,
        genres: fetchedData.book.genres[0].id,
        authors:
          fetchedData.book.authors.length > 0
            ? fetchedData.book.authors[0].id
            : 0,
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
            label: "Izaberite kategoriju",
            value: categoryValue,
            onChange: categoryChangeHandler,
          },
          {
            options: fetchedData.genres,
            label: "Izaberite žanr",
            value: genreValue,
            onChange: genreChangeHandler,
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
        secondLevel={true}
      />
      <SettingsForm
        select={[
          {
            options: fetchedData.publishers,
            label: "Izaberite izdavača",
            value: publisherValue,
            onChange: publisherChangeHandler,
          },
          {
            options: fetchedData.authors,
            label: "Izaberite autore",
            value: authorValue,
            onChange: authorChangeHandler,
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
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/${id}/edit`);
      const responseData = response.data.data;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  } else {
    return [];
  }
};
