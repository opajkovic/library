import SettingsForm from "../../../components/UI/SettingsForm";
import { useDispatch, useSelector } from "react-redux";
import { resetFormData } from "../../../redux/new-book-data";
import api from "../../../api/apiCalls";
import "./Multimedia.css";
import { useNavigate } from "react-router";

export default function NewBookMultimedia() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newBook = useSelector((state) => state.newBookData);

  const submitHandler = async () => {
    const response = await api.post(`/books/store`, newBook);
    if (response.status === 200) {
      console.log("succssfully posted");
      navigate("/books/new/osnovni-detalji");
      dispatch(resetFormData());
    } else {
      navigate("/books/new/osnovni-detalji");
    }
  };

  const resetHandler = () => {

  };

  return (
    <div className="new-book-multimedia">
      <SettingsForm
        title="Nova knjiga"
        firstLinkName="Knjige"
        path="/books"
        pathDashboard="/dashboard"
        headers={true}
        multimediaImage={true}
        formIsValid={true}
        submit={() => submitHandler()}
        reset={() => resetHandler()}
      />
    </div>
  );
}
