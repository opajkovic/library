import Table from "../../components/UI/Table";
import "./BookInfoReturn.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useLoaderData, useParams } from "react-router";
import { useState } from "react";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import FormSubmitButtons from "../../components/UI/settingsForm components/FormSubmitButtons";
import { useEffect } from "react";
import api from "../../api/apiCalls";
import { toast } from "react-toastify";

const headers = [
  {
    headerName: "Izdato učeniku",
    sort: true,
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
    headerName: "Trenutno zadržavanje knjiga",
    sort: false,
    dropdown: false,
    dataKey: "borrow_date",
  },
  {
    headerName: "Prekoračenje u danima",
    sort: false,
    dropdown: false,
    dataKey: "borrow_date",
  },
  {
    headerName: "Knjigu izdao",
    sort: false,
    dropdown: true,
    dataKey: "bibliotekar0.name+bibliotekar0.surname",
  },
];

const BookInfoReturn = () => {
  const { id } = useParams();
  const fetchedData = useLoaderData();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [rentedBooks, setRentedBooks] = useState([
    { student: { name: "loading" } },
  ]);

  let checkedList = [];

  const data = [];
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const booksToDisplay = data.slice(startIndex, endIndex);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };
  useEffect(() => {
    let fetchRentedBooks = async () => {
      try {
        const response = await api.get(`/books/borrows`);
        const responseData = response.data.data.izdate.filter(
          (el) => el.knjiga.id == id
        );
        setRentedBooks(responseData);
      } catch (error) {
        console.error("Loader function error:", error);
        throw error;
      }
    };
    fetchRentedBooks();
  }, []);
  let checkChanged = (e) => {
    if (e.target.checked == true && !checkedList.includes(e.target.id)) {
      checkedList = [...checkedList, e.target.id];
    } else {
      checkedList = checkedList.filter((el) => el != e.target.id);
    }
  };

  let submitReturn = async () => {
    if (checkedList.length < 0) {
      toast.error("Select something");
    } else {
      try {
        let response = await api.post("/books/vrati", {
          toReturn: checkedList,
        });
        toast.success("Vracene knjige");
        return response;
      } catch (err) {
        toast.error(err.response.data.message);
        return err.response;
      }
    }
  };
  return (
    <>
      <ProfileTitle
        userInfo={{ name: fetchedData.title }}
        linkOne={"Sve knjige"}
        linkOnePath={"/books"}
        linkTwoPath={`/books/`}
        change={true}
        deleteMssg={true}
        booksSpecial={true}
        image={fetchedData.photo}
        editPath={`/books/${fetchedData.id}/edit`}
      />
      <div className="return-table-wrapper">
        <h1>Vrati knjigu</h1>
        <TableControl hide={true} itemsPerPageHandler={itemPerPageHandler} />
        <Table
          checkChanged={checkChanged}
          headers={headers}
          tableData={rentedBooks}
          options={[]}
        />
        {data.length > 0 && (
          <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
        )}
        <FormSubmitButtons
          submit={submitReturn}
          dangerText={"Ponisti"}
          succesText={"Vrati knjigu"}
        />
      </div>
    </>
  );
};

export default BookInfoReturn;
