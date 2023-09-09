import React from "react";
import "./activitiItem.css";
import { Link } from "react-router-dom";
import photo from "../../../assets/profileStudent.jpg";

export default function ActivitiItem() {
  return (
    <div className="activitiItem">
      <div className="img">
        <img src={photo} alt="Student" />
      </div>
      <div className="info">
        <p className="title">IZDAVANJE KNJIGE - 4 days ago</p>
        <p className="details">
          <Link to={`/librarians/2`} className="librarianName">
            Valentina K.
          </Link>
          je izdala knjigu <b>Tom Sojer </b>
          <Link to={`/students/2`} className="studentName">
            Peru Perovic 
          </Link>
           dana <b>21.02.2023. </b>
          <Link to={"/rentedBooks/2"} className="showDetails">
            pogledaj detaljnije {">>"}
          </Link>
        </p>
      </div>
    </div>
  );
}
