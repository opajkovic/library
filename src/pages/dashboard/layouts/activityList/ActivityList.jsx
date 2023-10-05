import React from "react";
import "./ActivityList.css";
import { Link } from "react-router-dom";
import ActivitiItem from "../../../activities/components/ActivitiItem";

export default function ActivityList({ hideTitle, izdate }) {
  return (
    <div className="activityList">
      {!hideTitle && <h2 className="subTitle">Aktivnosti</h2>}
      <div className={hideTitle ? "book-activities" : "list"}>
        {(izdate != undefined && izdate[0].bibliotekar0.name != 'loading...') ? izdate.map((izdat, i) => {
          if(i < 5){
            return(<ActivitiItem key={i} data={izdat} />)
          }
        }) : 'loading...'}
        <Link to="/activities">
          <button className="showBtn">SHOW</button>
        </Link>
      </div>
    </div>
  );
}
