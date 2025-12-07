import React, { useEffect, useState } from "react";
import MovieForm from "../components/MovieForm";
import { api } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditMovie() {
  const { id } = useParams();
  const [initial, setInitial] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        const m = res.data.movie;

        setInitial({
          title: m.title,
          description: m.description || "",
          genre: m.genre || "",
          releaseYear: m.releaseYear || "",
          poster: null, // new file
          existingPoster: m.poster ? `http://localhost:5000/uploads/${m.poster}` : null
        });

      } catch (err) {
        console.error(err);
        alert("Failed to load movie");
      }
    })();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const form = new FormData();
      form.append("title", values.title);
      form.append("description", values.description || "");
      form.append("genre", values.genre || "");
      if (values.releaseYear) form.append("releaseYear", values.releaseYear);

      if (values.poster) form.append("poster", values.poster);

      await api.put(`/movies/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Updated");
      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!initial) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Movie</h2>
      <MovieForm initialValues={initial} onSubmit={handleSubmit} />
    </div>
  );
}
