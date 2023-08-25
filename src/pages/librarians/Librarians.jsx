import { useOutletContext } from "react-router";
import "./librarians.css";
import { useEffect } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import Button from "../../components/UI/Button";
import { FaPlus } from "react-icons/fa";
import Table from "../../components/UI/Table";

const Librarians = () => {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("librarians");
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="librarians">
        <PageTitle title="Bibliotekari" />
      </div>
      <div className="container">
        <Button type="button" btn="btn btn-primary">
          <FaPlus />
          <span>New librarian</span>
        </Button>
        <Table />
      </div>
    </>
  );
};

export default Librarians;
