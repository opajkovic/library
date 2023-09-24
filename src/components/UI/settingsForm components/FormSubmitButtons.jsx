import { FaCheck, FaTimes } from "react-icons/fa";
import Button from "../Button";

const FormSubmitButtons = ({ disabled, reset, submit, succesText, dangerText }) => {
  return (
    <div className="flex-end btn-end">
      <Button btn="btn btn-danger" function={reset}>
        {dangerText} {<FaTimes />}
      </Button>
      <Button
        disabled={disabled}
        btn={!disabled ? "btn btn-success" : "btn btn-disabled"}
        function={submit}
        type="submit"
      >
        {succesText} {<FaCheck />}
      </Button>
    </div>
  );
};

export default FormSubmitButtons;
