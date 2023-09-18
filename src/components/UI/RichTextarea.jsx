import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./RichTextarea.css";

function RichTextarea(props) {
  const { label, value, reset, valueUpdate } = props.richTextarea;
  const [editorData, setEditorData] = useState("");

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
    if(valueUpdate){
      valueUpdate(data)
    }
  };

  useEffect(() => {
    setEditorData(value);
  }, [reset]);

  useEffect(() => {
    setEditorData(value);
  }, [value]);

  return (
      <div className="textarea-container">
        <label>{label}</label>
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          onChange={handleEditorChange}
        />
      </div>
  );
}

export default RichTextarea;
