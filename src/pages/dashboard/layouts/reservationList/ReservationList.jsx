import React from "react";
import "./ReservationList.css";
import ReservationItem from "../../components/ReservationItem";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ReservationList({reservations}) {
  return (
    <div className="reservationList">
      <h2 className="subTitle">Rezervacije knjiga</h2>
      <div className="list">
        {reservations.map((reservation, i) => {
          return<ReservationItem key={i} reservation={reservation} />
        })}
      </div>
      <div>
        <div className="showAll">
          <FaCalendarAlt />
          <Link to="/rentingBooks/aktivne-rezervacije">Prikazi sve</Link>
        </div>
      </div>
    </div>
  );
}
