import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../config";
import "../styles/AuthorComponent.css";
import ErrorComponent from "./ErrorComponent";

export default function AuthorComponent({ authorId }) {
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getAuthorName(authorId);
  }, [authorId]);

  const getAuthorName = (id) => {
    setLoading(true);
    setErrorMsg("");

    axios(baseURL + `users/${id}`)
      .then((res) => {
        setAuthorName(res.data.name);
      })
      .catch((error) => {
        setErrorMsg(error);
      })
      .finally(setLoading(false));
  };

  
  if (loading) {
    return <div>Loading...</div>;
  }

  
  if (errorMsg) {
    return <ErrorComponent errorMsg={errorMsg} />;
  }

  
  return (
    <Link to={`/author/${authorId}`} className="author-link">
      {authorName && <div className="author-box">{authorName}</div>}
    </Link>
  );
}
