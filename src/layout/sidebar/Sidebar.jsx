import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import NavItem from "./components/NavItem";
import NavList from "./components/NavList";
import HamburgerBtn from "./components/HamburgerBtn";
import "./Sidebar.css";

function Sidebar({ route }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExtendOpen, setIsExtendOpen] = useState(false);

  const changeExpand = () => {
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
        <NavList isOpen={isOpen} setClose={() => setIsOpen(false)} />
        <NavItem
          isOpen={isOpen}
          active={route == "settings" ? true : false}
          path="settings"
          text="Settings"
          setClose={() => {
            setIsOpen(false);
          }}
          icon={
            <FaCog
              className={route == "settings" ? "icon activeIcon" : "icon"}
            />
          }
        />
      </ul>
    </aside>
  );
}

export default Sidebar;
