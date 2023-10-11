import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import SettingsForm from "../../components/UI/SettingsForm";
import { createChangeHandler, getInvalidClass } from "../../util/Functions";
import "./EditStudent.css";

const EditStudent = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    jmbg: "",
    email: "",
    username: "",
    surname: ""
  });

  const fetchedData = useLoaderData();
  useEffect(() => {
    setStudentInfo(fetchedData);
  }, []);

  const nameHandler = createChangeHandler("name", setStudentInfo);
  const surnameHandler = createChangeHandler("surname", setStudentInfo);
  const jmbgHandler = createChangeHandler("jmbg", setStudentInfo);
  const emailHandler = createChangeHandler("email", setStudentInfo);
  const usernameHandler = createChangeHandler("username", setStudentInfo);

  const nameClass = getInvalidClass(studentInfo.name);
  const emailClass = getInvalidClass(studentInfo.email);
  const jmbgClass = getInvalidClass(studentInfo.jmbg);
  const usernameClass = getInvalidClass(studentInfo.username);

  let formIsValid = false;
  if (
    nameClass === "form-control" &&
    emailClass === "form-control" &&
    jmbgClass === "form-control" &&
    usernameClass === "form-control"
  ) {
    formIsValid = true;
  }

  const resetHandler = () => {
    setStudentInfo(fetchedData);
  };

  return (
    <SettingsForm
      input={[
        {
          label: "Ime",
          inputClasses: nameClass,
          type: "text",
          name: "name",
          value: studentInfo.name,
          onChange: nameHandler,
        },
        {
          label: "Prezime",
          inputClasses: nameClass,
          type: "text",
          name: "name",
          value: studentInfo.surname,
          onChange: surnameHandler,
        },
        {
          label: "Tip korisnika",
          type: "text",
          name: "type",
          value: "Učenik",
          disabled: true,
        },
        {
          label: "JMBG",
          inputClasses: jmbgClass,
          type: "text",
          name: "jmbg",
          value: studentInfo.jmbg,
          onChange: jmbgHandler,
        },
        {
          label: "Email",
          inputClasses: emailClass,
          type: "email",
          name: "email",
          value: studentInfo.email,
          onChange: emailHandler,
        },
        {
          label: "Korisničko ime",
          inputClasses: usernameClass,
          type: "text",
          name: "username",
          value: studentInfo.username,
          onChange: usernameHandler,
        },
      ]}
      className="edit-student-form"
      title="Izmijeni podatke"
      firstLinkName="Profil učenika"
      path={`/students/${studentInfo.id}`}
      pathDashboard="/dashboard"
      formIsValid={formIsValid}
      reset={() => resetHandler()}
      image={true}
      imagePath={studentInfo.photoPath}
      edit={true}
    />
  );
};
export default EditStudent;
