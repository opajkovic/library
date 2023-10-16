import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetFormData } from "../../../redux/new-book-data";
import api from "../../../api/apiCalls";
import SettingsForm from "../../../components/UI/SettingsForm";
import "./Multimedia.css";

export default function NewBookMultimedia() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newBook = useSelector((state) => state.newBookData);

  const submitHandler = async () => {
    try {
      const response = await api.post(`/books/store`, newBook);
      dispatch(resetFormData());
      toast.success("Dodata knjiga");
      navigate("/books");
      return response;
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
      navigate("/books/new/osnovni-detalji");
    }
  };
  const resetHandler = () => {};

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
