import "./FormTitle.css";
import { Link, NavLink } from "react-router-dom";

const FormTitle = (props) => {
  return (
    <div className="form-title-wrapper">
      <h1 className="new-title">{props.title}</h1>
      <div className="new-subtitle">
        {props.pathDashboard ? (
          <Link to={"/dashboard"}>Dashboard</Link>
        ) : (
          <Link to={"/settings"}>Settings</Link>
        )}
        <span>/</span>
        <Link to={props.path}>{props.firstLinkName}</Link>
        <span>/</span>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "active-title" : undefined;
          }}
          to={props.edit ? `${props.path}/edit` : `${props.path}/new`}
        >
          {props.title}
        </NavLink>
      </div>
    </div>
  );
};
export default FormTitle;
