import React, { useEffect, useState } from "react";
import "./activities.css";
import PageTitle from "../../components/pageTitle/PageTitle";
import ActivitiItem from "./components/ActivitiItem";
import { useOutletContext } from "react-router";
import { LoaderRented } from "../rentingBooks/rentingBooks";

export default function Activities() {
  const { setRoute } = useOutletContext();  
  let [izdate, setIzdate] = useState({izdate: [{bibliotekar0: {name: 'loading...', surname: 'loading...'}, knjiga: {title: 'loading...'}, student: {name: 'loading...', surname: 'loading...'}}], prekoracene: []})

  useEffect(() => {
    window.scrollTo({top: 0})
    setRoute("activities");
    let fetchBorrows = async() => {
      try{
        let response = await LoaderRented()
        setIzdate(response)
      }catch(err){
        console.error(err)
      }
    }
    fetchBorrows()
  }, []);
  return (
    <div className="activities">
      <PageTitle title={"Prikaz aktivnosti"} />
      {/* isprobavanje */}
      <div className="page-wrapper">
      {(izdate.izdate != undefined && izdate.izdate[0].bibliotekar0.name != 'loading...') ? izdate.izdate.map((izdat, i) => {
            return(<ActivitiItem key={i} data={izdat} />)
        }) : 'loading...'}
      </div>
      {/* kraj  isprobavanja */}
    </div>
  );
}
