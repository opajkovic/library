import React from "react";
import "./ReservationList.css";
import ReservationItem from "../../components/ReservationItem";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ReservationList() {
  return (
    <div className="reservationList">
      <h2 className="subTitle">Rezervacije knjiga</h2>
      <div className="list">
        <ReservationItem />
        <ReservationItem />
        <ReservationItem />
        <ReservationItem />
      </div>
      <div>
        <div className="showAll">
          <FaCalendarAlt />
          <Link to="/rentingBooks">Prikazi sve</Link>
        </div>
      </div>
    </div>
  );
}
