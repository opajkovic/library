import React, { useEffect } from "react";
import "./BookSpecification.css";
import { useOutletContext } from "react-router";
import BookInfo from "../BookInfo";

export default function BookSpecification() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("books");
  }, []);
  return <BookInfo specification={true} />;
}