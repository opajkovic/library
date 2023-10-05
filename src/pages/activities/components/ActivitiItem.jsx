import React, { useEffect, useState } from "react";
import "./activitiItem.css";
import { Link } from "react-router-dom";
import photo from "../../../assets/profileStudent.jpg";

export default function ActivitiItem({data}) {
  let [daysAgo, setDaysAgo] = useState('')
  useEffect(()=>{
    const currentDate = new Date();
    const dayArraow = new Date(data.borrow_date);
    const timeDifference = currentDate - dayArraow;
    const daysDifference = Math.round(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    setDaysAgo(daysDifference)
  },[])
  return (
    <div className="activitiItem">
      <div className="img">
        <img src={photo} alt="Student" />
      </div>
      <div className="info">
        <p className="title">IZDAVANJE KNJIGE - {daysAgo} days ago</p>
        <p className="details">
          <Link to={`/librarians/2`} className="librarianName">
            {data.bibliotekar0.name + " " + data.bibliotekar0.surname }
          </Link>
          je izdala knjigu <Link to={`/books/${data.knjiga.id}`} ><b> {data.knjiga.title} </b></Link> uceniku 
          <Link to={`/students/${data.student.id}`} className="studentName">
             {" " + data.student.name + " " + data.student.surname}
          </Link>
           dana <b>{data.borrow_date + " "}</b>
          <Link to={`/books/${data.knjiga.id}`} className="showDetails">
            pogledaj detaljnije {">>"}
          </Link>
        </p>
      </div>
    </div>
  );
}
