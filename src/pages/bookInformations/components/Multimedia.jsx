import ImageUploader from "../../../components/UI/ImageUploader";
import "./Multimedia.css";

export default function Multimedia({ photos }) {
  return (
    <>
      <h1 className="insert-image"> Insert image </h1>
      <ImageUploader />
      <ul className="multimedia-wrapper">
        {photos.map((photo, i) => {
          return (
            <li key={i}>
              <img src={photo} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
