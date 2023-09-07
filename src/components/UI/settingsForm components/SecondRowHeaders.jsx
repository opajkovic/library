import "./SecondRowHeaders.css";
import { NavLink } from "react-router-dom";

export default function SecondRowHeaders({ editHeaders }) {

  const navLinks = [
    {
      to: editHeaders ? editHeaders[0].details : "/books/new/osnovni-detalji",
      label: "Osnovni detalji",
    },
    {
      to: editHeaders ? editHeaders[0].specification : `/books/new/specifikacija`,
      label: "Specifikacija",
    },
    {
      to: editHeaders ? editHeaders[0].multimedia : `/books/new/multimedija`,
      label: "Multimedija",
    },
  ];

  return (
    <div className="second-headers-wrapper">
      {navLinks.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) =>
            isActive ? "active-secondary-header" : undefined
          }
          end
        >
          <h1>{item.label}</h1>
        </NavLink>
      ))}
    </div>
  );
}
