import { NavLink, useParams } from "react-router-dom";
import "./Titles.css";

export default function Titles() {
  const params = useParams();

  const navLinks = [
    { to: `/books/${params.id}`, label: "Osnovni detalji" },
    { to: `/books/${params.id}/specifikacija`, label: "Specifikacija" },
    {
      to: `/books/${params.id}/evidencija/izdate-knjige`,
      label: "Evidencija iznajmljivanja",
      className: location.pathname.includes(`/books/${params.id}/evidencija/`)
        ? "active-evidence-link"
        : undefined,
    },
    { to: `/books/${params.id}/multimedija`, label: "Multimedija" },
  ];

  return (
    <div className="title-bar-wrapper">
      {navLinks.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={
            item.className
              ? item.className
              : ({ isActive }) => (isActive ? "active-page" : undefined)
          }
          end
        >
          <h1>{item.label}</h1>
        </NavLink>
      ))}
    </div>
  );
}
