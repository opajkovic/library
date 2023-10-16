import "./Multimedia.css";

export default function Multimedia({ photos }) {
  return (
    <ul className="multimedia-wrapper">
      {photos.map((photo, index) => {
        return (
          <li key={index}>
            <img src={photo} />
          </li>
        );
      })}
    </ul>
  );
}
