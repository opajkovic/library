import "../layouts/BookSpecification.css";

export default function Specification() {
  return (
    <ul className="book-specification-wrapper">
      <li>
        Broj strana <span>1064</span>
      </li>
      <li>
        Jezik <span>Crnogorski</span>
      </li>
      <li>
        Povez <span> tvrdi </span>
      </li>
      <li>
        Format <span> B6 </span>
      </li>
      <li>
        International Standard Book Number (ISBN)<span> 1546213456878 </span>
      </li>
    </ul>
  );
}
