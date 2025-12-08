import React, { useState, useEffect } from "react";
import * as yup from "yup";
import "./MovieForm.css";

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
    existingPoster: null,
  };

  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
      setPreview(initialValues.existingPoster || null);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = async (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    await validateField(name, formData[name]);
  };

  const validateField = async (field, value) => {
    try {
      const parsedValue = field === "releaseYear" && value === "" ? null : value;
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

    await onSubmit(formData);
    setIsSubmitting(false);

    if (!initialValues?.title) {
      setFormData(defaultForm);
      setPreview(null);
      setErrors({});
      setTouched({});
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, poster: file }));
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <div>
        <label>Title*</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {touched.title && errors.title && (
          <div className="error-text">{errors.title}</div>
        )}
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label>Genre</label>
        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label>Release Year</label>
        <input
          type="number"
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {touched.releaseYear && errors.releaseYear && (
          <div className="error-text">{errors.releaseYear}</div>
        )}
      </div>

      <div>
        <label>Poster (image)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isSubmitting}
        />
      </div>

      {preview && (
        <img
          src={preview}
          alt="Poster Preview"
          width="150"
          className="poster-preview"
        />
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
