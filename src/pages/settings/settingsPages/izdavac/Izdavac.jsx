import { useEffect, useState } from "react";
import "./izdavac.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useLoaderData, useNavigate } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { filterSearchedData } from "../../../../redux/actions";

const headers = [
  { headerName: "Izdavac", sort: true, dropdown: true, dataKey: "name" },
];

export default function Izdavac() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [publishers, setPublishers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    setPublishers(fetchedData);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setPublishers(searchData);
    } else {
      setPublishers(fetchedData);
    }
  }, [search, fetchedData]);

  const handleClick = () => {
    navigate("./new");
  };

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    dispatch(filterSearchedData(fetchedData, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    dispatch(filterSearchedData(fetchedData, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const publishersToDisplay = publishers.slice(startIndex, endIndex);
  const pageCount = Math.ceil(publishers.length / itemsPerPage);

  return (
    <div>
      <PageTitle title="Settings" />

      <Menu selectedSettings={"izdavac"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi izdavač"
          tableData={publishersToDisplay}
          headers={headers}
          searchGlobal={handleGlobalSearch}
          searchColumn={handleColumnSearch}
          options={[
            {
              text: "Izmijeni izdavaca",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi izdavaca",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
          onClick={handleClick}
          itemsPerPageHandler={itemPerPageHandler}
          onPageChange={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}

export const PublisherLoader = async () => {
  try {
    const response = await api.get(`/books/create`);
    const responseData = response.data.data.publishers;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
