import React, { useEffect } from "react";
import "./BookInfo.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useOutletContext } from "react-router";
import Titles from "./components/Titlles";
import Specification from "./components/Specification";

export default function BookInfo() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("books");
  }, []);
  return (
    <div>
      <ProfileTitle
        linkOne={"Sve knjige"}
        linkOnePath={"/books"}
        linkTwoPath={`/books/`}
        image="https://m.media-amazon.com/images/I/5167YEsQ6YL.jpg"
        change={true}
        deleteMssg={true}
        booksSpecial={true}
      />
      <div>
        <div>
          <Titles />
          <Specification />
        </div>
      </div>
    </div>
  );
}
