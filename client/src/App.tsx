import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import "./App.css";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
