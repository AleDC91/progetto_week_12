import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../config";
import "../styles/CategoryComponent.css"
import { Link } from "react-router-dom";

export default function CategoryComponent({ categoryId }) {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategoryName(categoryId);
  }, []);

  const getCategoryName = (id) => {
    axios(baseURL + `categories/${id}`)
    .then((res) => {
      setCategoryName(res.data.name);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(
        setLoading(false)
    )
  };

if (loading) {
    return <p>Loading...</p>
}

  return (
    <Link to={`/category/${categoryId}`} className="text-decoration-none text-black">{categoryName && <div className="category-box">{categoryName}</div>}</Link>
  );
}
