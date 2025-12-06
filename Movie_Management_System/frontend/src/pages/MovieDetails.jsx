import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useParams, Link } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data.movie);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch movie");
      }
    })();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      {movie.poster && <img src={`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/uploads/${movie.poster}`} alt={movie.title} style={{maxWidth:400}} />}
      <p>{movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Release year:</strong> {movie.releaseYear}</p>
      <Link to={`/edit/${movie._id}`}>Edit</Link>
    </div>
  );
}
