import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/blog/${id}`).then(res => {
      setTitle(res.data.title);
      setDescription(res.data.description);
    });
  }, [id]);

  const updateBlog = async (e) => {
    e.preventDefault();
    await api.put(`/blog/${id}`, { title, description });
    navigate("/");
  };

  const deleteBlog = async () => {
    await api.delete(`/blog/${id}`);
    navigate("/");
  };

  return (
    <>
      <form onSubmit={updateBlog} className="form">
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <textarea value={description} onChange={e => setDescription(e.target.value)} />

        <button type="submit">Update</button>
      </form>

      <button className="delete" onClick={deleteBlog}>Delete Blog</button>
    </>
  );
}
