import { useEffect, useState } from "react";
import SettingsForm from "../../components/UI/SettingsForm";
import "./EditLibrarian.css";
import { useLoaderData } from "react-router";
import { createChangeHandler, getInvalidClass } from "../../util/Functions";

const EditLibrarian = () => {
  const [librarianInfo, setLibrairanInfo] = useState({
    name: "",
    jmbg: "",
    email: "",
    username: "",
  });
  const fetchedData = useLoaderData();

  useEffect(() => {
    setLibrairanInfo(fetchedData);
  }, []);

  const nameHandler = createChangeHandler("name", setLibrairanInfo);
  const jmbgHandler = createChangeHandler("jmbg", setLibrairanInfo);
  const emailHandler = createChangeHandler("email", setLibrairanInfo);
  const usernameHandler = createChangeHandler("username", setLibrairanInfo);

  const nameClass = getInvalidClass(librarianInfo.name);
  const emailClass = getInvalidClass(librarianInfo.email);
  const jmbgClass = getInvalidClass(librarianInfo.jmbg);
  const usernameClass = getInvalidClass(librarianInfo.username);

  let formIsValid = false;
  if (
    nameClass === "form-control" &&
    emailClass === "form-control" &&
    jmbgClass === "form-control" &&
    usernameClass === "form-control"
  ) {
    formIsValid = true;
  }

  const resetHandler = (event) => {
    event.preventDefault();
    setLibrairanInfo(fetchedData);
  };
  return (
    <SettingsForm
      input={[
        {
          label: "Ime i prezime",
          inputClasses: nameClass,
          type: "text",
          name: "name",
          value: librarianInfo.name,
          onChange: nameHandler,
        },
        {
          label: "Tip korisnika",
          type: "text",
          name: "type",
          value: "Bibliotekar",
          disabled: true,
        },
        {
          label: "JMBG",
          inputClasses: jmbgClass,
          type: "text",
          name: "jmbg",
          value: librarianInfo.jmbg,
          onChange: jmbgHandler,
        },
        {
          label: "Email",
          inputClasses: emailClass,
          type: "email",
          name: "email",
          value: librarianInfo.email,
          onChange: emailHandler,
        },
        {
          label: "Korisničko ime",
          inputClasses: usernameClass,
          type: "text",
          name: "username",
          value: librarianInfo.username,
          onChange: usernameHandler,
        },
      ]}
      className="edit-librarian-form"
      title="Izmijeni podatke"
      firstLinkName="Profil bibliotekara"
      path={`/librarians/${librarianInfo.id}`}
      pathDashboard="/dashboard"
      formIsValid={formIsValid}
      reset={resetHandler}
      image={true}
      imagePath={librarianInfo.photoPath}
      edit={true}
    />
  );
};
export default EditLibrarian;

