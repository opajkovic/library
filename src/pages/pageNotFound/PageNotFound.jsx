import { NavLink } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound() {
  return (
    <div className="notFound">
      <h1 className="mainText">OOPS!</h1>
      <p className="subText">404 - PAGE NOT FOUND</p>
      <NavLink to="/">
        <button className="homeBtn">GO TO HOMEPAGE</button>
      </NavLink>
    </div>
  );
}
