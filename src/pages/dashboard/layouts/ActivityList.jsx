import React from "react";
import "./ActivityList.css";
import ActivitiItem from "../../activities/components/activitiItem/ActivitiItem";

export default function ActivityList() {
  return (
    <div className="activityList">
      <h2 className="subTitle">Aktivnosti</h2>
      <div className="list">
        <ActivitiItem />
        <ActivitiItem />
        <ActivitiItem />
        <ActivitiItem />
        <ActivitiItem />
        <ActivitiItem />
      <button className="showBtn">SHOW</button>
      </div>
    </div>
  )
}
