import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query="") => {
    try {
      setLoading(true);
      const res = await api.get(`/movies${query ? `?q=${encodeURIComponent(query)}` : ""}`);
      setMovies(res.data.movies);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(q);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete movie?")) return;
    try {
      await api.delete(`/movies/${id}`);
      setMovies((m) => m.filter(x => x._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2>Movies</h2>
      <form onSubmit={handleSearch}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by title" />
        <button type="submit">Search</button>
        <button type="button" onClick={() => { setQ(""); fetchMovies(); }}>Clear</button>
      </form>

      {loading ? <p>Loading...</p> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10, marginTop: 10 }}>
          {movies.map(m => (
            <div key={m._id} style={{ border: "1px solid #ddd", padding: 10 }}>
              {m.poster ? (
                <img src={`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/uploads/${m.poster}`} alt={m.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />
              ) : <div style={{ height:200, background:"#eee", display:"flex", alignItems:"center", justifyContent:"center" }}>No Poster</div>}
              <h3>{m.title}</h3>
              <p>{m.genre} • {m.releaseYear}</p>
              <Link to={`/movie/${m._id}`}>View</Link> {" | "}
              <Link to={`/edit/${m._id}`}>Edit</Link> {" | "}
              <button onClick={() => handleDelete(m._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
