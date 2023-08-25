import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import AppLayout from "./layout/AppLayout";
import Polisa from "./pages/settings/Polisa";
import Librarians from "./pages/librarians/Librarians";
import Authors from "./pages/authors/Authors";
import Students from "./pages/students/Students";
import RentingBooks from "./pages/rentingBooks/rentingBooks";
import Books from "./pages/books/Books";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import LibrarianProfile from "./pages/librarianProfile/LibrarianProfile";
import StudentProfile from "./pages/studentProfile/StudentProfile";
import Activities from "./pages/activities/Activities";
import Kategorije from "./pages/settings/settingsPages/kategorije/Kategorije";
import Zanrovi from "./pages/settings/settingsPages/zanrovi/Zanrovi";
import Izdavac from "./pages/settings/settingsPages/izdavac/Izdavac";
import Povez from "./pages/settings/settingsPages/povez/Povez";
import Format from "./pages/settings/settingsPages/format/Format";
import Pismo from "./pages/settings/settingsPages/pismo/Pismo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/rentingBooks" element={<RentingBooks />} />
          {/* settings routes */}
          <Route path="/settings" element={<Polisa />} />
          <Route path="/settings/categories" element={<Kategorije />} />
          <Route path="/settings/zanrovi" element={<Zanrovi />} />
          <Route path="/settings/izdavac" element={<Izdavac />} />
          <Route path="/settings/povez" element={<Povez />} />
          <Route path="/settings/format" element={<Format />} />
          <Route path="/settings/pismo" element={<Pismo />} />

          <Route path="/librarians" element={<Librarians />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/librarians/:id" element={<LibrarianProfile />} />
          <Route path="/students/:id" element={<StudentProfile />}  />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
