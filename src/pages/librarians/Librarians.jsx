import { useOutletContext } from "react-router";
import "./librarians.css";
import { useEffect } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";

const Librarians = () => {
  const {setRoute} = useOutletContext()
  useEffect(()=>{
    setRoute('librarians')
  },[])
  return (
    <div className="librarians">
      <PageTitle title="Bibliotekari" />
    </div>
  );
};

export default Librarians;
