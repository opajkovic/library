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
import ProfileEvidenceReturned from "./pages/studentProfile/layouts/ProfileEvidenceReturned";
import ProfileEvidenceWrittenOff from "./pages/studentProfile/layouts/ProfileEvidenceWrittenOff";
import ProfileEvidenceExcess from "./pages/studentProfile/layouts/ProfileEvidenceExcess";
import ProfileEvidenceReserved from "./pages/studentProfile/layouts/ProfileEvidenceReserved";
import ProfileEvidenceArchived from "./pages/studentProfile/layouts/ProfileEvidenceArhived";
import ProfileEvidenceRented, { BooksRentingLoader } from "./pages/studentProfile/layouts/ProfileEvidenceRented";

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
import RentingBooks from "./pages/rentingBooks/rentingBooks";
import ReturnedBooks from "./pages/rentingBooks/layouts/returnedBooks";
import WrittenOffBooks from "./pages/rentingBooks/layouts/writtenOffBooks";
import InExcessBooks from "./pages/rentingBooks/layouts/inExcessBooks";
import ActiveReservations from "./pages/rentingBooks/layouts/activeReservation";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} loader={reservationLoader} />
        <Route path="/activities" element={<Activities />} />

        {/* Books routes */}
        <Route path="/books" element={<Books />} loader={BooksLoader} />
        <Route path="/books/:id" element={<BookInfo />} loader={BookLoader} />
        <Route
          path="/books/:id/edit"
          element={<EditBook />}
          loader={EditBookLoader}
        />
        <Route
          path="/books/:id/edit/specification"
          element={<EditSpecification />}
          loader={EditBookLoader}
        />
        <Route path="/books/:id/edit/multimedia" element={<EditMultimedia />} />
        <Route
          path="/books/:id/otpisi-knjigu"
          element={<BookInfoWrittenOff />}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/vrati-knjigu"
          element={<BookInfoReturn />}
          loader={BookLoader}
        />

        <Route
          path="/books/:id/izdaj-knjigu"
          element={<BookInfoRentingBook />}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/rezervisi-knjigu"
          element={<BookInfoReserve />}
          loader={BookLoader}
        />
        <Route
          path="/books/new/osnovni-detalji"
          element={<NewBook />}
          loader={LoaderCreateBook}
        />
        <Route
          path="/books/new/specifikacija"
          element={<NewBookSpecification />}
          loader={LoaderCreateBook}
        />
        <Route path="/books/new/multimedija" element={<NewBookMultimedia />} />
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
          element={<BookRentEvidence />}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/evidencija/izdate-knjige"
          element={<RentedEvidence />}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/evidencija/vracene-knjige"
          element={<ReturnedEvidence />}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/evidencija/knjige-u-prekoracenju"
          element={<ExcessEvidence />}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/evidencija/aktivne-rezervacije"
          element={<ReservationEvidence />}
          loader={BookLoader}
        />
        <Route
          path="/books/:id/evidencija/arhivirane-rezervacije"
          element={<ArchivedEvidence />}
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
          element={<EditAuthor />}
          loader={LoaderAuthorProfile}
        />
        <Route path="/authors/new" element={<NewAuthor />} />

        {/* Izdavanje knjiga routes */}
        <Route path="/rentingBooks/izdate-knjige" element={<RentingBooks />} />
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
        <Route
          path="/settings/categories"
          element={<Kategorije />}
          loader={CategoryLoader}
        />
        <Route path="/settings/categories/new" element={<NovaKategorija />} />
        <Route
          path="/settings/zanrovi"
          element={<Zanrovi />}
          loader={GenresLoader}
        />
        <Route path="/settings/zanrovi/new" element={<NoviZanr />} />
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
        <Route path="/settings/povez/new" element={<NoviPovez />} />
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
        <Route path="/settings/pismo/new" element={<NovoPismo />} />
        <Route path="/settings/izdavac/new" element={<NoviIzdavac />} />
        <Route path="/settings/format/new" element={<NoviFormat />} />

        {/* Librairan routes */}
        <Route
          path="/librarians"
          element={<Librarians />}
          loader={LoaderLibrarians}
        />
        <Route path="/librarians/new" element={<NewLibrarian />} />
        <Route
          path="/librarians/:id"
          element={<LibrarianProfile />}
          loader={LibrarianProfileLoader}
        />
        <Route
          path="/librarians/:id/edit"
          element={<EditLibrarian />}
          loader={LibrarianProfileLoader}
        />

        {/* student routes */}
        <Route
          path="/students"
          element={<Students />}
          loader={LoaderStudents}
        />
        <Route path="/students/new" element={<NewStudent />} />
        <Route
          path="/students/:id"
          element={<StudentProfile />}
          loader={StudentProfileLoader}
        />
        <Route
          path="/students/:id/edit"
          element={<EditStudent />}
          loader={StudentProfileLoader}
        />
        <Route
          path="/students/:id/evidencija/izdate-knjige"
          element={<ProfileEvidenceRented />}
          loader={BooksRentingLoader}
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
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
