import { Outlet, useNavigation } from "react-router-dom";
import Header from "./header/Header";
import "./AppLayout.css";
import Sidebar from "./sidebar/Sidebar";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalSpinner from "./GlobalSpinner/GlobalSpinner";
import { useEffect } from "react";

function AppLayout() {
  let [route, setRoute] = useState("/");
  const navigation = useNavigation();

  useEffect(()=>{
    window.scrollTo({top: 0})
  },[navigation.state])
  return (
    <>
      <Header />
      <main className="main">
        <Sidebar route={route} />
        <div className="outlet">
          {navigation.state === "loading" ? <p>loading..</p>:
          <Outlet context={{ setRoute }} />}
        </div>
      </main>
        <ToastContainer />
    </>
  );
}
export default AppLayout;
