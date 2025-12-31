import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const createBlog = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("image", image);

  try {
   console.log("Token:", localStorage.getItem("token"));

  await api.post("/blog", form, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });

    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Failed: " + err.response?.data?.message);
  }
};

  return (
    <form onSubmit={createBlog} className="form">
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button type="submit">Create Blog</button>
    </form>
  );
}
