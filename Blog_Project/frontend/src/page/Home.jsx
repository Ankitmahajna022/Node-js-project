import { useEffect, useState } from "react";
import api from "../api/axios";
import BlogCard from "../components/BlogCard.jsx";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api.get("/blog").then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="grid">
      {blogs.map(b => <BlogCard key={b._id} blog={b} />)}
    </div>
  );
}
