import "./RentingOptions.css";
import { NavLink } from "react-router-dom";
import { BsBook } from "react-icons/bs";

export default function RentingOptions() {
  const titles = [
    {
      name: "Izdate Knjige",
      path: "/rentingBooks/izdate-knjige",
      image: <BsBook />,
    },
    {
      name: "Vraćene knjige",
      path: "/rentingBooks/vracene-knjige",
      image: <BsBook />,
    },
    {
      name: "Otpisane knjige",
      path: "/rentingBooks/otpisane-knjige",
      image: <BsBook />,
    },
    {
      name: "Knjige u prekoračenju",
      path: "/rentingBooks/knjige-u-prekoracenju",
      image: <BsBook />,
    },
    {
      name: "Aktivne rezervacije",
      path: "/rentingBooks/aktivne-rezervacije",
      image: <BsBook />,
    },
    {
      name: "Arhivirane rezervacije",
      path: "/rentingBooks/arhivirane-rezervacije",
      image: <BsBook />,
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
