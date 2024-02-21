import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavbarComponent from "./components/NavbarComponent";
import SinglePostPage from "./pages/SinglePostPage";
import AuthorPage from "./pages/AuthorPage";
import CategoryPage from "./pages/CategoryPage";
import TagPage from "./pages/TagPage";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserEmail,
  setUserLogged,
  setUserIsAdmin,
  setUserToken,
  setUserUsername,
} from "./actions/userActions";
import { setSiteSettings } from "./actions/siteSettingsActions";
import axios from "axios";
import { baseURL } from "./config";
import NewPostPage from "./pages/NewPostPage";


function App() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const logged = useSelector((state) => state.user.logged);



  const siteSettings = useSelector((state) => state.siteSettings);

  useEffect(() => {
    if (token) {
      dispatch(setUserLogged(true));
    }
    console.log(logged);
  }, [token]);

  const handleLogin = (token) => {
    dispatch(setUserToken(token));
    dispatch(setUserLogged(true));
    getSiteSettings(token);

    console.log(siteSettings);
  };

  const handleLogout = () => {
    dispatch(setUserToken(""));
    dispatch(setUserLogged(false));
    dispatch(setUserUsername(""));

  };

  const getSiteSettings = (token) => {
    axios
      .get(baseURL + "settings", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => dispatch(setSiteSettings(res.data)))
      .catch((err) => console.error(err.message));
  };


  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent
          handleLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/login"
            element={
              !logged ? (
                <LoginPage handleLogin={handleLogin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/"
            element={logged ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/author/:authorId"
            element={logged ? <AuthorPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/article/:articleId"
            element={logged ? <SinglePostPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/category/:categoryId"
            element={logged ? <CategoryPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/tag/:tagId"
            element={logged ? <TagPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/newPost"
            element={logged ? <NewPostPage /> : <Navigate to="/login" />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
