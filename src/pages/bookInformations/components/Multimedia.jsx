import "./Multimedia.css";

export default function Multimedia({ photos }) {
  return (
    <ul className="multimedia-wrapper">
      {photos.map((photo, i) => {
        return (
          <li key={i}>
            <img src={photo} />
          </li>
        );
      })}
    </ul>
  );
}
