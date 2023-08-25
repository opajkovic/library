import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import ReservationList from "./layouts/ReservationList";
import ActivityList from "./layouts/ActivityList";
import './dashboard.css'

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
