import React from "react";
import { Link } from "react-router-dom";
import ActivityItem from "../../../activities/components/ActivityItem";
import "./ActivityList.css";

export default function ActivityList({ hideTitle, rented }) {
  return (
    <div className="activity-list">
      {!hideTitle && <h2 className="subtitle">Aktivnosti</h2>}
      <div className={hideTitle ? "book-activities" : "list"}>
        {rented !== undefined && rented[0].bibliotekar0.name !== "loading..."
          ? rented.map((item, index) => {
              if (index < 5) {
                return <ActivityItem key={index} data={item} />;
              }
            })
          : "loading..."}
        <Link to="/activities">
          <button className="btn btn-block btn-outline-dark btn-xs show-more-btn">
            SHOW MORE...
          </button>
        </Link>
      </div>
    </div>
  );
}
