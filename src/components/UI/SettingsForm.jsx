import FormSubmitButtons from "./settingsForm components/FormSubmitButtons";
import FormTitle from "./settingsForm components/FormTitle";
import Input from "./Input";
import Textarea from "./Textarea";
import "./settingsForm.css";
import ImageUploader from "./ImageUploader";
import RichTextarea from "./RichTextarea";
import InputSelect from "./InputSelect";
import SecondRowHeaders from "./settingsForm components/SecondRowHeaders";

const SettingsForm = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    props.submit();
  };

  return (
    <>
      {props.title && (
        <FormTitle
          title={props.title}
          firstLinkName={props.firstLinkName}
          path={props.path}
          pathDashboard={props.pathDashboard}
          edit={props.edit}
        />
      )}

      {props.headers && (
        <SecondRowHeaders
          editHeaders={props.editHeaders}
          nextLevel={props.nextLevel}
          secondLevel={props.secondLevel}
        />
      )}

      <form
        onSubmit={submitHandler}
        className={`form-wrapper ${props.className}`}
      >
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
          <ImageUploader
            label="Dodaj ikonicu"
            className="form-image-input"
            imagePath={props.imagePath}
          />
        )}

        {props.multimediaImage && (
          <ImageUploader className="multimedia-image" />
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
            <InputSelect key={index} select={item} sup={true} />
          ))}

        <FormSubmitButtons
          disabled={!props.formIsValid}
          // submit={props.submit}
          reset={props.reset}
          dangerText={'Ponisti'}
          succesText={'Sacuvaj'}
        />
      </form>
    </>
  );
};
export default SettingsForm;
