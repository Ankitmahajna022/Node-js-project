import React from "react";
import MovieForm from "../components/MovieForm";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AddMovie() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const form = new FormData();
      form.append("title", values.title);
      form.append("description", values.description || "");
      form.append("genre", values.genre || "");
      if (values.releaseYear) form.append("releaseYear", values.releaseYear);
      if (values.poster) form.append("poster", values.poster);

      await api.post("/movies", form, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Created");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <MovieForm onSubmit={handleSubmit} />
    </div>
  );
}
