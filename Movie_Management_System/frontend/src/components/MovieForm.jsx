import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title required"),
  releaseYear: yup.number().min(1800, "Year seems wrong").max(new Date().getFullYear(), "Year in future").nullable()
});

export default function MovieForm({ initialValues, onSubmit }) {
  const formik = useFormik({
    initialValues: initialValues || { title: "", description: "", genre: "", releaseYear: "", poster: null },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Title*</label><br/>
        <input name="title" value={formik.values.title} onChange={formik.handleChange} />
        {formik.touched.title && formik.errors.title && <div style={{color:'red'}}>{formik.errors.title}</div>}
      </div>

      <div>
        <label>Description</label><br/>
        <textarea name="description" value={formik.values.description} onChange={formik.handleChange} />
      </div>

      <div>
        <label>Genre</label><br/>
        <input name="genre" value={formik.values.genre} onChange={formik.handleChange} />
      </div>

      <div>
        <label>Release Year</label><br/>
        <input name="releaseYear" value={formik.values.releaseYear} onChange={formik.handleChange} />
        {formik.touched.releaseYear && formik.errors.releaseYear && <div style={{color:'red'}}>{formik.errors.releaseYear}</div>}
      </div>

      <div>
        <label>Poster (image)</label><br/>
        <input type="file" name="poster" accept="image/*" onChange={(e) => {
          formik.setFieldValue("poster", e.currentTarget.files[0]);
        }} />
      </div>

      <button type="submit">Save</button>
    </form>
  );
}
