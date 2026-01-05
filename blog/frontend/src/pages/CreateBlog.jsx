import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import "./CreateBlog.css"

export default function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const submit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    fd.append("content", content);
    if(image) fd.append("image", image);
    await api.post("/api/blogs", fd);
    navigate("/");
  };

  return (
    <form className="blog-form" onSubmit={submit}>
  <h2>Create Blog</h2>

  <input
    placeholder="Title"
    onChange={e => setTitle(e.target.value)}
    required
  />

  <textarea
    placeholder="Content"
    onChange={e => setContent(e.target.value)}
    required
  />

  <input
    type="file"
    onChange={e => setImage(e.target.files[0])}
  />

  <button type="submit">Create</button>
</form>

  );
}
