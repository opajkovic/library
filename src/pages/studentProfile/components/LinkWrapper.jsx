import "../studentProfile.css";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

export default function LinkWrapper() {
  const params = useParams();

  return (
    <div className="link-wrapper">
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
        to={`/students/${params.id}/evidencija`}
        className={({ isActive }) => {
          return isActive ? "active-header" : undefined;
        }}
        end
      >
        <h1> Evidencija iznajmljivanja </h1>
      </NavLink>
    </div>
  );
}
