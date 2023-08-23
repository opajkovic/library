import { useOutletContext } from "react-router";
import "./librarians.css";
import { useEffect } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import Button from "../../components/UI/Button";
import { FaPlus } from "react-icons/fa";

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
        <Button type="button" primary="btn btn-primary">
          <FaPlus />
          <span>New librarian</span>
        </Button>
      </div>
    </>
  );
};

export default Librarians;
