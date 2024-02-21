import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../config";
import { Button, Spinner } from "react-bootstrap";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import SinglePostComponent from "./SinglePostComponent";
import SearchPostsComponent from "./SearchPostsComponent";
import { useSelector } from "react-redux";

export default function AuthorPageComponent() {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [query, setQuery] = useState("");
  const token = useSelector(state => state.user.token)

  useEffect(() => {
    setErrorMsg("");
    setLoading(true);
    getAuthor();
  }, [authorId, query]);

  const getPosts = () => {
    axios
      .get(baseURL + "posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setErrorMsg(error.message);
      })
      .finally(setLoading(false));
  };

  const getAuthor = () => {
    axios
      .get(baseURL + `users/${authorId}`)
      .then((res) => {
        setAuthor(res.data);
        setLoading(false);
        getPosts(); 
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setErrorMsg(error.message);
      })
      .finally(setLoading(false));
  };


  const handleDelete = (e) => {
    setErrorMsg('');
    e.preventDefault();
    deleteUser();
  }

  const deleteUser = () => {
    axios.delete(baseURL + `users/${authorId}/`, {
      headers: {
        "authorization": "Bearer " + token
      }
    }).catch(err => {
      console.error("Error deleting user");
      setErrorMsg(err.message);
    })
  }

  return (
    <main className="container my-5">
      {errorMsg && <ErrorComponent errorMsg={errorMsg} />}
      {loading ? (
        <LoadingComponent msg="Loading Author Data" />
      ) : (
        author &&
         (
          <>
            <div className="author-info d-md-flex align-items-center">
              <img
                className="rounded-circle me-md-5"
                src={author.avatar_urls["96"]}
                alt="user-avatar"
              />
              <div>
                <h1>{author.name}</h1>
                <p>{author.description}</p>
              </div>
              <Button 
              className="ms-5" 
              variant="danger"
              onClick={(e) => handleDelete(e)}
              >
                Delete User
              </Button>
            </div>
            <SearchPostsComponent setQuery={setQuery} />
            <div className="author-articles my-5">
              {posts &&
                posts
                  .filter((post) => post.author == authorId)
                  .filter(
                    (post) =>
                      post.content.rendered
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                      post.title.rendered
                        .toLowerCase()
                        .includes(query.toLowerCase())
                  )
                  .map((post) => (
                    <SinglePostComponent key={post.id} post={post} />
                  ))}
            </div>
          </>
        )
      )}
    </main>
  );
}
