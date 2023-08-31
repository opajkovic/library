import React, { useEffect } from "react";
import "./BookInfo.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useOutletContext } from "react-router";
import Titles from "./components/Titlles";
import Specification from "./components/Specification";
import RightSide from "./components/RightSide";

export default function BookInfo() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("books");
  }, []);
  return (
    <div className="book-container">
      <ProfileTitle
        linkOne={"Sve knjige"}
        linkOnePath={"/books"}
        linkTwoPath={`/books/`}
        image="https://m.media-amazon.com/images/I/5167YEsQ6YL.jpg"
        change={true}
        deleteMssg={true}
        booksSpecial={true}
      />
      <div className="bottom-wrapper">
        <div>
          <Titles />
          <Specification />
        </div>
        <RightSide />
      </div>
    </div>
  );
}
