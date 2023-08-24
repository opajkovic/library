import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import AppLayout from "./layout/AppLayout";
import Settings from "./pages/settings/Settings";
import Librarians from "./pages/librarians/Librarians";
import Authors from "./pages/authors/Authors";
import Students from "./pages/students/Students";
import RentingBooks from "./pages/rentingBooks/rentingBooks";
import Books from "./pages/books/Books";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import LibrarianProfile from "./pages/librarianProfile/LibrarianProfile";
import StudentProfile from "./pages/studentProfile/StudentProfile";
import Activities from "./pages/activities/Activities";

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
          <Route path="/settings" element={<Settings />} />
          <Route path="/librarians" element={<Librarians />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/librarians/:id" element={<LibrarianProfile />} />
          <Route path="/students/:id" element={<StudentProfile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
