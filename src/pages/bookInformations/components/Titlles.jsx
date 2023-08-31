import "./Titles.css"
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

export default function Titles() {
  const params = useParams();

  const isActive = window.location.pathname.includes(
    `/students/${params.id}/evidencija`
  );

  return (
    <div className="title-bar-wrapper">
      <NavLink
        to={`/students/${params.id}`}
        className={({ isActive }) => {
          return isActive ? "active-header" : undefined;
        }}
        end
      >
        <h1> Osnovni detalji </h1>
      </NavLink>
      <NavLink
        to={`/students/${params.id}/evidencija/izdate-knjige`}
        className={isActive ? "active-header" : undefined}
        end
      >
        <h1> Specifikacija </h1>
      </NavLink>
      <NavLink
        to={`/students/${params.id}/evidencija/izdate-knjige`}
        className={isActive ? "active-header" : undefined}
        end
      >
        <h1> Evidencija iznajmljivanja </h1>
      </NavLink>
      <NavLink
        to={`/students/${params.id}/evidencija/izdate-knjige`}
        className={isActive ? "active-header" : undefined}
        end
      >
        <h1> Multimedija </h1>
      </NavLink>
    </div>
  );
}
