import { useEffect, useState } from "react";
import "./BookInfoRentingBook.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { redirect, useLoaderData, useOutletContext, useParams } from "react-router";
import SettingsForm from "../../components/UI/SettingsForm";
import useInput from "../../hooks/useInput";
import RightSide from "../bookInformations/components/RightSide";
import { LoaderStudents } from "../students/Students";
import { filterAndMap } from "../../util/Functions";
import api from "../../api/apiCalls";
import { toast } from "react-toastify";

const isNotEmpty = (value) => value.trim() !== "";

export default function BookInfoRentingBook() {
  const {id} = useParams();
  const { setRoute } = useOutletContext();
  const [book, setBook] = useState({});
  const [nameIsValid, setNameIsValid] = useState(false);
  const fetchedData = useLoaderData();
  let [students, setStudents] = useState()

  async function fetchStudents() {
    try {
      const students = await LoaderStudents();
      setStudents(students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }
  useEffect(() => {
    fetchStudents()
    setBook(fetchedData);
    setRoute("/books/:id/izdaj-knjigu");
    // eslint-disable-next-line

  }, []);

  const {
    value: rentingValue,
    isValid: rentingIsValid,
    hasError: rentingHasError,
    valueChangeHandler: rentingChangeHandler,
    inputBlurHandler: rentingBlurHandler,
  } = useInput(isNotEmpty);
  
  const {
    value: returnValue,
    isValid: returnIsValid,
    hasError: returnHasError,
    valueChangeHandler: returnChangeHandler,
    inputBlurHandler: returnBlurHandler,
  } = useInput(isNotEmpty);

  const [studentSelected, setStudentSelected] = useState("");
  const studentChange = (newValue) => {
    setStudentSelected(newValue);
  };
  const nameHandler = (value) => {
    if(students && filterAndMap(students, studentSelected)){
      setNameIsValid(value);
    }else{
      setNameIsValid(false);
    }
  };

  const submitHandler = async() => {
    let studentId = filterAndMap(students, studentSelected)[0]
    let info = {
      student_id: studentId,
      datumIzdavanja: rentingValue,
      datumVracanja: returnValue
    }
    try {
      const response = await api.post(`/books/${id}/izdaj`, info);
      const responseData = response.data;
      toast.success(responseData.message);
    } catch (error) {
      toast.error(error.response.data.data.errors)
      throw error;
    }
    return null;
  }

  let formIsValid = false;
  if (nameIsValid && returnIsValid && rentingIsValid) {
    formIsValid = true;
  }

  const resetHandler = () => {
    window.location.href = `/books/${book.id}/izdaj-knjigu`;
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
                input: {
                  label: "Izaberite učenika koji zadužuje knjigu",
                  type: "text",
                  name: "name",
                  value: studentSelected,
                  onChange: studentChange 
                },
                validHandler: nameHandler,
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
                onBlur: returnBlurHandler
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
