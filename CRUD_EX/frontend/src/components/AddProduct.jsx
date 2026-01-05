import { useState } from "react";
import axios from "axios";

export default function AddProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    try {
     await axios.post("http://localhost:4000/products", formData);

      alert("Product Added Successfully ✅");

      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage(null);
      setPreview(null);

    } catch (error) {
      alert(error.response?.data?.message || "Upload failed ❌");
    }
  };

  return (
    <div className="main-fromAdd">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        {preview && (
          <img src={preview} alt="preview" width="200" />
        )}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
