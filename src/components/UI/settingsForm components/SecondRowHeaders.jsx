import "./SecondRowHeaders.css";
import { NavLink } from "react-router-dom";

export default function SecondRowHeaders({
  editHeaders,
  nextLevel,
  secondLevel,
}) {
  const navLinks = [
    {
      to: editHeaders ? editHeaders[0].details : "/books/new/osnovni-detalji",
      label: "Osnovni detalji",
      nextLevel: true,
      secondLevel: true
    },
    {
      to: editHeaders
        ? editHeaders[0].specification
        : `/books/new/specifikacija`,
      label: "Specifikacija",
      nextLevel: nextLevel,
      secondLevel: true
    },
    {
      to: editHeaders ? editHeaders[0].multimedia : `/books/new/multimedija`,
      label: "Multimedija",
      secondLevel: secondLevel,
      nextLevel: true
    },
  ];

  return (
    <div className="second-headers-wrapper">
      {navLinks.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) =>
            isActive
              ? "active-secondary-header"
              : !item.nextLevel && item.nextLevel !== undefined
              ? "secondary-disabled"
              : !item.secondLevel
              ? "secondary-disabled"
              : ""
          }
          end
        >
          <h1>{item.label}</h1>
        </NavLink>
      ))}
    </div>
  );
}
