import "./kategorije.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useNavigate, useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { filterSearchedData } from "../../../../redux/actions";
import { auth } from "../../../../services/AuthService";

const headers = [
  { headerName: "Kategorije", sort: true, dropdown: true, dataKey: "name" },
];

export default function Kategorije() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
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
    setCategories(fetchedData);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setCategories(searchData);
    } else {
      setCategories(fetchedData);
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
  const categoriesToDisplay = categories.slice(startIndex, endIndex);
  const pageCount = Math.ceil(categories.length / itemsPerPage);

  return (
    <div>
      <PageTitle title="Settings" />

      <Menu selectedSettings={"kategorije"} />
      <div className="page-wrapper">
        <SettingsTable
          itemsPerPageHandler={itemPerPageHandler}
          title="Nova kategorija"
          headers={headers}
          tableData={categoriesToDisplay}
          searchGlobal={handleGlobalSearch}
          searchColumn={handleColumnSearch}
          options={[
            {
              text: "Izmijeni kategoriju",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi kategoriju",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
          onClick={handleClick}
          onPageChange={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}

export const CategoryLoader = async () => {
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/create`);
      const responseData = response.data.data.categories;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  }else{
    return []
  }
};
