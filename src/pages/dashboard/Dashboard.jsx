import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import ReservationList from "./layouts/reservationList/ReservationList";
import './dashboard.css'
import ActivityList from "./layouts/activityList/ActivityList";
import Chart from "../../components/UI/Chart";
import { useSelector } from "react-redux";

export default function Dashboard() {
  let profile = useSelector(store => store.profile)
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("dashboard");
  }, []);
  return (
    <div>
      <PageTitle title="Dashboard" />
      <div className="contentD">
        <ActivityList />
        <div className="right-side">
          <ReservationList />
          <Chart />
        </div>
      </div>
    </div>
  );
}
