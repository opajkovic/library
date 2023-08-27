import React from "react";
import "./ReservationItem.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import imagee from "../../../assets/profileStudent.jpg";
import { Link } from "react-router-dom";

export default function ReservationItem() {
  return (
    <div className="ReservationItem">
      <div className="studentInfo">
        <img src={imagee} alt="student" />
        <Link to="/students/1">Pero Perovic</Link>
      </div>
      <Link className="book">Ep o Gilgamesu</Link>
      <div className="date">05.11.2023</div>
      <div className="status">
        <FaCheck />
        <FaTimes />
      </div>
    </div>
  );
}
