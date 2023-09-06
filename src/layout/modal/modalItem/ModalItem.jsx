import React from "react";
import "./modalItem.css";
import { Link } from "react-router-dom";
export default function ModalItem({
  icon,
  text,
  path,
  closeModals,
  newClassName,
  noPath,
  setResponse,
  onClick
}) {
  return (<>
  {noPath ?  <div
      onClick={()=>{
        setResponse(true)
        closeModals(false)
        onClick()
      }}
      className={newClassName ? `modalItem ${newClassName}` : "modalItem"}
    >
      {icon}
      <p>{text}</p>
    </div> : <Link
    onClick={closeModals}
      to={`${path}`}
      className={newClassName ? `modalItem ${newClassName}` : "modalItem"}
    >
      {icon}
      <p>{text}</p>
    </Link>}
  </>);
}