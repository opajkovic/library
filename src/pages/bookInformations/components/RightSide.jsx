import ActivityList from "../../dashboard/layouts/activityList/ActivityList";
import "../BookInfo.css";

export default function RightSide({ bookInfo, hide }) {
  const availableBooks =
    bookInfo.samples -
    bookInfo.bSamples -
    bookInfo.rSamples -
    bookInfo.fSamples;

  return (
    <div className="right-side-info">
      <div className="book-count">
        <ul>
          <li>
            Na raspolaganju
            <span>
              {availableBooks}
              primjeraka
            </span>
          </li>
          <li>
            Rezervisano <span> {bookInfo.rSamples} primjeraka </span>
          </li>
          <li>
            Izdato <span> {bookInfo.bSamples} primjeraka </span>
          </li>
          <li>
            U prekoračenju <span> {bookInfo.fSamples} primjeraka </span>
          </li>
          <li>
            Ukupna količina <span> {bookInfo.samples} primjeraka </span>
          </li>
        </ul>
      </div>
      {!hide && <ActivityList hideTitle={true} />}
    </div>
  );
}
