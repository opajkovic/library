// import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./AppLayout.css";

function AppLayout() {
  return (
    <div className="container">
      <Header />
      <Sidebar />
      {/* <main className="main">
        <Outlet />
      </main> */}
    </div>
  );
}
export default AppLayout;
