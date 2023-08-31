import { useRef } from "react";
import "./ImageUploader.css";
import image from "../../assets/insert.png"

const ImageUploader = () => {
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    console.log("File selected:", selectedFile.name);
  };
  return (
    <div className="custom-file">
      <input
        type="file"
        className="custom-file-input"
        id="customFile"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      <img
        onClick={handleImageClick}
        src={image}
      />
    </div>
  );
};

export default ImageUploader;
