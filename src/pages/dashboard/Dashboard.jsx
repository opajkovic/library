import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import ReservationList from "./layouts/reservationList/ReservationList";
import './dashboard.css'
import ActivityList from "./layouts/activiryList/ActivityList";

export default function Dashboard() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("dashboard");
  }, []);
  return (
    <div>
      <PageTitle title="Dashboard" />
      <div className="contentD">
        <ActivityList />
        <div className="rightSide">
          <ReservationList />
        </div>
      </div>
    </div>
  );
}
