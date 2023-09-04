import FormSubmitButtons from "./settingsForm components/FormSubmitButtons";
import FormTitle from "./settingsForm components/FormTitle";
import Input from "./Input";

const SettingsForm = (props) => {
  console.log(props.formIsValid);
  return (
    <>
      <FormTitle
        title={props.title}
        firstLinkName={props.firstLinkName}
        path={props.path}
      />
      <form onSubmit={props.submitHandler} className="flex-between new-form">
        <div className="flex-column">
          <div className={props.classes}>
            <Input
              input={props.input}
            />
          </div>
        </div>
        <FormSubmitButtons disabled={!props.formIsValid} reset={props.reset} />
      </form>
    </>
  );
};
export default SettingsForm;
