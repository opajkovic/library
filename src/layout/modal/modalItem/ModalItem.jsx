import React from "react";
import "./modalItem.css";
import { Link } from "react-router-dom";
export default function ModalItem({
  icon,
  text,
  path,
  setModalClose,
  newClassName,
  setResponse,
  noPath,
  onClickModalItem,
  close,
}) {
  return (
    <>
      {noPath && !close && (
        <div
          onClick={onClickModalItem}
          className={newClassName ? `modalItem ${newClassName}` : "modalItem"}
        >
          {icon}
          <p>{text}</p>
        </div>
      )}
      {!close && !noPath && (
        <Link
          to={path}
          onClick={() => setModalClose()}
          className={newClassName ? `modalItem ${newClassName}` : "modalItem"}
        >
          {icon}
          <p>{text}</p>
        </Link>
      )}
      {close && (
        <div
          onClick={() => {
            setResponse();
            setModalClose();
          }}
          className={newClassName ? `modalItem ${newClassName}` : "modalItem"}
        >
          {icon}
          <p>{text}</p>
        </div>
      )}
    </>
  );
}
