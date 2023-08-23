import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import ReservationList from "./ReservationList";
import ActivityList from "./ActivityList";

export default function Dashboard() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("dashboard");
  }, []);
  return (
    <div>
      <PageTitle title="Dashboard" />
      <div>
        <ActivityList />
        <div>
          <ReservationList />
          <Chart />
        </div>
      </div>
    </div>
  );
}
