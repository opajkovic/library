import FormSubmitButtons from "./settingsForm components/FormSubmitButtons";
import FormTitle from "./settingsForm components/FormTitle";
import Input from "./Input";
import "./settingsForm.css";

const SettingsForm = (props) => {
  return (
    <div>
      <FormTitle
        title={props.title}
        firstLinkName={props.firstLinkName}
        path={props.path}
      />
      <form onSubmit={props.submitHandler} className="form-wrapper">
        <Input input={props.input} className="input-wrapper" sup={true}/>

        <FormSubmitButtons disabled={!props.formIsValid} reset={props.reset} />
      </form>
    </div>
  );
};
export default SettingsForm;
