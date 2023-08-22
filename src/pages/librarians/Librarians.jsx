import { useOutletContext } from "react-router";
import "./librarians.css";
import { useEffect } from "react";

const Librarians = () => {
  const {setRoute} = useOutletContext()
  useEffect(()=>{
    setRoute('librarians')
  },[])
  return (
    <div className="flex">
      <div className="title">
        <h2>The Librarians</h2>
      </div>
    </div>
  );
};

export default Librarians;
