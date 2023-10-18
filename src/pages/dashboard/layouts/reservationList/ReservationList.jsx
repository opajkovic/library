import { Link } from "react-router-dom";
import ReservationItem from "../../components/ReservationItem";
import { FaCalendarAlt } from "react-icons/fa";
import "./ReservationList.css";

export default function ReservationList({ reservations }) {
  return (
    <div className="reservation-list">
      <h2 className="subtitle">Rezervacije knjiga</h2>
      <div className="list">
        {reservations.map((item, index) => {
          if (index < 5) {
            return <ReservationItem key={index} reservation={item} />;
          }
        })}
      </div>
      <div>
        <div className="show-all">
          <FaCalendarAlt />
          <Link to="/rentingBooks/aktivne-rezervacije">Prikazi sve</Link>
        </div>
      </div>
    </div>
  );
}
