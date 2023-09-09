import React, { useEffect } from "react";
import "./activities.css";
import PageTitle from "../../components/pageTitle/PageTitle";
import ActivitiItem from "./components/ActivitiItem";
import { useOutletContext } from "react-router";

export default function Activities() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("activities");
  }, []);
  return (
    <div className="activities">
      <PageTitle title={"Prikaz aktivnosti"} />
      {/* isprobavanje */}
      <div className="activity-wrapper">
        <ActivitiItem />
        <ActivitiItem />
        <ActivitiItem />
      </div>
      {/* kraj  isprobavanja */}
    </div>
  );
}
