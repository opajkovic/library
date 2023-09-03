import "../Sidebar.css";
import { FaExpand, FaAngleRight, FaAngleDown } from "react-icons/fa";

function ExpandItem({ route, changeExpand, isOpen, isExtendOpen }) {
  return (
    <li>
      <div className="navLink" onClick={changeExpand}>
        <FaExpand
          className={route == "dashboard" ? "icon activeIcon" : "icon"}
        />
        {isOpen ? (
          <p>
            Expand Example{" "}
            <span className="extendArrows">
              {isExtendOpen ? <FaAngleDown /> : <FaAngleRight />}
            </span>
          </p>
        ) : null}
      </div>
      <div
        className={
          isOpen && isExtendOpen
            ? "expandText openExpand"
            : "expandText closedExpand"
        }
      >
        <p>Basic Expand</p>
        <p>Basic Expand</p>
        <p>Basic Expand</p>
      </div>
    </li>
  );
}

export default ExpandItem;
