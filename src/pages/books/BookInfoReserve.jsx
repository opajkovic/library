import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { toast } from "react-toastify";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import SettingsForm from "../../components/UI/SettingsForm";
import useInput from "../../hooks/useInput";
import { LoaderStudents } from "../students/Students";
import { filterAndMap } from "../../util/Functions";
import api from "../../api/apiCalls";
import "./BookInfoReserve.css";

const isNotEmpty = (value) => value.trim() !== "";

export default function BookInfoReserve() {
  const [book, setBook] = useState({});
  const fetchedData = useLoaderData();
  const [students, setStudents] = useState();
  const { id } = useParams();

  const fetchStudents = async () => {
    try {
      const students = await LoaderStudents();
      setStudents(students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const [studentSelected, setStudentSelected] = useState({
    value: "",
    label: "",
  });

  const studentChange = (newValue) => {
    setStudentSelected(newValue);
  };

  useEffect(() => {
    fetchStudents();
    setBook(fetchedData);
  }, []);

  const {
    value: reserveValue,
    isValid: reserveIsValid,
    hasError: reserveHasError,
    valueChangeHandler: reserveChangeHandler,
    inputBlurHandler: reserveBlurHandler,
    reset: resetDateHandler,
  } = useInput(isNotEmpty);

  const submitHandler = async () => {
    const studentId = filterAndMap(
      students,
      studentSelected.value.split(" ")[0]
    )[0];
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(date.getDate()).padStart(2, "0");
      return `${month}/${day}/${year}`;
    }

    // Usage
    const currentDate = new Date(); // Get the current date
    const formattedDate = formatDate(currentDate); // Format it as "MM/DD/YYYY"
    const info = {
      student_id: studentId,
      datumRezervisanja: formattedDate,
    };
    try {
      const response = await api.post(`/books/${id}/reserve`, info);
      const responseData = response.data;
      toast.success(responseData.message);
    } catch (error) {
      console.error(error.response);
      toast.error(error.response.data.data.errors);
      throw error;
    }
  };

  const nameIsValid = studentSelected.value !== "";
  let formIsValid = false;
  if (nameIsValid && reserveIsValid) {
    formIsValid = true;
  }

  const resetHandler = () => {
    resetDateHandler();
    setStudentSelected({
      value: "",
      label: "",
    });
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
              options: students,
              label: "Izaberite učenika koji rezerviše knjigu",
              value: studentSelected,
              onChange: studentChange,
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
