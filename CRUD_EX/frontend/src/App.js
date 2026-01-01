import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const API = "http://localhost:4000/products";

  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  

  const getProduct = async () => {
    const res = await axios.get(API);
    setProduct(res.data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const submit = async () => {
    if (editId) {
      await axios.put(`${API}/${editId}`, { name, price });
      setEditId(null);
    } else {
      await axios.post(API, { name, price });
    }

    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    getProduct();
  };

  const edit = (p) => {
    setName(p.name);
    setPrice(p.price);
    setDescription(p.description);
    setCategory(p.category);
    setEditId(p._id);
  };

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);
    getProduct();
  };

  return (
    <div className="container">
      <h1>Product CRUD</h1>

      <input
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button className="add-btn" onClick={submit}>
        {editId ? "Update" : "Add"}
      </button>

      {product.map((p) => (
        <div className="product" key={p._id}>
          <span>
            {p.name} - ₹{p.price} - {p.description} - {p.category}
          </span>
          <div>
            <button className="edit-btn" onClick={() => edit(p)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => remove(p._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
