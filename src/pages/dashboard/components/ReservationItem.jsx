import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCheck, FaTimes } from "react-icons/fa";
import image from "../../../assets/profileStudent.jpg";
import api from "../../../api/apiCalls";
import "./ReservationItem.css";

export default function ReservationItem({ reservation }) {
  function formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    const year = date.getFullYear();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    return `${month}/${day}/${year}`;
  }

  const borrowBook = async () => {
    const today = new Date();
    const returnDate = new Date(today);
    returnDate.setDate(today.getDate() + 20);

    const rentFormatted = formatDate(today);
    const returnFormatted = formatDate(returnDate);

    const info = {
      student_id: reservation.student.id,
      datumIzdavanja: rentFormatted,
      datumVracanja: returnFormatted,
    };

    try {
      const response = await api.post(
        `/books/${reservation.knjiga.id}/izdaj`,
        info
      );
      const responseData = response.data;
      toast.success(responseData.message);
    } catch (error) {
      console.error(err);
      toast.error(error.response.data.data.errors);
      throw error;
    }
  };

  const cancelReservation = async () => {
    try {
      const response = await api.post(`books/reservations/cancel`, {
        reservation_id: reservation.id,
      });
      const responseData = response.data;
      toast.success(responseData.message);
    } catch (error) {
      console.error(err);
      toast.error(error.response.data.data.errors);
      throw error;
    }
  };

  return (
    <div className="reservation-item-wrapper">
      <div className="student-info">
        <Link to={"/students/" + reservation.student.id}>
          <img src={image} alt="student" />
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
