import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:4000/products";
const IMAGE_URL = "http://localhost:4000/uploads";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(API)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="productList-main">
      <h2>Product List</h2>

      {products.map((p) => (
        <div key={p._id}>
          {p.image && (
            <img
              src={`http://localhost:4000/${p.image}`}
              width="150"
              alt={p.name}
            />

          )}
          <h4>{p.name}</h4>
          <p>{p.price}</p>
          <p>{p.category}</p>
        </div>
      ))}
    </div>
  );
}
