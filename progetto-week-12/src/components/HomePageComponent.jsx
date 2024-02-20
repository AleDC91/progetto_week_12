import React, { useEffect, useState } from "react";
import { baseURL } from "../config";
import axios from "axios";
import SinglePostComponent from "./SinglePostComponent";
import SearchPostsComponent from "./SearchPostsComponent";
export default function HomePageComponent() {
  const [posts, setPosts] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllPosts();

  }, []);



  const getAllPosts = () => {
    axios(baseURL + "posts").then((res) => {
      setPosts(res.data);
      console.log(res.data);
    });
  };

  return (
    <div className="container">
      <SearchPostsComponent setQuery={setQuery} />
      {posts &&
        posts
          .filter(
            (post) =>
              post.content.rendered.toLowerCase().includes(query.toLowerCase()) ||
              post.title.rendered.toLowerCase().includes(query.toLowerCase())
          )
          .map((post) => <SinglePostComponent key={post.id} post={post} />)}
    </div>
  );
}
