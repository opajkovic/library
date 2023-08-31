import "./Titles.css";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

export default function Titles() {
  const params = useParams();

  return (
    <div className="title-bar-wrapper">
      <NavLink
        to={`/books/${params.id}`}
        className={({ isActive }) => {
          return isActive ? "active-page" : undefined;
        }}
        end
      >
        <h1> Osnovni detalji </h1>
      </NavLink>
      <NavLink
        to={`/books/${params.id}/specifikacija`}
        className={({ isActive }) => {
          return isActive ? "active-page" : undefined;
        }}
        end
      >
        <h1> Specifikacija </h1>
      </NavLink>
      <NavLink
        to={`/books/${params.id}/evidencija/evidencija-iznajmljivanja`}
        className={({ isActive }) => {
          return isActive ? "active-page" : undefined;
        }}
        end
      >
        <h1> Evidencija iznajmljivanja </h1>
      </NavLink>
      <NavLink
        to={`/books/${params.id}/multimedija`}
        className={({ isActive }) => {
          return isActive ? "active-page" : undefined;
        }}
        end
      >
        <h1> Multimedija </h1>
      </NavLink>
    </div>
  );
}
