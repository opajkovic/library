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

export default function Informations() {
  return DUMMY_DATA.map((item, index) => (
    <div className="book-spec" key={index}>
      <ul>
        <li>
          <span> Naziv knjige </span> {item.name}
        </li>
        <li>
          <span> Kategorija </span> {item.category}
        </li>
        <li>
          <span> Žanr </span> {item.genre}
        </li>
        <li>
          <span> Autor </span> {item.author}
        </li>
        <li>
          <span> Izdavačka kuća </span> {item.publisher}
        </li>
        <li>
          <span> Godina izdavanja </span> {item.publish_date}
        </li>
      </ul>
      <div className="book-description">
        <span> Kratki sadržaj (Storyline) </span> {item.description}
      </div>
    </div>
  ));
}
