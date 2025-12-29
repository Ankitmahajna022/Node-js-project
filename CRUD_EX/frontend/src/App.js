import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const API = "http://localhost:4000/products";

  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
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
    getProduct();
  };

  const edit = (p) => {
    setName(p.name);
    setPrice(p.price);
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

      <button className="add-btn" onClick={submit}>
        {editId ? "Update" : "Add"}
      </button>

      {product.map((p) => (
        <div className="product" key={p._id}>
          <span>
            {p.name} - ₹{p.price}
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
