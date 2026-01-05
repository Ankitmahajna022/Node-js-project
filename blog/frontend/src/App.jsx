import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import SingleBlog from "./pages/SingleBlog";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route
          path="/create"
          element={
            <PrivateRoute user={user}>
              <CreateBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute user={user}>
              <EditBlog />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
