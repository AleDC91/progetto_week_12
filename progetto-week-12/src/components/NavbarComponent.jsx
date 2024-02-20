import React, { useEffect, useState } from "react";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { baseURL } from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingNavbar from "./LoadingNavbar";
import { useSelector } from "react-redux";

export default function NavbarComponent({handleLogout}) {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const siteSettings = useSelector((state) => state.siteSettings);
  const username = useSelector((state) => state.user.username);
  const logged = useSelector((state) => state.user.logged);

  useEffect(() => {
    loadNavbarData();
   console.log(username)
  }, [username]);

  const loadNavbarData = async () => {
    try {
      const [categoriesResponse, tagsResponse, authorsResponse] =
        await Promise.all([
          axios(baseURL + "categories"),
          axios(baseURL + "tags"),
          axios(baseURL + "users"),
        ]);

      const categoriesData = categoriesResponse.data;
      const tagsData = tagsResponse.data;
      const authorsData = authorsResponse.data;

      setCategories(categoriesData);
      setTags(tagsData);
      setAuthors(authorsData);

      setLoading(false);
    } catch (error) {
      console.error("Errore durante il recupero dei dati:", error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingNavbar />
      ) : (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
          <Container>
            <Link to="/" className="navbar-brand">
              {Object.keys(siteSettings).length > 0 ? 
              siteSettings.title : "Site Title"}
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/" className="nav-link">
                  Home
                </Link>
                

                {authors.length > 0 && (
                  <NavDropdown title="Authors" id="basic-nav-dropdown">
                    {authors.map((author) => (
                      <Link
                        to={`/author/${author.id}`}
                        className="dropdown-item"
                        key={author.id}
                      >
                        {author.name}
                      </Link>
                    ))}
                  </NavDropdown>
                )}

                {categories.length > 0 && (
                  <NavDropdown title="Categories" id="basic-nav-dropdown">
                    {categories.map((category) => (
                      <Link
                        to={`/category/${category.id}`}
                        className="dropdown-item"
                        key={category.id}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </NavDropdown>
                )}
                {tags.length > 0 && (
                  <NavDropdown title="Tags" id="basic-nav-dropdown">
                    {tags.map((tag) => (
                      <Link
                        to={`/tag/${tag.id}`}
                        className="dropdown-item"
                        key={tag.id}
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </NavDropdown>
                )}
                {username && <Nav.Link >
                {`Hi ${username}`}
                  </Nav.Link>}
                  {
                  logged &&
                  <Button 
                  className="ms-md-5"
                  variant="light"
                  onClick={handleLogout}
                  >Logout</Button>
                }
              </Nav>
              
            </Navbar.Collapse>
       
          </Container>
        </Navbar>
      )}
    </>
  );
}
