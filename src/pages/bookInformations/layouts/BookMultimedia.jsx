import { useEffect } from "react";
import { useOutletContext } from "react-router";
import BookInfo from "../BookInfo";

export default function BookMultimedia() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("books");
  }, []);
  return <BookInfo multimedia={true} />;
}
