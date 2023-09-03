import "./Sidebar.css";
import { FaCog } from "react-icons/fa";

import { useEffect, useState } from "react";
import NavItem from "./components/NavItem";
import NavList from "./components/NavList";
import ExpandItem from "./components/ExpandItem";
import HamburgerBtn from "./components/HamburgerBtn";

function Sidebar({ route }) {
  var [isOpen, setIsOpen] = useState(false);
  var [isExtendOpen, setIsExtendOpen] = useState(false);

  let changeExpand = () => {
    if (isExtendOpen == false) {
      setIsOpen(true);
    }
    setIsExtendOpen((isExtendOpen) => !isExtendOpen);
  };

  useEffect(() => {
    setIsOpen(false);
    setIsExtendOpen(false);
  }, [window.location.href]);

  return (
    <aside className={isOpen ? "sidebar open" : "sidebar closed"}>
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className={isOpen ? "selfClose" : ""}
      ></div>
      <HamburgerBtn
        isOpen={isOpen}
        setOpen={() => setIsOpen(true)}
        setClose={() => setIsOpen(false)}
      />
      <ul>
        <NavList isOpen={isOpen} />
        <ExpandItem
          isOpen={isOpen}
          isExtendOpen={isExtendOpen}
          changeExpand={() => changeExpand()}
        />
        <li>
          <NavItem
            isOpen={isOpen}
            active={route == "settings" ? true : false}
            path="settings"
            text="Settings"
            icon={
              <FaCog
                className={route == "settings" ? "icon activeIcon" : "icon"}
              />
            }
          />
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
