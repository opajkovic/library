import React from "react";
import "./pageTitle.css";

export default function PageTitle({ title }) {
  return (
    <div className="bigdiv">
      <div className="pageTitle">
        <h1 className="titleH">{title}</h1>
      </div>
      <div className="paddingMenu"></div>
    </div>
  );
}
