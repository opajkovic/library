import "../BookInfo.css";
import ActivityList from "../../dashboard/layouts/activiryList/ActivityList";

export default function RightSide() {
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
           Izdato  <span> 25 primjeraka </span> 
          </li>
          <li>
           U prekoračenju <span> 5 primjeraka </span> 
          </li>
          <li>
           Ukupna količina  <span> 122 primjeraka </span> 
          </li>
        </ul>
      </div>
      <ActivityList hideTitle={true}/>
    </div>
  );
}
