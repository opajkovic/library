import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Titles from "../components/Titles";
import Informations from "../components/Informations";
import Specification from "../components/Specifications";
import Multimedia from "../components/Multimedia";
import EvidenceTable from "../components/EvidenceTable";
import api from "../../../api/apiCalls";
import "../BookInfo.css";

export default function ConditionalContainer(props) {

  const {
    specification,
    multimedia,
    evidence,
    rentedEvidence,
    returnedEvidence,
    reservationEvidence,
    excessEvidence,
    archivedEvidence,
    book,
    photo,
  } = props.conditionals;

  const params = useParams();
  const [rented, setRented] = useState([
    {
      knjiga: { title: "loading..." },
      bibliotekar0: { name: "loading..." },
      student: { name: "Loading..." },
    },
  ]);
  const [excessed, setExcessed] = useState([
    {
      knjiga: { title: "loading..." },
      bibliotekar0: { name: "loading..." },
      student: { name: "Loading..." },
    },
  ]);
  const [returned, setReturned] = useState([
    {
      knjiga: { title: "loading..." },
      bibliotekar0: { name: "loading..." },
      student: { name: "Loading..." },
    },
  ]);
  const [reserved, setReserved] = useState([
    {
      knjiga: { title: "loading..." },
      bibliotekar0: { name: "loading..." },
      student: { name: "Loading..." },
    },
  ]);
  const [archived, setArchived] = useState([
    {
      knjiga: { title: "loading..." },
      bibliotekar0: { name: "loading..." },
      student: { name: "Loading..." },
    },
  ]);

  async function fetchBooks() {
    if (evidence || returnedEvidence || excessEvidence) {
      try {
        const response = await api.get(`/books/borrows`);
        const responseData = response.data.data;
        const rentedData = responseData.izdate.filter(
          (item) => item.knjiga.id == params.id
        );
        const excessedData = responseData.prekoracene.filter(
          (item) => item.knjiga.id == params.id
        );
        const returnedData = responseData.vracene.filter(
          (item) => item.knjiga.id == params.id
        );
        setRented(rentedData);
        setExcessed(excessedData);
        setReturned(returnedData);
      } catch (error) {
        console.error("Loader function error:", error);
        throw error;
      }
    } else if (reservationEvidence || archivedEvidence) {
      try {
        const response = await api.get(`/books/reservations`);
        const responseData = response.data.data;
        const reserveData = responseData.active.filter(
          (item) => item.knjiga.id == params.id
        );
        const archiveData = responseData.archive.filter(
          (item) => item.knjiga.id == params.id
        );
        setReserved(reserveData);
        setArchived(archiveData);
        return responseData;
      } catch (error) {
        console.error("Loader function error:", error);
        throw error;
      }
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <Titles />
      {specification && <Specification bookInfo={book} />}

      {multimedia && <Multimedia photos={[photo]} />}

      {evidence && (
        <EvidenceTable
          data={rented}
          headers={[
            {
              headerName: "Izdato uceniku",
              sort: false,
              dropdown: false,
              dataKey: "student.name+student.surname",
              pathId: "student",
              path: "/students/:id",
            },
            {
              headerName: "Datum izdavanja",
              sort: false,
              dropdown: false,
              dataKey: "borrow_date",
            },
            {
              headerName: "Trenutno zadrzavanje knjige",
              sort: false,
              dropdown: false,
              dataKey: "",
            },
            {
              headerName: "Knjigu izdao",
              sort: false,
              dropdown: false,
              dataKey: "bibliotekar0.name+bibliotekar0.surname",
              pathId: "bibliotekar",
              path: "/librarians/:id",
            },
            {
              headerName: "Status",
              sort: false,
              dropdown: true,
              dataKey: "status",
            },
          ]}
        />
      )}

      {returnedEvidence && (
        <EvidenceTable
          data={returned}
          headers={[
            {
              headerName: "Izdato učeniku",
              sort: false,
              dropdown: false,
              dataKey: "student.name+student.surname",
              pathId: "student",
              path: "/students/:id",
            },
            {
              headerName: "Datum izdavanja",
              sort: false,
              dropdown: false,
              dataKey: "borrow_date",
            },
            {
              headerName: "Datum vraćanja",
              sort: false,
              dropdown: false,
              dataKey: "return_date",
            },
            {
              headerName: "Zadržavanje knjige",
              sort: false,
              dropdown: false,
              dataKey: "",
            },
            {
              headerName: "Knjigu primio",
              sort: false,
              dropdown: true,
              dataKey: "bibliotekar0.name+bibliotekar0.surname",
              pathId: "bibliotekar",
              path: "/librarians/:id",
            },
          ]}
        />
      )}

      {excessEvidence && (
        <EvidenceTable
          data={excessed}
          headers={[
            {
              headerName: "Izdato učeniku",
              sort: false,
              dropdown: false,
              dataKey: "student.name+student.surname",
            },
            {
              headerName: "Datum izdavanja",
              sort: false,
              dropdown: false,
              dataKey: "borrow_date",
            },
            {
              headerName: "Prekoračenje u danima",
              sort: false,
              dropdown: false,
              dataKey: "",
            },
            {
              headerName: "Trenutno zadržavanje knjige",
              sort: false,
              dropdown: true,
              dataKey: "",
            },
          ]}
        />
      )}

      {reservationEvidence && (
        <EvidenceTable
          data={reserved}
          headers={[
            {
              headerName: "Datum rezervacije",
              sort: false,
              dropdown: false,
              dataKey: "action_date",
            },
            {
              headerName: "Rezervacija ističe",
              sort: false,
              dropdown: false,
              dataKey: "",
            },
            {
              headerName: "Rezervaciju podnio",
              sort: false,
              dropdown: false,
              dataKey: "student.name+student.surname",
              pathId: "student",
              path: "/students/:id",
            },
            {
              headerName: "Status",
              sort: false,
              dropdown: true,
              dataKey: "status",
            },
          ]}
        />
      )}

      {archivedEvidence && (
        <EvidenceTable
          data={archived}
          headers={[
            {
              headerName: "Datum rezervacije",
              sort: false,
              dropdown: false,
              dataKey: "action_date",
            },
            {
              headerName: "Rezervacija istice",
              sort: false,
              dropdown: false,
              dataKey: "",
            },
            {
              headerName: "Rezervaciju podnio",
              sort: false,
              dropdown: false,
              dataKey: "student.name+student.surname",
              pathId: "student",
              path: "/students/:id",
            },
            {
              headerName: "Status",
              sort: false,
              dropdown: true,
              dataKey: "status",
            },
          ]}
        />
      )}

      {!specification &&
        !multimedia &&
        !evidence &&
        !rentedEvidence &&
        !returnedEvidence &&
        !excessEvidence &&
        !reservationEvidence &&
        !archivedEvidence && <Informations bookInfo={book} />}
    </div>
  );
}
