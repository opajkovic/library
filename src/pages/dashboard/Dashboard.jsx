import React from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import ReservationList from "./layouts/reservationList/ReservationList";
import './dashboard.css'
import ActivityList from "./layouts/activityList/ActivityList";
import Chart from "../../components/UI/Chart";
import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { useState } from "react";
import api from "../../api/apiCalls";

export default function Dashboard() {

  let [reservations, setReservations] = useState([{student: {name: 'loading...', surname: "loading..."}, knjiga: {title: "loading..."}, action_date: 'loading...'}])
  const fetchedDataReservation = useLoaderData();

  useEffect(()=>{
    setReservations(fetchedDataReservation);
  },[])

  return (
    <>
      <PageTitle title="Dashboard" />
      <div className="dashboard-wrapper">
        <ActivityList />
        <div className="right-side">
          <ReservationList reservations={reservations} />
          <Chart />
        </div>
      </div>
    </>
  );
}
export async function reservationLoader() {
  try {
    const response = await api.get(`/books/reservations`);
    const responseData = response.data.data.active;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
}
