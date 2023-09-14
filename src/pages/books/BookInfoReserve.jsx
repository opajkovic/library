import { useEffect, useState } from "react";
import "./BookInfoReserve.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { redirect, useLoaderData } from "react-router";
import SettingsForm from "../../components/UI/SettingsForm";
import useInput from "../../hooks/useInput";

const isNotEmpty = (value) => value.trim() !== "";

export default function BookInfoReserve() {
  const [book, setBook] = useState({});
  const [nameIsValid, setNameIsValid] = useState(false);
  const fetchedData = useLoaderData();

  useEffect(() => {
    setBook(fetchedData);
  }, []);

  const {
    value: reserveValue,
    isValid: reserveIsValid,
    hasError: reserveHasError,
    valueChangeHandler: reserveChangeHandler,
    inputBlurHandler: reserveBlurHandler,
  } = useInput(isNotEmpty);

  const nameHandler = (value) => {
    setNameIsValid(value);
  };

  const submitHandler = () => {
    return null;
  }

  let formIsValid = false;
  if (nameIsValid && reserveIsValid) {
    formIsValid = true;
  }

  const resetHandler = () => {
    window.location.href = `/books/${book.id}/rezervisi-knjigu`;
  };

  const reserveClasses = reserveHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <>
      <ProfileTitle
        userInfo={book ? { name: book.title } : { name: "loading..." }}
        linkOne={"Sve knjige"}
        linkOnePath={"/books"}
        linkTwoPath={`/books/`}
        image={book.photo}
        change={true}
        deleteMssg={true}
        booksSpecial={true}
      />
      <div className="reserve-table-wrapper">
        <h1>Rezerviši knjigu</h1>
        <SettingsForm
          input={[
            {
              label: "Datum reservisanja",
              inputClasses: reserveClasses,
              type: "date",
              name: "date",
              value: reserveValue,
              hasError: reserveHasError,
              onChange: reserveChangeHandler,
              onBlur: reserveBlurHandler,
            },
          ]}
          select={[
            {
              options: [{ name: "Mark Twen" }, { name: "Pero Peric" }],
              input: {
                label: "Izaberite učenika koji rezerviše knjigu",
                type: "text",
                name: "name",
                value: ""
              },
              validHandler: nameHandler,
            },
          ]}
          submit={() => submitHandler()}
          reset={() => resetHandler()}
          formIsValid={formIsValid}
          className="edit-reserve-book"
        />
      </div>
    </>
  );
}
