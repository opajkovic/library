import { useEffect, useState } from "react";
import "./RentingBook.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { redirect, useLoaderData, useOutletContext } from "react-router";
import api from "../../api/apiCalls";
import SettingsForm from "../../components/UI/SettingsForm";
import useInput from "../../hooks/useInput";

const isNotEmpty = (value) => value.trim() !== "";

export default function RentingBook() {
  const { setRoute } = useOutletContext();
  let [book, setBook] = useState({
    title: "loading...",
    categories: [{ name: "loading...", surname: "loading..." }],
    authors: [{ name: "loading...", surname: "loading..." }],
    genres: [{ name: "loading...", surname: "loading..." }],
    publisher: { name: "loading..." },
    pDate: "2023",
    description: "loading...",
    language: { name: "loading..." },
    bookbind: { name: "loading..." },
    format: { name: "loading..." },
    isbn: "loading...",
    photo: "",
  });
  const [nameIsValid, setNameIsValid] = useState(false);
  const fetchedData = useLoaderData();

  useEffect(() => {
    setBook(fetchedData);
    setRoute("/books/:id/izdaj");
    // eslint-disable-next-line
  }, []);

  const {
    value: dateValue,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
  } = useInput(isNotEmpty);

  const nameHandler = (value) => {
    setNameIsValid(value);
  };
  let formIsValid = false;

  const submitHandler = (event) => {
    event.preventDefault();
    return null;
  };
  if (nameIsValid && dateIsValid) {
    formIsValid = true;
  }

  const resetHandler = () => {
    redirect((window.location.href = "/books"));
  };

  const dateClasses = dateHasError ? "form-control invalid" : "form-control";
  return (
    <div className="book-container">
      <ProfileTitle
        userInfo={book ? { name: book.title } : { name: "loading..." }}
        linkOne={"Sve knjige"}
        linkOnePath={"/books"}
        linkTwoPath={`/books/`}
        image={book.photo}
        change={true}
        deleteMssg={true}
        booksSpecial={true}
        rentPath={`/books/${fetchedData.id}/izdaj`}
      />
      <div className="bottom-wrapper">
        <div className="rent">
          <h2>Izdaj knjigu</h2>
          <SettingsForm
            select={[
              {
                options: ["Mark Twen", "Pero Peric"],
                input: {
                  label: "Izaberite ucenika koji zaduzuje knjigu",
                  type: "text",
                  name: "name",
                },
                validHandler: nameHandler,
              },
            ]}
            reset={resetHandler}
            submitHandler={(event) => submitHandler(event)}
            formIsValid={formIsValid}
            className="rent"
          />
          <SettingsForm
            input={[
              {
                label: "Datum izdavanja",
                inputClasses: dateClasses,
                type: "date",
                name: "date",
                value: dateValue,
                hasError: dateHasError,
                onChange: dateChangeHandler,
                onBlur: dateBlurHandler,
              },
            ]}
            reset={resetHandler}
            submitHandler={(event) => submitHandler(event)}
            formIsValid={formIsValid}
            className="rent"
          />
        </div>
        <div className="rent">
          <ul>
            <li>
              Na raspolaganju <span> 5 primjeraka </span>
            </li>
            <li>
              Rezervisano <span> 10 primjeraka </span>
            </li>
            <li>
              Izdato <span> 5 primjeraka </span>
            </li>
            <li>
              U prekoračenju <span> 5 primjeraka </span>
            </li>
            <li>
              Ukupna količina <span> 10 primjeraka </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export const BookLoader = async ({ params }) => {
  const id = params.id;
  try {
    const response = await api.get(`/books/${id}`);
    const responseData = response.data.data;
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
