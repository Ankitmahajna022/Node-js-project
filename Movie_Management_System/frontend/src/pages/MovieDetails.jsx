import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useParams, Link } from "react-router-dom";
import "./MovieDetails.css";


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
    <div className="movie-details-container">
      <h2>{movie.title}</h2>

      <div className="details-content">
        {movie.poster && (
          <img
            src={`http://localhost:5000/uploads/${movie.poster}`}
            alt={movie.title}
          />
        )}

        <div className="movie-info">
          <p>{movie.description}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Release year:</strong> {movie.releaseYear}</p>
        </div>
      </div>
      
      <Link to={`/edit/${movie._id}`} className="edit-link">
        Edit Movie
      </Link>
    </div>
  );
}
