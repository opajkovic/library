import React from "react";
import "./ActivityList.css";
import { Link } from "react-router-dom";
import ActivitiItem from "../../../activities/components/ActivitiItem";

export default function ActivityList({ hideTitle }) {
  return (
    <div className="activityList">
      {!hideTitle && <h2 className="subtitle">Aktivnosti</h2>}
      <div className={hideTitle ? "book-activities" : "list"}>
        <ActivitiItem />
        <ActivitiItem />
        <ActivitiItem />
        <ActivitiItem />
        <ActivitiItem />
        <ActivitiItem />
        <Link to="/activities">
          <button className="showBtn">SHOW</button>
        </Link>
      </div>
    </div>
  );
}
