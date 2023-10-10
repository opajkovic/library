import React from "react";
import "./ReservationItem.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import imagee from "../../../assets/profileStudent.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../api/apiCalls";

export default function ReservationItem({ reservation }) {
  // Function to format date as "mm/dd/yyyy"
  function formatDate(date) {
    let month = date.getMonth() + 1; // Months are zero-based
    let day = date.getDate();
    let year = date.getFullYear();

    // Add leading zeros if necessary
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return `${month}/${day}/${year}`;
  }
  let borrowBook = async (e) => {
    // Get today's date
    let today = new Date();

    // Create a new date by adding 20 days to today's date
    let vracanjaDate = new Date(today);
    vracanjaDate.setDate(today.getDate() + 20);

    // Format the dates as "mm/dd/yyyy"
    let formattedIzdavanja = formatDate(today);
    let formattedVracanja = formatDate(vracanjaDate);

    // Create the info object
    let info = {
      student_id: reservation.student.id,
      datumIzdavanja: formattedIzdavanja,
      datumVracanja: formattedVracanja,
    };
    try {
      const response = await api.post(
        `/books/${reservation.knjiga.id}/izdaj`,
        info
      );
      const responseData = response.data;
      e.target.parentElement.parentElement.style.cssText = "display: none"
      toast.success(responseData.message);
    } catch (error) {
      console.error(err);
      toast.error(error.response.data.data.errors);
      throw error;
    }
    
  };
  let cancelReservation = async (e) => {
    try {
      const response = await api.post(`books/reservations/cancel`,{
        reservation_id: reservation.id
      }
      );
      const responseData = response.data;
      e.target.parentElement.parentElement.style.cssText = "display: none"
      toast.success(responseData.message);
    } catch (error) {
      console.error(err);
      toast.error(error.response.data.data.errors);
      throw error;
    }
  };
  return (
    <div className="ReservationItem">
      <div className="studentInfo">
        <Link to={"/students/" + reservation.student.id}>
         <img src={imagee} alt="student" />
          {reservation.student.name + " " + reservation.student.surname}
        </Link>
      </div>
      <Link to={"/books/" + reservation.knjiga.id} className="book">
        {reservation.knjiga.title}
      </Link>
      <div className="date">{reservation.action_date.split(" ")[0]}</div>
      <div className="status">
        <FaCheck onClick={borrowBook} />
        <FaTimes onClick={cancelReservation} />
      </div>
    </div>
  );
}
