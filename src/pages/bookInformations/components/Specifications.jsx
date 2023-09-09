import "./Specification.css";

export default function Specification({ bookInfo }) {
  return (
    <ul className="book-specification-wrapper">
      <li>
        Broj strana <span>{bookInfo.pages}</span>
      </li>
      <li>
        Jezik <span>{bookInfo.language.name}</span>
      </li>
      <li>
        Povez <span> {bookInfo.bookbind.name}</span>
      </li>
      <li>
        Format <span> {bookInfo.format.name} </span>
      </li>
      <li>
        International Standard Book Number (ISBN)<span> {bookInfo.isbn} </span>
      </li>
    </ul>
  );
}
