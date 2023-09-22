import { FaCheck, FaTimes } from "react-icons/fa";
import Button from "../Button";

const FormSubmitButtons = ({ disabled, reset, submit }) => {
  console.log(disabled)
  return (
    <div className="flex-end btn-end">
      <Button btn="btn btn-danger" function={reset}>
        Ponisti {<FaTimes />}
      </Button>
      <Button
        disabled={disabled}
        btn={!disabled ? "btn btn-success" : "btn btn-disabled"}
        function={submit}
        type="submit"
      >
        Sacuvaj {<FaCheck />}
      </Button>
    </div>
  );
};

export default FormSubmitButtons;
