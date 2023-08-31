import "./RentingOptions.css";
import { NavLink } from "react-router-dom";
import { BsBook } from "react-icons/bs";

export default function RentingOptions(props) {
  const titles = [
    {
      name: "Izdate Knjige",
      path: props.paths ? props.paths[0] : "/rentingBooks/izdate-knjige",
      image: <BsBook />,
    },
    {
      name: "Vraćene knjige",
      path: props.paths ? props.paths[1] : "/rentingBooks/vracene-knjige",
      image: <BsBook />,
    },
    {
      name: "Otpisane knjige",
      path: props.paths ? props.paths[2] : "/rentingBooks/otpisane-knjige",
      image: <BsBook />,
    },
    {
      name: "Knjige u prekoračenju",
      path: props.paths
        ? props.paths[3]
        : "/rentingBooks/knjige-u-prekoracenju",
      image: <BsBook />,
    },
    {
      name: "Aktivne rezervacije",
      path: props.paths ? props.paths[4] : "/rentingBooks/aktivne-rezervacije",
      image: <BsBook />,
    },
    {
      name: "Arhivirane rezervacije",
      path: props.paths
        ? props.paths[5]
        : "/rentingBooks/arhivirane-rezervacije",
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
