import "./Informations.css";

export default function Informations({ bookInfo }) {
  const htmlString = bookInfo.description;

  return (
    <div className="book-spec">
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
          <span> Autor </span>{" "}
          {bookInfo.authors.length > 0
            ? bookInfo.authors[0].name + " " + bookInfo.authors[0].surname
            : ""}
        </li>
        <li>
          <span> Izdavačka kuća </span> {bookInfo.publisher.name}
        </li>
        <li>
          <span> Godina izdavanja </span> {bookInfo.pDate}
        </li>
      </ul>
      <div className="book-description">
        <span> Kratki sadržaj (Storyline) </span>
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </div>
    </div>
  );
}
