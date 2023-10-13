import { useRef } from "react";
import image from "../../assets/insert.png";
import "./ImageUploader.css";


const ImageUploader = (props) => {
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    console.log("File selected:", selectedFile.name);
  };
  return (
    <div className={props.className ? props.className : "custom-file"}>
      {!props.imagePath && <label>{props.label}</label>}
      <img
        onClick={handleImageClick}
        src={props.imagePath ? props.imagePath : image}
      />
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} />
    </div>
  );
};

export default ImageUploader;
