import "../BookInfo.css";
import ActivityList from "../../dashboard/layouts/activityList/ActivityList";

export default function RightSide({bookInfo, hide}) {
  return (
    <div className="right-side-info">
      <div className="book-count">
        <ul>
          <li>
           Na raspolaganju <span> 5 primjeraka </span> 
          </li>
          <li>
           Rezervisano  <span> 10 primjeraka </span> 
          </li>
          <li>
           Izdato  <span> {bookInfo.rSamples} primjeraka </span> 
          </li>
          <li>
           U prekoračenju <span> 5 primjeraka </span> 
          </li>
          <li>
           Ukupna količina  <span> {bookInfo.samples} primjeraka </span> 
          </li>
        </ul>
      </div>
      {!hide && <ActivityList hideTitle={true}/>}
    </div>
  );
}
