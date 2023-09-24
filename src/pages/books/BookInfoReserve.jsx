import { useEffect, useState } from "react";
import "./BookInfoReserve.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { redirect, useLoaderData, useParams } from "react-router";
import SettingsForm from "../../components/UI/SettingsForm";
import useInput from "../../hooks/useInput";
import { LoaderStudents } from "../students/Students";
import { filterAndMap } from "../../util/Functions";
import { toast } from "react-toastify";
import api from "../../api/apiCalls";

const isNotEmpty = (value) => value.trim() !== "";

export default function BookInfoReserve() {
  const [book, setBook] = useState({});
  const [nameIsValid, setNameIsValid] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const fetchedData = useLoaderData();
  let [students, setStudents] = useState()
  const {id} = useParams()

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
  }, []);

  const {
    value: reserveValue,
    isValid: reserveIsValid,
    hasError: reserveHasError,
    valueChangeHandler: reserveChangeHandler,
    inputBlurHandler: reserveBlurHandler,
  } = useInput(isNotEmpty);

  const nameHandler = (value) => {
    if(students && filterAndMap(students, selectedStudent)){
      setNameIsValid(value);
    }else{
      setNameIsValid(false);
    }
  };

  const submitHandler = async() => {
    let studentId = filterAndMap(students, selectedStudent)[0]
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
    
      return `${month}/${day}/${year}`;
    }
    
    // Usage
    const currentDate = new Date(); // Get the current date
    const formattedDate = formatDate(currentDate); // Format it as "MM/DD/YYYY"
    let info = {
      student_id: studentId,
      datumRezervisanja: formattedDate
  }
    try {
      const response = await api.post(`/books/${id}/reserve`, info);
      const responseData = response.data;
      toast.success(responseData.message);
    } catch (error) {
      console.log(error.response)
      toast.error(error.response.data.data.errors)
      throw error;
    }
    
    // return null;
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
              options: students,
              input: {
                label: "Izaberite učenika koji rezerviše knjigu",
                type: "text",
                name: "name",
                value: selectedStudent,
                onChange: (newValue)=>{setSelectedStudent(newValue)}
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
