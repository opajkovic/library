import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import api from "../../api/apiCalls";
import {
  FaCalendar,
  FaEdit,
  FaHandScissors,
  FaLevelUpAlt,
  FaRedo,
  FaRegFile,
  FaTrash,
} from "react-icons/fa";

const DUMMY_TABLE_DATA = [
  {
    id: 2,
    name: "Robinson Kruso",
    author: "Daniel Defoe",
    category: "Romani",
    available: 3,
    reserved: 2,
    rented: 0,
    excess: 2,
    total: 10,
  },
  {
    id: 1,
    name: "Robinson Kruso",
    author: "Daniel Defoe",
    category: "Romani",
    available: 3,
    reserved: 2,
    rented: 0,
    excess: 2,
    total: 10,
  },
  {
    id: 3,
    name: "Robinson Kruso",
    author: "Daniel Defoe",
    category: "Romani",
    available: 3,
    reserved: 2,
    rented: 0,
    excess: 2,
    total: 10,
  },
];

const headers = [
  { headerName: "Naziv knjige", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "Autor", sort: false, dropdown: false, dataKey: "author" },
  {
    headerName: "Kategorija",
    sort: false,
    dropdown: false,
    dataKey: "category",
  },
  {
    headerName: "Na raspolaganju",
    sort: false,
    dropdown: false,
    dataKey: "available",
  },
  {
    headerName: "Rezervisano",
    sort: false,
    dropdown: false,
    dataKey: "reserved",
  },
  { headerName: "Izdato", sort: false, dropdown: false, dataKey: "rented" },
  {
    headerName: "U prekoračenju",
    sort: false,
    dropdown: false,
    dataKey: "excess",
  },
  {
    headerName: "Ukupna količina",
    sort: false,
    dropdown: true,
    dataKey: "total",
  },
];

export default function Books() {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  // let [books, setBooks] = useState();
  // const fetchedData = useLoaderData();

  useEffect(() => {
    // setBooks(fetchedData);
    setRoute("books");
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    navigate("/books/new");
  };
  return (
    <>
      <PageTitle title="Knjige" />
      <div className="page-wrapper">
        <TableControl title="Nova knjiga" onClick={handleClick} />
        <Table
          path="/books"
          headers={headers}
          tableData={DUMMY_TABLE_DATA}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaRegFile />,
              path: "/books/",
            },
            {
              text: "Izmijeni knjigu",
              icon: <FaEdit />,
              path: "/books/",
            },
            {
              text: "Otpisi knjigu",
              icon: <FaLevelUpAlt />,
              path: "/books/",
            },
            {
              text: "Izdaj knjigu",
              icon: <FaHandScissors />,
              path: "/books/",
            },
            {
              text: "Vrati knjigu",
              icon: <FaRedo />,
              path: "/books/",
            },
            {
              text: "Rezervisi knjigu",
              icon: <FaCalendar />,
              path: "/books/",
            },
            {
              text: "Izbrisi knjigu",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
        />
        <Pagination items={DUMMY_TABLE_DATA} />
      </div>
    </>
  );
}

export const BooksLoader = async () => {
  try {
    // const response = await api.get(`/books`);
    // const responseData = response.data.data;
    // return responseData;
    return null
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
