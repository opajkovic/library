import { useEffect } from "react";
import "../BookInfo.css";

const DUMMY_DATA = [
  {
    name: "Silmarilion",
    category: "Romani",
    genre: "Fantasy",
    author: "Tolkien",
    publisher: "Delfi knjizare",
    publish_date: "07.11.1958.",
    description:
      "The Silmarillion delves into the mythic history of Middle-earth, chronicling the creation by Eru Ilúvatar, the god-like figure, and the struggles of various races, including the Elves, Dwarves, and Men, against the dark forces of Morgoth. Key events include the creation of the Silmarils, powerful jewels, and the epic wars fought over them. The book offers a rich tapestry of legends, heroic quests, and tragic tales, shedding light on the origins of Middle-earth's peoples and the enduring battle between light and darkness. Tolkien's storytelling prowess and world-building shine in this profound literary work.",
  },
];

export default function Informations({bookInfo}) {
  
  return <div className="book-spec">
      <ul>
        <li>
          <span> Naziv knjige </span> {bookInfo.title}
        </li>
        <li>
          <span> Kategorija </span> {bookInfo.categories[0].name}
        </li>
        <li>
          <span> Žanr </span> {bookInfo.genres[0].name}
        </li>
        <li>
          <span> Autor </span> {bookInfo.authors[0].name + " " + bookInfo.authors[0].surname}
        </li>
        <li>
          <span> Izdavačka kuća </span> {bookInfo.publisher.name}
        </li>
        <li>
          <span> Godina izdavanja </span> {bookInfo.pDate}
        </li>
      </ul>
      <div className="book-description">
        <span> Kratki sadržaj (Storyline) </span> {bookInfo.description}
      </div>
    </div>
}
