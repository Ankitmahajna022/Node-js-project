import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./SingleBlog.css"

export default function SingleBlog() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBlog = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}`
      );
      setBlog(res.data);
    } catch (err) {
      setError("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlog();
  }, [id]);

  if (loading) return <div className="loader"></div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  const authorId =
    typeof blog.author === "object" ? blog.author?._id : blog.author;

  return (
    <div className="page">
      <h1 className="card-title">{blog.title}</h1>

      {blog.image && (
        <img
          src={`${import.meta.env.VITE_API_URL}/${blog.image}`}
          alt={blog.title}
          style={{ width: "100%", maxWidth: "500px", margin: "20px 0" }}
        />
      )}

      <p className="card-text">{blog.content}</p>

      {user&&( 
        <div style={{ marginTop: "20px" }}>
          <Link to={`/edit/${blog._id}`} className="btn">
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}
