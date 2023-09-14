import PageTitle from "../../../components/pageTitle/PageTitle";
import "../rentingBooks.css";
import BottomContainer from "../components/BottomContainer";


export default function ArchivedReservations() {

  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false },
    { headerName: "Datum rezervacije", sort: false, dropdown: false },
    { headerName: "Rezervacija zatvorena", sort: false, dropdown: false },
    { headerName: "Rezervaciju podnio", sort: false, dropdown: false },
    { headerName: "Status", sort: false, dropdown: true },
  ];

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer
        title="Nova knjiga"
        headers={headers}
      />
    </div>
  );
}
