import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import AppLayout from "./layout/AppLayout";
import Polisa from "./pages/settings/Polisa";
import Authors from "./pages/authors/Authors";
import Students from "./pages/students/Students";

import Librarians from "./pages/librarians/Librarians";
import LibrarianProfile from "./pages/librarianProfile/LibrarianProfile";
import NewLibrarian from "./pages/librarianNew/NewLibrarian";

import RentingBooks from "./pages/rentingBooks/rentingBooks";
import ReturnedBooks from "./pages/rentingBooks/layouts/returnedBooks";
import WrittenOffBooks from "./pages/rentingBooks/layouts/writtenOffBooks";
import InExcessBooks from "./pages/rentingBooks/layouts/inExcessBooks";
import ActiveReservations from "./pages/rentingBooks/layouts/activeReservation";
import ArchivedReservations from "./pages/rentingBooks/layouts/archivedReservations";

import Books from "./pages/books/Books";
import BookInfo from "./pages/bookInformations/BookInfo";
import BookSpecification from "./pages/bookInformations/layouts/BookSpecification";
import BookMultimedia from "./pages/bookInformations/layouts/BookMultimedia";
import BookRentEvidence from "./pages/bookInformations/layouts/BookRentEvidence";
import RentedEvidence from "./pages/bookInformations/layouts/table-layouts/RentedEvidence";

import PageNotFound from "./pages/pageNotFound/PageNotFound";
import StudentProfile from "./pages/studentProfile/StudentProfile";
import Activities from "./pages/activities/Activities";
import Kategorije from "./pages/settings/settingsPages/kategorije/Kategorije";
import Zanrovi from "./pages/settings/settingsPages/zanrovi/Zanrovi";
import Izdavac from "./pages/settings/settingsPages/izdavac/Izdavac";
import Povez from "./pages/settings/settingsPages/povez/Povez";
import Format from "./pages/settings/settingsPages/format/Format";
import Pismo from "./pages/settings/settingsPages/pismo/Pismo";
import NovaKategorija from "./pages/settings/settingsPages/kategorije/NovaKategorija";
import NoviPovez from "./pages/settings/settingsPages/povez/NoviPovez";
import NovoPismo from "./pages/settings/settingsPages/pismo/NovoPismo";
import NoviIzdavac from "./pages/settings/settingsPages/izdavac/NoviIzdavac";
import NoviFormat from "./pages/settings/settingsPages/format/NoviFormat";

import ProfileEvidenceReturned from "./pages/studentProfile/layouts/ProfileEvidenceReturned";
import ProfileEvidenceWrittenOff from "./pages/studentProfile/layouts/ProfileEvidenceWrittenOff";
import ProfileEvidenceExcess from "./pages/studentProfile/layouts/ProfileEvidenceExcess";
import ProfileEvidenceReserved from "./pages/studentProfile/layouts/ProfileEvidenceReserved";
import ProfileEvidenceArchived from "./pages/studentProfile/layouts/ProfileEvidenceArhived";
import ProfileEvidenceRented from "./pages/studentProfile/layouts/ProfileEvidenceRented";
import Singup from "./pages/singup/Singup";
import Login from "./pages/login/Login";
import AuthorProfile from "./pages/authorProfile/AuthorProfile";
import NoviZanr from "./pages/settings/settingsPages/zanrovi/NoviZanr";
import ReturnedEvidence from "./pages/bookInformations/layouts/table-layouts/ReturnedEvidence";
import ExcessEvidence from "./pages/bookInformations/layouts/table-layouts/ExcessEvidence";
import ReservationEvidence from "./pages/bookInformations/layouts/table-layouts/ReservationEvidence";
import ArchivedEvidence from "./pages/bookInformations/layouts/table-layouts/ArchivedEvidence";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookInfo />} />
          <Route
            path="/books/:id/specifikacija"
            element={<BookSpecification />}
          />
          <Route path="/books/:id/multimedija" element={<BookMultimedia />} />
          <Route path="/books/:id/evidencija/izdate-knjige" element={<BookRentEvidence />} />
          <Route
            path="/books/:id/evidencija/izdate-knjige"
            element={<RentedEvidence />}
          />
          <Route
            path="/books/:id/evidencija/vracene-knjige"
            element={<ReturnedEvidence />}
          />
          <Route
            path="/books/:id/evidencija/knjige-u-prekoracenju"
            element={<ExcessEvidence />}
          />
          <Route
            path="/books/:id/evidencija/aktivne-rezervacije"
            element={<ReservationEvidence />}
          />
          <Route
            path="/books/:id/evidencija/arhivirane-rezervacije"
            element={<ArchivedEvidence />}
          />

          {/* Author routes */}
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:id" element={<AuthorProfile />} />

          {/* Izdavanje knjiga routes */}
          <Route
            path="/rentingBooks/izdate-knjige"
            element={<RentingBooks />}
          />
          <Route
            path="/rentingBooks/vracene-knjige"
            element={<ReturnedBooks />}
          />
          <Route
            path="/rentingBooks/otpisane-knjige"
            element={<WrittenOffBooks />}
          />
          <Route
            path="/rentingBooks/knjige-u-prekoracenju"
            element={<InExcessBooks />}
          />
          <Route
            path="/rentingBooks/aktivne-rezervacije"
            element={<ActiveReservations />}
          />
          <Route
            path="/rentingBooks/arhivirane-rezervacije"
            element={<ArchivedReservations />}
          />

          {/* settings routes */}
          <Route path="/settings" element={<Polisa />} />
          <Route path="/settings/categories" element={<Kategorije />} />
          <Route path="/settings/categories/new" element={<NovaKategorija />} />
          <Route path="/settings/zanrovi" element={<Zanrovi />} />
          <Route path="/settings/zanrovi/new" element={<NoviZanr />} />
          <Route path="/settings/izdavac" element={<Izdavac />} />
          <Route path="/settings/povez" element={<Povez />} />
          <Route path="/settings/povez/new" element={<NoviPovez />} />
          <Route path="/settings/format" element={<Format />} />
          <Route path="/settings/pismo" element={<Pismo />} />
          <Route path="/settings/pismo/new" element={<NovoPismo />} />
          <Route path="/settings/izdavac/new" element={<NoviIzdavac />} />
          <Route path="/settings/format/new" element={<NoviFormat />} />

          <Route path="/librarians" element={<Librarians />} />
          <Route path="/librarians/new" element={<NewLibrarian />} />

          <Route path="/activities" element={<Activities />} />
          <Route path="/librarians/:id" element={<LibrarianProfile />} />

          {/* student profile routes */}
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentProfile />} />
          <Route
            path="/students/:id/evidencija/izdate-knjige"
            element={<ProfileEvidenceRented />}
          />
          <Route
            path="/students/:id/evidencija/vracene-knjige"
            element={<ProfileEvidenceReturned />}
          />
          <Route
            path="/students/:id/evidencija/otpisane-knjige"
            element={<ProfileEvidenceWrittenOff />}
          />
          <Route
            path="/students/:id/evidencija/knjige-u-prekoracenju"
            element={<ProfileEvidenceExcess />}
          />
          <Route
            path="/students/:id/evidencija/aktivne-rezervacije"
            element={<ProfileEvidenceReserved />}
          />
          <Route
            path="/students/:id/evidencija/arhivirane-rezervacije"
            element={<ProfileEvidenceArchived />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
