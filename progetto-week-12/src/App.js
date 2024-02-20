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
import { setUserLogged, setUserToken } from "./actions/userActions";

function App() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const logged = useSelector((state) => state.user.logged);

  useEffect(() => {
    if (token) {
      dispatch(setUserLogged(true));
    }
    console.log(logged);
  }, [token]);

  const handleLogin = (token) => {
    dispatch(setUserToken(token));
    dispatch(setUserLogged(true));
  };

  const handleLogout = () => {
    dispatch(setUserToken(""));
    dispatch(setUserLogged(false));

  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent loggedIn={logged} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={<LoginPage handleLogin={handleLogin} />}
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
