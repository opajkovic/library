import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { toast } from "react-toastify";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import SettingsForm from "../../components/UI/SettingsForm";
import useInput from "../../hooks/useInput";
import RightSide from "../bookInformations/components/RightSide";
import { LoaderStudents } from "../students/Students";
import { filterAndMap } from "../../util/Functions";
import api from "../../api/apiCalls";
import "./BookInfoRentingBook.css";

const isNotEmpty = (value) => value.trim() !== "";

export default function BookInfoRentingBook() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const fetchedData = useLoaderData();
  const [students, setStudents] = useState();

  const fetchStudents = async () => {
    try {
      const students = await LoaderStudents();
      setStudents(students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    setBook(fetchedData);
  }, []);

  const {
    value: rentingValue,
    isValid: rentingIsValid,
    hasError: rentingHasError,
    valueChangeHandler: rentingChangeHandler,
    inputBlurHandler: rentingBlurHandler,
    reset: resetRentingValue
  } = useInput(isNotEmpty);

  const {
    value: returnValue,
    isValid: returnIsValid,
    hasError: returnHasError,
    valueChangeHandler: returnChangeHandler,
    inputBlurHandler: returnBlurHandler,
    reset:resetReturnValue
  } = useInput(isNotEmpty);

  const [studentSelected, setStudentSelected] = useState({
    value: "",
    label: "",
  });

  const studentChange = (newValue) => {
    setStudentSelected(newValue);
  };

  const submitHandler = async () => {
    const studentId = filterAndMap(students, studentSelected.value.split(" ")[0])[0];
    const info = {
      student_id: studentId,
      datumIzdavanja: rentingValue,
      datumVracanja: returnValue,
    };
    try {
      const response = await api.post(`/books/${id}/izdaj`, info);
      const responseData = response.data;
      toast.success(responseData.message);
    } catch (error) {
      toast.error(error.response.data.data.errors);
      throw error;
    }
    return null;
  };

  const nameIsValid = studentSelected.value !== "";
  let formIsValid = false;
  if (nameIsValid && returnIsValid && rentingIsValid) {
    formIsValid = true;
  }

  const resetHandler = () => {
    resetRentingValue();
    resetReturnValue();
    setStudentSelected({
      value: "",
      label: "",
    });
  };

  const rentingClasses = rentingHasError
    ? "form-control invalid"
    : "form-control";
  const returnClasses = returnHasError
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
      <div className="renting-table-wrapper">
        <div className="rent">
          <h1>Izdaj knjigu</h1>
          <SettingsForm
            select={[
              {
                options: students,
                label: "Izaberite učenika koji zadužuje knjigu",
                value: studentSelected,
                onChange: studentChange,
              },
            ]}
            input={[
              {
                label: "Datum vraćanja",
                inputClasses: returnClasses,
                type: "date",
                name: "date",
                value: returnValue,
                hasError: returnHasError,
                onChange: returnChangeHandler,
                onBlur: returnBlurHandler,
              },
              {
                label: "Datum izdavanja",
                inputClasses: rentingClasses,
                type: "date",
                name: "date",
                value: rentingValue,
                hasError: rentingHasError,
                onChange: rentingChangeHandler,
                onBlur: rentingBlurHandler,
              },
            ]}
            submit={() => submitHandler()}
            reset={() => resetHandler()}
            formIsValid={formIsValid}
            className="edit-renting-book"
          />
        </div>
        <RightSide bookInfo={book} hide={true} />
      </div>
    </>
  );
}
