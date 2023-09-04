import React from "react";
import "./modalItem.css";
import { Link } from "react-router-dom";
export default function ModalItem({
  icon,
  text,
  path,
  setModalClose,
  newClassName,
}) {
  return (
    <Link
      to={`${path}`}
      className={newClassName ? `modalItem ${newClassName}` : "modalItem"}
      onClick={setModalClose}
    >
      {icon}
      <p>{text}</p>
    </Link>
  );
}
