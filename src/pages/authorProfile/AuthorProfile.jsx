import React, { useEffect, useState } from "react";
import "./AuthorProfile.css";
import ProfileTitle from "../../layout/profileTitle/ProfileTitle";
import { useLoaderData, useNavigate } from "react-router";
import AuthorInfo from "./components/AuthorInfo";
import api from "../../api/apiCalls";
import { deleteAuthor } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AuthorProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [author, setAuthor] = useState({ name: "loading..." });
  const fetchedData = useLoaderData();
  const authorsData = useSelector((state) => state.authors);

  useEffect(() => {
    setAuthor(fetchedData);
  }, []);

  
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/authors/${fetchedData.id}`);
      const data = await response.data;
      dispatch(deleteAuthor([authorsData], fetchedData.id));
      toast.success("Izbrisan autor")
      navigate("/authors");
    } catch (err) {
      toast.error(err.response.data.data);
    }
  }
  

  return (
    <>
      <ProfileTitle
        userInfo={author}
        linkOne={"Svi autori"}
        linkOnePath={"/authors"}
        linkTwoPath={`/authors/`}
        change={true}
        deleteMssg={true}
        editPath={`/authors/${fetchedData.id}/edit`}
        handleDelete={()=>handleDelete()}
      />
      <AuthorInfo userInfo={author} />
    </>
  );
}
export async function LoaderAuthorProfile({ params }) {
  const id = params.id;
  try {
    const response = await api.get(`/authors/${id}`);
    const responseData = response.data.data;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
}