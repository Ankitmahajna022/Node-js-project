import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="card">
      <img src={blog.image} alt="" />
      <h3>{blog.title}</h3>
      <p>{blog.description.substring(0, 100)}...</p>

      <Link to={`/edit/${blog._id}`}>Edit</Link>
    </div>
  );
}
