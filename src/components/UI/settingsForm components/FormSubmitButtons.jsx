import { FaCheck, FaTimes } from "react-icons/fa";
import Button from "../Button";

const FormSubmitButtons = ({ disabled, reset }) => {
  return (
    <div className="flex-end btn-end">
      <Button
        btn="btn btn-danger"
        onClick={reset}
      >
        Ponisti {<FaTimes />}
      </Button>
      <Button
        disabled={disabled}
        btn={!disabled ? "btn btn-success" : "btn btn-disabled  "}
      >
        Sacuvaj {<FaCheck />}
      </Button>
    </div>
  );
};

export default FormSubmitButtons;
