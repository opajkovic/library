import React from "react";
import "./ReservationItem.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import imagee from "../../../assets/profileStudent.jpg";
import { Link } from "react-router-dom";

export default function ReservationItem({reservation}) {
  return (
    <div className="ReservationItem">
      <div className="studentInfo">
        <img src={imagee} alt="student" />
        <Link to={"/students/" + reservation.student.id }>{reservation.student.name + " " + reservation.student.surname}</Link>
      </div>
      <Link to={'/books/'+reservation.knjiga.id} className="book">{reservation.knjiga.title}</Link>
      <div className="date">{reservation.action_date.split(" ")[0]}</div>
      <div className="status">
        <FaCheck />
        <FaTimes />
      </div>
    </div>
  );
}
