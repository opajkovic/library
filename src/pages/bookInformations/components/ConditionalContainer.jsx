import "../BookInfo.css";
import Titles from "../components/Titles";
import Informations from "../components/Informations";
import Specification from "../components/Specifications";
import Multimedia from "../components/Multimedia";
import EvidenceTable from "../components/EvidenceTable";
import { useEffect, useState } from "react";
import api from "../../../api/apiCalls";
import { useParams } from "react-router";

export default function ConditionalContainer({
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
}) {

  const params = useParams();
  let [izdavanja, setIzdavanja] = useState([{knjiga:{title: 'loading...'}, bibliotekar0:{name: 'loading...'}, student: {name: 'Loading...'}}])
  let [prekoracene, setPrekoracene] = useState([{knjiga:{title: 'loading...'}, bibliotekar0:{name: 'loading...'}, student: {name: 'Loading...'}}])
  let [vracene, setVracene] = useState([{knjiga:{title: 'loading...'}, bibliotekar0:{name: 'loading...'}, student: {name: 'Loading...'}}])
  let [aktivneRezervacije, setAktivneRezervacije] = useState([{knjiga:{title: 'loading...'}, bibliotekar0:{name: 'loading...'}, student: {name: 'Loading...'}}])
  let [arhiviraneRezervacije, setArhiviraneRezervacije] = useState([{knjiga:{title: 'loading...'}, bibliotekar0:{name: 'loading...'}, student: {name: 'Loading...'}}])

  async function fetchKnjige() {
    if(evidence || returnedEvidence || excessEvidence) {

      try {
        const response = await api.get(`/books/borrows`);
        const responseData = response.data.data;
        let izdavanja2 = responseData.izdate.filter(izdat => izdat.knjiga.id == params.id)
        let prekoracene2 = responseData.prekoracene.filter(prekoracen => prekoracen.knjiga.id == params.id)
        let vracene2 = responseData.vracene.filter(vracen => vracen.knjiga.id == params.id)

        setIzdavanja(izdavanja2)
        setPrekoracene(prekoracene2)
        setVracene(vracene2)  
      } catch (error) {
        console.error("Loader function error:", error);
        throw error;
      }
    }
      else if(reservationEvidence || archivedEvidence){
        try {
          const response = await api.get(`/books/reservations`);
          const responseData = response.data.data;
          let aktivneRezervacije2 = responseData.active.filter(activ => activ.knjiga.id == params.id)
          let arhiviraneRezervacije2 = responseData.archive.filter(arhiv => arhiv.knjiga.id == params.id)
          setAktivneRezervacije(aktivneRezervacije2)
          setArhiviraneRezervacije(arhiviraneRezervacije2)
          console.log(responseData)
  
          return responseData;
        } catch (error) {
          console.error("Loader function error:", error);
          throw error;
        }
      }
  }

  useEffect(()=>{
    fetchKnjige()
  },[])
  return (
    <div>
      <Titles />
      {specification && <Specification bookInfo={book} />}

      {multimedia && <Multimedia photos={[photo]} />}

      {evidence && (
        <EvidenceTable
           data={izdavanja}
          headers={[
            { headerName: "Izdato uceniku", sort: false, dropdown: false,
            dataKey: 'student.name+student.surname', pathId: 'student', path: '/students/:id' },
            {
              headerName: "Datum izdavanja",
              sort: false,
              dropdown: false,
              dataKey: 'borrow_date'
            },
            {
              headerName: "Trenutno zadrzavanje knjige",
              sort: false,
              dropdown: false,
              dataKey: ''
            },
            {
              headerName: "Knjigu izdao",
              sort: false,
              dropdown: false,
              dataKey: 'bibliotekar0.name+bibliotekar0.surname',
              pathId: 'bibliotekar', path: '/librarians/:id'
            },
            { headerName: "Status", sort: false, dropdown: true,
            dataKey: 'status' },
          ]}
        />
      )}

      {returnedEvidence && (
        <EvidenceTable
        data={vracene}
          headers={[
            { headerName: "Izdato učeniku", sort: false, dropdown: false, dataKey: 'student.name+student.surname', pathId: 'student', path: '/students/:id' },
            { headerName: "Datum izdavanja", sort: false, dropdown: false, dataKey: 'borrow_date' },
            { headerName: "Datum vraćanja", sort: false, dropdown: false, dataKey: 'return_date' },
            {
              headerName: "Zadržavanje knjige",
              sort: false,
              dropdown: false, dataKey: ''
            },
            {
              headerName: "Knjigu primio",
              sort: false,
              dropdown: true,
              dataKey: 'bibliotekar0.name+bibliotekar0.surname',
              pathId: 'bibliotekar', 
              path: '/librarians/:id'
            },
          ]}
        />
      )}

      {excessEvidence && (
        <EvidenceTable
        data={prekoracene}
          headers={[
            { headerName: "Izdato učeniku", sort: false, dropdown: false, dataKey: 'student.name+student.surname' },
            { headerName: "Datum izdavanja", sort: false, dropdown: false, dataKey: 'borrow_date' },
            {
              headerName: "Prekoračenje u danima",
              sort: false,
              dropdown: false, dataKey: ''
            },
            {
              headerName: "Trenutno zadržavanje knjige",
              sort: false,
              dropdown: true, dataKey: ''
            },
          ]}
        />
      )}

      {reservationEvidence && (
        <EvidenceTable
        data={aktivneRezervacije}
          headers={[
            {
              headerName: "Datum rezervacije",
              sort: false,
              dropdown: false, dataKey: 'action_date'
            },
            {
              headerName: "Rezervacija ističe",
              sort: false,
              dropdown: false, dataKey: ''
            },
            {
              headerName: "Rezervaciju podnio",
              sort: false,
              dropdown: false, dataKey: 'student.name+student.surname',
              pathId: 'student', 
              path: '/students/:id'
            },
            { headerName: "Status", sort: false, dropdown: true, dataKey: 'status' },
          ]}
        />
      )}

      {archivedEvidence && (
        <EvidenceTable
        data={arhiviraneRezervacije}
          headers={[
            {
              headerName: "Datum rezervacije",
              sort: false,
              dropdown: false, dataKey: 'action_date'
            },
            {
              headerName: "Rezervacija istice",
              sort: false,
              dropdown: false, dataKey: ''
            },
            {
              headerName: "Rezervaciju podnio",
              sort: false,
              dropdown: false, dataKey: 'student.name+student.surname',
              pathId: 'student', 
              path: '/students/:id'
            },
            { headerName: "Status", sort: false, dropdown: true, dataKey: 'status' },
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
