import React from "react";
import { Link } from "react-router-dom";
import ActivitiItem from "../../../activities/components/ActivitiItem";
import "./ActivityList.css";

export default function ActivityList({ hideTitle, rented }) {
  return (
    <div className="activityList">
      {!hideTitle && <h2 className="subTitle">Aktivnosti</h2>}
      <div className={hideTitle ? "book-activities" : "list"}>
        {rented != undefined && rented[0].bibliotekar0.name != "loading..."
          ? rented.map((item, index) => {
              if (index < 5) {
                return <ActivitiItem key={index} data={item} />;
              }
            })
          : "loading..."}
        <Link to="/activities">
          <button className="showBtn">SHOW MORE...</button>
        </Link>
      </div>
    </div>
  );
}
