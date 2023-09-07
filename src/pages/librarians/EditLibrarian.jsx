import { useEffect, useState } from "react";
import SettingsForm from "../../components/UI/SettingsForm";
import "./EditLibrarian.css";
import { useLoaderData } from "react-router";
import { createChangeHandler } from "../../util/Functions";

const EditLibrarian = () => {
  const [librarianInfo, setLibrairanInfo] = useState();
  const fetchedData = useLoaderData();
  console.log(fetchedData);

  //   let formIsValid = false;
  //   if (imePrezimeIsValid && jmbgIsValid && emailIsValid && usernameIsValid) {
  //     formIsValid = true;
  //   }

  useEffect(() => {
    setLibrairanInfo(fetchedData);
  }, []);

  const nameHandler = createChangeHandler("name", setLibrairanInfo);
  const jmbgHandler = createChangeHandler("jmbg", setLibrairanInfo);
  const emailHandler = createChangeHandler("email", setLibrairanInfo);
  const usernameHandler = createChangeHandler("username", setLibrairanInfo);

  return (
    librarianInfo !== undefined && (
      <SettingsForm
        input={[
          {
            label: "Ime i prezime",
            //   inputClasses: imePrezimeHasError
            //     ? "form-control invalid"
            //     : "form-control",
            type: "text",
            name: "name",
            value: librarianInfo.name,
            //   hasError: imePrezimeHasError,
            onChange: nameHandler,
            //   onBlur: imePrezimeBlurHandler,
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
            //   inputClasses: jmbgHasError ? "form-control invalid" : "form-control",
            type: "text",
            name: "jmbg",
            value: librarianInfo.jmbg,
            //   hasError: jmbgHasError,
            onChange: jmbgHandler,
            //   onBlur: jmbgBlurHandler,
          },
          {
            label: "Email",
            //   inputClasses: emailHasError ? "form-control invalid" : "form-control",
            type: "email",
            name: "email",
            value: librarianInfo.email,
            //   hasError: emailHasError,
            onChange: emailHandler,
            //   onBlur: emailBlurHandler,
          },
          {
            label: "Korisničko ime",
            //   inputClasses: usernameHasError
            //     ? "form-control invalid"
            //     : "form-control",
            type: "text",
            name: "username",
            value: librarianInfo.username,
            //   hasError: usernameHasError,
            onChange: usernameHandler,
            //   onBlur: usernameBlurHandler,
          },
        ]}
        className="edit-librarian-form"
        title="Izmijeni podatke"
        firstLinkName="Bibliotekari"
        path="/librarians"
        pathDashboard="/dashboard"
        //   formIsValid={formIsValid}
        //   reset={resetHandler}
        //   submitHandler={submitHandler}
        image={true}
        //   handleImageUpload={(image) => setLibrarianImage(image)}
        edit={true}
      />
    )
  );
};
export default EditLibrarian;

export const LibrarianProfileLoader = async ({ params }) => {
  const id = params.id;
  try {
    const response = await api.get(`/users/${id}`);
    const responseData = response.data.data;

    if (responseData.role == "Bibliotekar") {
      return responseData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
