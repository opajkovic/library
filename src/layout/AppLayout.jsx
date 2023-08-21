import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import "./AppLayout.css";
import Sidebar from "./sidebar/Sidebar";

function AppLayout() {
  return (
    <>
      <Header />
      <div className="container">
        <Sidebar />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </>
  );
}
export default AppLayout;
