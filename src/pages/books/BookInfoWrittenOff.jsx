import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { toast } from "react-toastify";
import Table from "../../components/UI/Table";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import FormSubmitButtons from "../../components/UI/settingsForm components/FormSubmitButtons";
import api from "../../api/apiCalls";
import "./BookInfoWrittenOff.css";

const headers = [
  {
    headerName: "Izdato učeniku",
    sort: true,
    dropdown: false,
    dataKey: "student.name+student.surname",
    path: "/students/:id",
    pathId: "student",
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
    path: "/librarians/:id",
    pathId: "bibliotekar",
  },
];

const BookInfoWrittenOff = () => {
  const fetchedData = useLoaderData();
  const { id } = useParams();

  let checkedList = [];
  const checkChanged = (e) => {
    if (e.target.checked == true && !checkedList.includes(e.target.id)) {
      checkedList[checkedList.length] = e.target.id;
    } else {
      checkedList = checkedList.filter((el) => el != e.target.id);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [tableData, setTableData] = useState([
    { student: { name: "loading..." } },
  ]);

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
    const fetchRentedBooks = async () => {
      try {
        const response = await api.get(`/books/borrows`);
        const responseData = response.data.data.izdate.filter(
          (item) => item.knjiga.id === id
        );
        setTableData(responseData);
      } catch (error) {
        console.error("Loader function error:", error);
        throw error;
      }
    };
    fetchRentedBooks();
  }, []);

  const submitReturn = async () => {
    if (checkedList.length < 0) {
      toast.error("Select something");
    } else {
      try {
        const response = await api.post("/books/otpisi", {
          toWriteoff: checkedList,
        });
        toast.success("Otpisane knjige");
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
      <div className="written-off-table-wrapper">
        <h1>Otpiši knjigu</h1>
        <TableControl hide={true} itemsPerPageHandler={itemPerPageHandler} />
        <Table
          checkChanged={checkChanged}
          headers={headers}
          tableData={tableData}
          options={[]}
        />
        {data.length > 0 && (
          <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
        )}
        <FormSubmitButtons
          submit={submitReturn}
          dangerText={"Ponisti"}
          succesText={"Otpisi knjigu"}
        />
      </div>
    </>
  );
};

export default BookInfoWrittenOff;
