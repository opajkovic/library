import { NavLink, useParams} from "react-router-dom";
import {
  FaCopy,
  FaFile,
  FaExclamationTriangle,
  FaCalendarCheck,
  FaCalendarAlt,
} from "react-icons/fa";
import Table from "../../../components/UI/Table";
import "./EvidenceTable.css";

export default function EvidenceTable({ headers, data }) {
  const params = useParams();

  const titles = [
    {
      name: "Izdate Knjige",
      path: `/books/${params.id}/evidencija/izdate-knjige`,
      image: <FaCopy />,
    },
    {
      name: "Vraćene knjige",
      path: `/books/${params.id}/evidencija/vracene-knjige`,
      image: <FaFile />,
    },
    {
      name: "Knjige u prekoračenju",
      path: `/books/${params.id}/evidencija/knjige-u-prekoracenju`,
      image: <FaExclamationTriangle />,
    },
    {
      name: "Aktivne rezervacije",
      path: `/books/${params.id}/evidencija/aktivne-rezervacije`,
      image: <FaCalendarCheck />,
    },
    {
      name: "Arhivirane rezervacije",
      path: `/books/${params.id}/evidencija/arhivirane-rezervacije`,
      image: <FaCalendarAlt />,
    },
  ];

  return (
    <div>
      <ul className="evidence-list">
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
              <span>{item.name}</span>
            </li>
          </NavLink>
        ))}
      </ul>
      <div className="page-wrapper">
        <Table headers={headers} tableData={data} />
      </div>
    </div>
  );
}
