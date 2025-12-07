import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MovieList from "./pages/MovieList";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import MovieDetails from "./pages/MovieDetails";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
       <div className="app-container">

        <header className="app-header">
          <Link to="/"><strong>Movie List</strong></Link>
          <Link to="/add">Add Movie</Link>
        </header>

        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/edit/:id" element={<EditMovie />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}
