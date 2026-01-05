import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import "./Home.css"

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AuthContext);

  const loadBlogs = async () => {
    const res = await api.get("/api/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await api.delete(`/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="page">
      <h1>All Blogs</h1>

      <div className="grid">
        {blogs.map(b => {
          const authorId =
            typeof b.author === "object" ? b.author?._id : b.author;

          return (
            <div key={b._id} className="card">
              <div className="card-content">
                <h2 className="card-title">
                  <Link to={`/blog/${b._id}`}>{b.title}</Link>
                </h2>

                <p className="card-text">
                  {b.content.slice(0, 100)}...
                </p>

                {/* ✅ AUTHOR ONLY */}
                {user && (
                  <div style={{ marginTop: "10px" }}>
                    <Link to={`/edit/${b._id}`} className="btn">
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteBlog(b._id)}
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
