import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import AppLayout from "./layout/AppLayout";
import Ucenik from "./pages/ucenik/Ucenik";
import EvidencijaKnjiga from "./pages/evidencijaKnjiga/EvidencijaKnjiga";
import Autori from "./pages/autori/Autori";
import IzdateKnjige from "./pages/izdateKnjige/IzdateKnjige";
import Settings from "./pages/settings/Settings";
import Librarians from "./pages/librarians/Librarians";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ucenik" element={<Ucenik />} />
          <Route path="/evidencijaKnjiga" element={<EvidencijaKnjiga />} />
          <Route path="/autori" element={<Autori />} />
          <Route path="/izdateKnjige" element={<IzdateKnjige />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/librarians" element={<Librarians />} />
        </Route>
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
