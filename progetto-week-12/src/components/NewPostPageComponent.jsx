import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { baseURL } from "../config";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";

export default function NewPostPageComponent() {
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();

  const [newPostData, setNewPostData] = useState({
    title: "",
    content: "",
    status: "publish",
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setNewPostData({
      ...newPostData,
      [e.target.name]: e.target.value,
    });
    console.log(newPostData);
  };

  const handleNewPostSubmit = (e) => {
    setErrorMsg('')
    e.preventDefault();
    postArticle();
  };

  const postArticle = () => {
    axios
      .post(baseURL + "posts/", newPostData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if(res.status == 201){
          console.log("published!");
          navigate(`/article/${res.data.id}`)
        } else {
          setErrorMsg(res.data.message)
        }
      }).catch(err => setErrorMsg(err.message));
  };

  return (
    <>


    <main className="container">
    <h1 className="my-5" >New Post</h1>
    {errorMsg && <ErrorComponent errorMsg={errorMsg} />}
      <Form className="my-5" onSubmit={(e) => handleNewPostSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Control
            name="title"
            type="text"
            placeholder="Post title..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
          className="w-100 p-1"
            name="content"
            type="textarea"
            placeholder="article HTML..."
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Form.Group>

        <Form.Select
          name="status"
          className="mb-3"
          onChange={(e) => handleChange(e)}
        >
          <option>Status</option>
          <option value="publish" selected>
            Publish
          </option>
          <option value="future">Future</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="private">Private</option>
        </Form.Select>

        <Button type="submit" variant="success">
          POST
        </Button>
      </Form>
    </main>
    </>
  );
}
