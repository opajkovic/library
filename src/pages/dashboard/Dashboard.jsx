import React from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import ReservationList from "./layouts/reservationList/ReservationList";
import ActivityList from "./layouts/activityList/ActivityList";
import Chart from "../../components/UI/Chart";
import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { useState } from "react";
import api from "../../api/apiCalls";
import { auth } from "../../services/AuthService";
import { LoaderRented } from "../rentingBooks/rentingBooks";
import "./dashboard.css";

export default function Dashboard() {
  let [reservations, setReservations] = useState({
    active: [
      {
        student: { name: "loading...", surname: "loading..." },
        knjiga: { title: "loading..." },
        action_date: "loading...",
      },
    ],
  });
  const fetchedDataReservation = useLoaderData();
  let [izdate, setIzdate] = useState({
    izdate: [
      {
        bibliotekar0: { name: "loading...", surname: "loading..." },
        knjiga: { title: "loading..." },
        student: { name: "loading...", surname: "loading..." },
      },
    ],
    prekoracene: [],
  });

  useEffect(() => {
    setReservations(fetchedDataReservation);
    let fetchBorrows = async () => {
      try {
        let response = await LoaderRented();
        setIzdate(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBorrows();
  }, []);

  return (
    <>
      <PageTitle title="Dashboard" />
      <div className="dashboard-wrapper">
        <ActivityList izdate={izdate.izdate} />
        <div className="right-side">
          <ReservationList reservations={reservations.active} />
          <Chart
            reservations={reservations.active.length}
            izdate={{
              izdate: izdate.izdate.length,
              prekoracene: izdate.prekoracene.length,
            }}
          />
        </div>
      </div>
    </>
  );
}
export async function reservationLoader() {
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated && auth.bibliotekarRole()) {
    try {
      const response = await api.get(`/books/reservations`);
      const responseData = response.data.data;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  } else {
    return [];
  }
}
