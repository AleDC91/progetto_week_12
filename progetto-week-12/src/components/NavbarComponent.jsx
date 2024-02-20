import React, { useEffect, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { baseURL } from "../config";
import axios from "axios";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getCategories();
    getTags();
  }, []);

  const getCategories = () => {
    axios(baseURL + "categories").then((res) => setCategories(res.data));
  };

  const getTags = () => {
    axios(baseURL + "tags").then((res) => setTags(res.data));
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Link to="/" className="navbar-brand">
          WP API Test
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>

            {categories.length > 0 && (
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                {categories.length > 0 &&
                  categories.map((category) => (
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
                {tags.length > 0 &&
                  tags.map((tag) => (
                    <Link to={`/tag/${tag.id}`} 
                    className="dropdown-item"
                    key={tag.id}
                    >
                      {tag.name}
                    </Link>
                  ))}
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
