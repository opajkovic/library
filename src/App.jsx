// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/dashboard/Dashboard";
// import Librarians from "./pages/librarians/Librarians";
// import Students from "./pages/students/Students";
// import Books from "./pages/books/Books";
// import Authors from "./pages/authors/Authors";
// import Bookings from "./pages/bookings/Bookings";
// import Settings from "./pages/settings/Settings";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./ui/AppLayout";
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<AppLayout />}>
//           <Route index element={<Navigate replace to="/dashboard" />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/bibliotekari" element={<Librarians />} />
//           <Route path="/ucenik" element={<Students />} />
//           <Route path="/evidencijaKnjiga" element={<Books />} />
//           <Route path="/autori" element={<Authors />} />
//           <Route path="/izdateKnjige" element={<Bookings />} />
//           <Route path="/settingsPolisa" element={<Settings />} />
//         </Route>
//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
