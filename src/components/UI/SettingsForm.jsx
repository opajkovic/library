import FormSubmitButtons from "./settingsForm components/FormSubmitButtons";
import FormTitle from "./settingsForm components/FormTitle";
import Input from "./Input";
import Textarea from "./Textarea";
import "./settingsForm.css";
import ImageUploader from "./ImageUploader";
import RichTextarea from "./RichTextarea";
import InputSelect from "./InputSelect";

const SettingsForm = (props) => {

  return (
    <div>
      <FormTitle
        title={props.title}
        firstLinkName={props.firstLinkName}
        path={props.path}
        pathDashboard={props.pathDashboard}
      />
      <form onSubmit={props.submitHandler} className="form-wrapper">
        {props.input &&
          props.input.map((item, index) => (
            <Input
              key={index}
              input={item}
              className="input-wrapper"
              sup={true}
            />
          ))}

        {props.image && (
          <ImageUploader label="Dodaj ikonicu" className="form-image-input" />
        )}

        {props.textarea &&
          props.textarea.map((item, index) => (
            <Textarea
              key={index}
              textarea={item}
              className="textarea-wrapper"
              sup={true}
            />
          ))}

        {props.richTextarea && (
          <RichTextarea richTextarea={props.richTextarea} />
        )}

        {props.select &&
          props.select.map((item, index) => (
            <InputSelect key={index} select={item} sup={true}/>
          ))}

        <FormSubmitButtons disabled={!props.formIsValid} reset={props.reset} />
      </form>
    </div>
  );
};
export default SettingsForm;
