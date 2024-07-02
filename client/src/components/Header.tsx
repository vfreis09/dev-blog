import React from "react";
import { Link } from "react-router-dom";
import getGoogleOauthUrl from "../utils/getGoogleUrl";
import { useUser } from "../context/UserContext";

const Header: React.FC = () => {
  const { user, isLoggedIn, setUser, setIsLoggedIn } = useUser();

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
    <header>
      <nav>
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/create">Create Post</Link>
            <span>Welcome, {user?.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to={getGoogleOauthUrl()}>Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
