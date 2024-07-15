import React, { useState } from "react";
import { Link } from "react-router-dom";
import getGoogleOauthUrl from "../../utils/getGoogleUrl";
import { useUser } from "../../context/UserContext";
import {
  Button,
  Navbar,
  Nav,
  Container,
  Image,
  Collapse,
} from "react-bootstrap";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const { user, isLoggedIn, setUser, setIsLoggedIn } = useUser();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.message === "Logged out successfully") {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Navbar sticky="top" bg="primary" data-bs-theme="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className={styles.navBrand}>
            dev-blog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn && (
                <Nav.Link as={Link} to="/create">
                  Create Post
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <>
                  <Image
                    src={user?.picture}
                    roundedCircle
                    height="40"
                    width="40"
                    alt="User Avatar"
                    onClick={() => setOpen(!open)}
                    style={{ cursor: "pointer" }}
                  />
                </>
              ) : (
                <Button variant="success">
                  <Link
                    to={getGoogleOauthUrl()}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Login
                  </Link>
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Collapse in={open}>
        <div className={styles.collapseContainer}>
          <div className="bg-light p-3 rounded">
            <Image
              src={user?.picture}
              roundedCircle
              height="40"
              width="40"
              alt="User Avatar"
            />
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Collapse>
    </>
  );
};

export default Header;
