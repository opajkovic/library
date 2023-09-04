import { Link } from "react-router-dom";

const FormTitle = (props) => {
  return (
    <div className="new-item">
      <div>
        <h1 className="new-title">{props.title}</h1>
        <div className="new-subtitle">
          <Link to={"/settings"}>Settings</Link>
          <span>/</span>
          <Link to={props.path}>{props.firstLinkName}</Link>
          <span>/</span>
          <Link to={`${props.path}/new`}>{props.title}</Link>
        </div>
      </div>
    </div>
  );
};
export default FormTitle;
