import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import "./AppLayout.css";
import Sidebar from "./sidebar/Sidebar";
import { useEffect, useState } from "react";

function AppLayout() {

  let [route, setRoute] = useState('/')

  return (
    <div className="container">
      <Header />
      <main className="main">
        <Sidebar route={route} />
        <div className="outlet">
        <Outlet context={{setRoute}} />
        </div>
      </main>
    </div>
  );
}
export default AppLayout;
