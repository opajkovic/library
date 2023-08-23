import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import AppLayout from "./layout/AppLayout";
import Settings from "./pages/settings/Settings";
import Librarians from "./pages/librarians/Librarians";
import Authors from "./pages/authors/Authors";
import Student from "./pages/student/Student";
import RentingBooks from "./pages/rentingBooks/rentingBooks";
import Books from "./pages/books/Books";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import LibrarianProfile from "./pages/librarianProfile/LibrarianProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student" element={<Student />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/rentingBooks" element={<RentingBooks />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/librarians" element={<Librarians />} />
          <Route path="/LibrarianProfile/:id" element={<LibrarianProfile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
