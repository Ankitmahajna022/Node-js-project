import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { api } from "../api/api";
import './MovieForm.css';

const schema = yup.object().shape({
  title: yup.string().required("Title required"),
  releaseYear: yup
    .number()
    .typeError("Year must be a number")
    .min(1800, "Year seems wrong")
    .max(new Date().getFullYear(), "Year is in the future")
    .nullable(),
});

export default function MovieForm({ initialValues, onSubmit }) {
  const defaultForm = {
    title: "",
    description: "",
    genre: "",
    releaseYear: "",
    poster: null,
  };

  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({
        ...prev,
        ...initialValues,
      }));
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = async (e) => {
    const { name } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    await validateField(name, formData[name]);
  };

  const validateField = async (field, value) => {
    try {
      const parsedValue =
        field === "releaseYear" && value === "" ? null : value;

      await yup.reach(schema, field).validate(parsedValue);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [field]: err.message }));
    }
  };

  const validateForm = async () => {
    try {
      const payload = {
        ...formData,
        releaseYear:
          formData.releaseYear === "" ? null : Number(formData.releaseYear),
      };

      await schema.validate(payload, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((e) => (newErrors[e.path] = e.message));

      setErrors(newErrors);

      setTouched(
        Object.keys(formData).reduce((a, c) => ((a[c] = true), a), {})
      );

      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const valid = await validateForm();
    if (!valid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("description", formData.description || "");
      fd.append("genre", formData.genre || "");

      if (formData.releaseYear)
        fd.append("releaseYear", formData.releaseYear);

      if (formData.poster) fd.append("poster", formData.poster);

      const res = await api.post("/movies", fd);

      alert("Movie saved!");

      setFormData(defaultForm);
      setTouched({});
      setErrors({});

      onSubmit && onSubmit(res.data);
    } catch (err) {
      console.error(err);
      alert("Error saving movie");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      poster: e.target.files[0],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <div>
        <label>Title*</label><br />
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {touched.title && errors.title && (
          <div style={{ color: "red" }}>{errors.title}</div>
        )}
      </div>

      <div>
        <label>Description</label><br />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label>Genre</label><br />
        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label>Release Year</label><br />
        <input
          type="number"
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {touched.releaseYear && errors.releaseYear && (
          <div style={{ color: "red" }}>{errors.releaseYear}</div>
        )}
      </div>

      <div>
        <label>Poster (image)</label><br />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
