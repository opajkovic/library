import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import photo from "../../../assets/profileStudent.jpg";
import "./ActivityItem.css";

export default function ActivityItem({ data }) {
  const [daysAgo, setDaysAgo] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const dayArraow = new Date(data.borrow_date);
    const timeDifference = currentDate - dayArraow;
    const daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
    setDaysAgo(daysDifference);
  }, []);

  return (
    <div className="activity-item">
      <div className="img">
        <img src={photo} alt="Student" />
      </div>
      <div className="info">
        <p className="title">IZDAVANJE KNJIGE - {daysAgo} days ago</p>
        <p className="details">
          <Link to={`/librarians/2`} className="librarian-name">
            {data.bibliotekar0.name + " " + data.bibliotekar0.surname}
          </Link>
          je izdala knjigu
          <Link to={`/books/${data.knjiga.id}`}>
            <b> {data.knjiga.title} </b>
          </Link>
          uceniku
          <Link to={`/students/${data.student.id}`} className="student-name">
            {" " + data.student.name + " " + data.student.surname}
          </Link>
          dana <b>{data.borrow_date + " "}</b>
          <Link to={`/books/${data.knjiga.id}`} className="show-details">
            pogledaj detaljnije {">>"}
          </Link>
        </p>
      </div>
    </div>
  );
}
