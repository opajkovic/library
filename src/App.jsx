import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Dashboard
import AppLayout from "./layout/AppLayout";
import Activities from "./pages/activities/Activities";
import Dashboard, { reservationLoader } from "./pages/dashboard/Dashboard";

// Author
import Authors, { LoaderAuthors } from "./pages/authors/Authors";
import AuthorProfile, { LoaderAuthorProfile } from "./pages/authorProfile/AuthorProfile";
import EditAuthor from "./pages/authorProfile/AuthorEdit";
import NewAuthor from "./pages/authors/NewAuthor";

// Student
import Students, { LoaderStudents } from "./pages/students/Students";
import NewStudent from "./pages/students/NewStudent";
import EditStudent from "./pages/students/EditStudent";
import StudentProfile, { StudentProfileLoader } from "./pages/studentProfile/StudentProfile";
import ProfileEvidenceReturned, { loaderTestReturned } from "./pages/studentProfile/layouts/ProfileEvidenceReturned";
import ProfileEvidenceWrittenOff, { loaderTestWrittenOff } from "./pages/studentProfile/layouts/ProfileEvidenceWrittenOff";
import ProfileEvidenceExcess, { loaderTest } from "./pages/studentProfile/layouts/ProfileEvidenceExcess";
import ProfileEvidenceReserved, { loaderTestActive } from "./pages/studentProfile/layouts/ProfileEvidenceReserved";
import ProfileEvidenceArchived, { loaderTestArchived } from "./pages/studentProfile/layouts/ProfileEvidenceArhived";
import ProfileEvidenceRented, { loaderTestRented } from "./pages/studentProfile/layouts/ProfileEvidenceRented";

// Librarian
import Librarians, { LoaderLibrarians } from "./pages/librarians/Librarians";
import NewLibrarian from "./pages/librarians/NewLibrarian";
import EditLibrarian from "./pages/librarians/EditLibrarian";
import LibrarianProfile, {
  LibrarianProfileLoader,
} from "./pages/librarianProfile/LibrarianProfile";

// Books
import Books, { BooksLoader } from "./pages/books/Books";
import BookInfo, { BookLoader } from "./pages/bookInformations/BookInfo";
import NewBook, { LoaderCreateBook } from "./pages/books/NewBook";
import NewBookSpecification from "./pages/books/components/Specification";
import NewBookMultimedia from "./pages/books/components/Multimedia";
import BookSpecification from "./pages/bookInformations/layouts/BookSpecification";
import BookMultimedia from "./pages/bookInformations/layouts/BookMultimedia";
import BookRentEvidence from "./pages/bookInformations/layouts/BookRentEvidence";
import RentedEvidence from "./pages/bookInformations/layouts/table-layouts/RentedEvidence";
import RentingBooks, { LoaderRented } from "./pages/rentingBooks/rentingBooks";
import ReturnedBooks from "./pages/rentingBooks/layouts/returnedBooks";
import WrittenOffBooks from "./pages/rentingBooks/layouts/writtenOffBooks";
import InExcessBooks from "./pages/rentingBooks/layouts/inExcessBooks";
import ActiveReservations, { LoaderReservations } from "./pages/rentingBooks/layouts/activeReservation";
import ArchivedReservations from "./pages/rentingBooks/layouts/archivedReservations";
import ReturnedEvidence from "./pages/bookInformations/layouts/table-layouts/ReturnedEvidence";
import ExcessEvidence from "./pages/bookInformations/layouts/table-layouts/ExcessEvidence";
import ReservationEvidence from "./pages/bookInformations/layouts/table-layouts/ReservationEvidence";
import ArchivedEvidence from "./pages/bookInformations/layouts/table-layouts/ArchivedEvidence";
import EditBook, { EditBookLoader } from "./pages/books/EditBook";
import EditSpecification from "./pages/books/components/EditSpecification";
import EditMultimedia from "./pages/books/components/EditMultimedia";
import BookInfoWrittenOff from "./pages/books/BookInfoWrittenOff";
import BookInfoReturn from "./pages/books/BookInfoReturn";
import BookInfoRentingBook from "./pages/books/BookInfoRentingBook";
import BookInfoReserve from "./pages/books/BookInfoReserve";

// Settings
import Polisa from "./pages/settings/Polisa";
import Kategorije, { CategoryLoader } from "./pages/settings/settingsPages/kategorije/Kategorije";
import Zanrovi, { GenresLoader } from "./pages/settings/settingsPages/zanrovi/Zanrovi";
import Izdavac, { PublisherLoader } from "./pages/settings/settingsPages/izdavac/Izdavac";
import Povez, { BookbindsLoader } from "./pages/settings/settingsPages/povez/Povez";
import Format, { FormatLoader } from "./pages/settings/settingsPages/format/Format";
import Pismo, { LanguagesLoader } from "./pages/settings/settingsPages/pismo/Pismo";
import NovaKategorija from "./pages/settings/settingsPages/kategorije/NovaKategorija";
import NoviPovez from "./pages/settings/settingsPages/povez/NoviPovez";
import NovoPismo from "./pages/settings/settingsPages/pismo/NovoPismo";
import NoviIzdavac from "./pages/settings/settingsPages/izdavac/NoviIzdavac";
import NoviFormat from "./pages/settings/settingsPages/format/NoviFormat";
import NoviZanr from "./pages/settings/settingsPages/zanrovi/NoviZanr";

// Login/out/not found
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Singup from "./pages/singup/Singup";
import Login from "./pages/login/Login";
import { GuestRoute } from "./services/GuestRoute";
import { PrivateRoute } from "./services/PrivateRoute";
import { AdminRoute } from "./services/AdminRoute";
import { BibliotekarRoute } from "./services/BibliotekarRoute";
import { SelfOrBibliotekarRoute } from "./services/SelfOrBibliotekar";
import { SelfRoute } from "./services/SelfRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
        <Route index element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<BibliotekarRoute><Dashboard /></BibliotekarRoute>} loader={reservationLoader} />
        <Route path="/activities" element={<BibliotekarRoute><Activities /></BibliotekarRoute>} />

        {/* Books routes */}
        <Route path="/books" element={<Books />} loader={BooksLoader} />
        <Route path="/books/:id" element={<BookInfo />} loader={BookLoader} />
        <Route
          path="/books/:id/edit"
          element={<AdminRoute><EditBook /></AdminRoute>}
          loader={EditBookLoader}
        />
        <Route
          path="/books/:id/edit/specification"
          element={<AdminRoute><EditSpecification /></AdminRoute>}
          loader={EditBookLoader}
        />
        <Route path="/books/:id/edit/multimedia" element={<AdminRoute><EditMultimedia /></AdminRoute>} />
        <Route
          path="/books/:id/otpisi-knjigu"
          element={<BibliotekarRoute><BookInfoWrittenOff /></BibliotekarRoute>}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/vrati-knjigu"
          element={<BibliotekarRoute><BookInfoReturn /></BibliotekarRoute>}
          loader={BookLoader}
        />

        <Route
          path="/books/:id/izdaj-knjigu"
          element={<BibliotekarRoute><BookInfoRentingBook /></BibliotekarRoute>}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/rezervisi-knjigu"
          element={<BibliotekarRoute><BookInfoReserve /></BibliotekarRoute>}
          loader={BookLoader}
        />
        <Route
          path="/books/new/osnovni-detalji"
          element={<AdminRoute><NewBook /></AdminRoute>}
          loader={LoaderCreateBook}
        />
        <Route
          path="/books/new/specifikacija"
          element={<AdminRoute><NewBookSpecification /></AdminRoute>}
          loader={LoaderCreateBook}
        />
        <Route path="/books/new/multimedija" element={<AdminRoute><NewBookMultimedia /></AdminRoute>} />
        <Route
          path="/books/:id/specifikacija"
          element={<BookSpecification />}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/multimedija"
          element={<BookMultimedia />}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/evidencija/izdate-knjige"
          element={<BibliotekarRoute><BookRentEvidence /></BibliotekarRoute>}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/evidencija/izdate-knjige"
          element={<BibliotekarRoute><RentedEvidence /></BibliotekarRoute>}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/evidencija/vracene-knjige"
          element={<BibliotekarRoute><ReturnedEvidence /></BibliotekarRoute>}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/evidencija/knjige-u-prekoracenju"
          element={<BibliotekarRoute><ExcessEvidence /></BibliotekarRoute>}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/evidencija/aktivne-rezervacije"
          element={<BibliotekarRoute><ReservationEvidence /></BibliotekarRoute>}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/evidencija/arhivirane-rezervacije"
          element={<BibliotekarRoute><ArchivedEvidence /></BibliotekarRoute>}
          loader={BookLoader}
        />

        {/* Author routes */}
        <Route path="/authors" element={<Authors />} loader={LoaderAuthors} />
        <Route
          path="/authors/:id"
          element={<AuthorProfile />}
          loader={LoaderAuthorProfile}
        />
        <Route
          path="/authors/:id/edit"
          element={<AdminRoute><EditAuthor /></AdminRoute>}
          loader={LoaderAuthorProfile}
        />
        <Route path="/authors/new" element={<AdminRoute><NewAuthor /></AdminRoute>} />

        {/* Izdavanje knjiga routes */}
        <Route path="/rentingBooks/izdate-knjige" loader={LoaderRented} element={<BibliotekarRoute><RentingBooks /></BibliotekarRoute>} />
        <Route
          path="/rentingBooks/vracene-knjige"
          element={<BibliotekarRoute><ReturnedBooks /></BibliotekarRoute>}
          loader={LoaderRented} 
        />
        <Route
          path="/rentingBooks/otpisane-knjige"
          element={<BibliotekarRoute><WrittenOffBooks /></BibliotekarRoute>}
          loader={LoaderRented} 
        />
        <Route
          path="/rentingBooks/knjige-u-prekoracenju"
          loader={LoaderRented} 
          element={<BibliotekarRoute><InExcessBooks /></BibliotekarRoute>}
        />
        <Route
          path="/rentingBooks/aktivne-rezervacije"
          element={<BibliotekarRoute><ActiveReservations /></BibliotekarRoute>}
          loader={LoaderReservations}
        />
        <Route
          path="/rentingBooks/arhivirane-rezervacije"
          element={<BibliotekarRoute><ArchivedReservations /></BibliotekarRoute>}
          loader={LoaderReservations}
        />

        {/* settings routes */}
        <Route path="/settings" element={<BibliotekarRoute><Polisa /></BibliotekarRoute>} />
        <Route
          path="/settings/categories"
          element={<BibliotekarRoute><Kategorije /></BibliotekarRoute>}
          loader={CategoryLoader}
        />
        <Route path="/settings/categories/new" element={<AdminRoute><NovaKategorija /></AdminRoute>} />
        <Route
          path="/settings/zanrovi"
          element={<Zanrovi />}
          loader={GenresLoader}
        />
        <Route path="/settings/zanrovi/new" element={<AdminRoute><NoviZanr /></AdminRoute>} />
        <Route
          path="/settings/izdavac"
          element={<Izdavac />}
          loader={PublisherLoader}
        />
        <Route
          path="/settings/povez"
          element={<Povez />}
          loader={BookbindsLoader}
        />
        <Route path="/settings/povez/new" element={<AdminRoute><NoviPovez /></AdminRoute>} />
        <Route
          path="/settings/format"
          element={<Format />}
          loader={FormatLoader}
        />
        <Route
          path="/settings/pismo"
          element={<Pismo />}
          loader={LanguagesLoader}
        />
        <Route path="/settings/pismo/new" element={<AdminRoute><NovoPismo /></AdminRoute>} />
        <Route path="/settings/izdavac/new" element={<AdminRoute><NoviIzdavac /></AdminRoute>} />
        <Route path="/settings/format/new" element={<AdminRoute><NoviFormat /></AdminRoute>} />

        {/* Librairan routes */}
        <Route
          path="/librarians"
          element={<BibliotekarRoute><Librarians /></BibliotekarRoute>}
          loader={LoaderLibrarians}
        />
        <Route path="/librarians/new" element={<AdminRoute><NewLibrarian /></AdminRoute>} />
        <Route
          path="/librarians/:id"
          element={<BibliotekarRoute><LibrarianProfile /></BibliotekarRoute>}
          loader={LibrarianProfileLoader}
        />
        <Route
          path="/librarians/:id/edit"
          element={<SelfRoute role={"Bibliotekar"}><EditLibrarian /></SelfRoute>}
          loader={LibrarianProfileLoader}
        />

        {/* student routes */}
        <Route
          path="/students"
          element={<BibliotekarRoute><Students /></BibliotekarRoute>}
          loader={LoaderStudents}
        />
        <Route path="/students/new" element={<BibliotekarRoute><NewStudent /></BibliotekarRoute>} />
        <Route
          path="/students/:id"
          element={<SelfOrBibliotekarRoute role='Student'><StudentProfile /></SelfOrBibliotekarRoute>}
          loader={StudentProfileLoader}
        />
        <Route
          path="/students/:id/edit"
          element={<SelfOrBibliotekarRoute role='Student'><EditStudent /></SelfOrBibliotekarRoute>}
          loader={StudentProfileLoader}
        />
        <Route
          path="/students/:id/evidencija/izdate-knjige"
          element={<SelfOrBibliotekarRoute role='Student'><ProfileEvidenceRented /></SelfOrBibliotekarRoute>}
          loader={loaderTestRented}
        />
        <Route
          path="/students/:id/evidencija/vracene-knjige"
          element={<SelfOrBibliotekarRoute role='Student'><ProfileEvidenceReturned /></SelfOrBibliotekarRoute>}
          loader={loaderTestReturned}
        />
        <Route
          path="/students/:id/evidencija/otpisane-knjige"
          element={<SelfOrBibliotekarRoute role='Student'><ProfileEvidenceWrittenOff /></SelfOrBibliotekarRoute>}
          loader={loaderTestWrittenOff}
        />
        <Route
          path="/students/:id/evidencija/knjige-u-prekoracenju"
          element={<SelfOrBibliotekarRoute role='Student'><ProfileEvidenceExcess /></SelfOrBibliotekarRoute>}
          loader={loaderTest}
        />
        <Route
          path="/students/:id/evidencija/aktivne-rezervacije"
          element={<SelfOrBibliotekarRoute role='Student'><ProfileEvidenceReserved /></SelfOrBibliotekarRoute>}
          loader={loaderTestActive}
        />
        <Route
          path="/students/:id/evidencija/arhivirane-rezervacije"
          element={<SelfOrBibliotekarRoute role='Student'><ProfileEvidenceArchived /></SelfOrBibliotekarRoute>}
          loader={loaderTestArchived}
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/singup" element={<GuestRoute><Singup /></GuestRoute>} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
