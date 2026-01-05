import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api.js";
import "./EditBlog.css"

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [image, setImage] = useState(null);

  const load = async () => {
    const res = await api.get(`/api/blogs/${id}`);
    setBlog(res.data);
  };

  useEffect(()=>{ load(); }, []);

  if(!blog) return <h2>Loading...</h2>;

  const submit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", blog.title);
    fd.append("content", blog.content);
    if(image) fd.append("image", image);
    await api.put(`/api/blogs/${id}`, fd);
    navigate(`/blog/${id}`);
  };

  return (
   <form className="edit-blog-form" onSubmit={submit}>
  <h2>Edit Blog</h2>

  <input
    value={blog.title}
    onChange={e => setBlog({ ...blog, title: e.target.value })}
    placeholder="Blog Title"
    required
  />

  <textarea
    value={blog.content}
    onChange={e => setBlog({ ...blog, content: e.target.value })}
    placeholder="Blog Content"
    required
  />

  <input type="file" onChange={e => setImage(e.target.files[0])} />

  <button type="submit">Update</button>
</form>
  );
}
