import "./RentingOptions.css";
import { NavLink } from "react-router-dom";
import {
  FaCopy,
  FaFile,
  FaExclamationTriangle,
  FaCalendarCheck,
  FaCalendarAlt,
  FaBan,
} from "react-icons/fa";

export default function RentingOptions(props) {
  const titles = [
    {
      name: "Izdate Knjige",
      path: props.paths ? props.paths[0] : "/rentingBooks/izdate-knjige",
      image: <FaCopy />,
    },
    {
      name: "Vraćene knjige",
      path: props.paths ? props.paths[1] : "/rentingBooks/vracene-knjige",
      image: <FaFile />,
    },
    {
      name: "Otpisane knjige",
      path: props.paths ? props.paths[2] : "/rentingBooks/otpisane-knjige",
      image: <FaBan />,
    },
    {
      name: "Knjige u prekoračenju",
      path: props.paths
        ? props.paths[3]
        : "/rentingBooks/knjige-u-prekoracenju",
      image: <FaExclamationTriangle />,
    },
    {
      name: "Aktivne rezervacije",
      path: props.paths ? props.paths[4] : "/rentingBooks/aktivne-rezervacije",
      image: <FaCalendarCheck />,
    },
    {
      name: "Arhivirane rezervacije",
      path: props.paths
        ? props.paths[5]
        : "/rentingBooks/arhivirane-rezervacije",
      image: <FaCalendarAlt />,
    },
  ];

  return (
    <div>
      <ul className="options-list">
        {titles.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) => {
              return isActive ? "active-link" : undefined;
            }}
            end
          >
            <li>
              {item.image}
              {item.name}
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
