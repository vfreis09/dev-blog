import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import "./App.css";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoginPage from "./pages/Login";
import { UserProvider } from "./context/UserContext";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
