import { useEffect, useState } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import ActivityItem from "./components/ActivityItem";
import { LoaderRented } from "../rentingBooks/rentingBooks";
import "./activities.css";

export default function Activities() {
  const [rented, setRented] = useState({
    izdate: [
      {
        bibliotekar0: { name: "loading...", surname: "loading..." },
        knjiga: { title: "loading..." },
        student: { name: "loading...", surname: "loading..." },
      },
    ],
    prekoracene: [],
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const fetchData = async () => {
      try {
        const response = await LoaderRented();
        setRented(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="activities">
      <PageTitle title={"Prikaz aktivnosti"} />
      <div className="page-wrapper">
        {rented.izdate != undefined &&
        rented.izdate[0].bibliotekar0.name != "loading..."
          ? rented.izdate.map((item, index) => {
              return <ActivityItem key={index} data={item} />;
            })
          : "loading..."}
      </div>
    </div>
  );
}
