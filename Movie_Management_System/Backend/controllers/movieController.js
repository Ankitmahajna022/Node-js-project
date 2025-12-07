import Movie from "../models/movieModels.js"; 
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deleteFileIfExists = (filename) => {
  if (!filename) return;
  const filePath = path.resolve(__dirname, "../uploads", filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export const createMovie = async (req, res) => {
  try {
    const { title, description, genre, releaseYear } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const posterFile = req.file?.filename || null;

    const movie = await Movie.create({
      title,
      description,
      genre,
      releaseYear: releaseYear ? Number(releaseYear) : null,
      poster: posterFile,
    });

    res.status(201).json({ message: "Movie created", movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMovies = async (req, res) => {
  try {
    const q = req.query.q || "";
    const filter = q ? { title: { $regex: q, $options: "i" } } : {};

    const movies = await Movie.find(filter).sort({ createdAt: -1 });
    res.json({ movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json({ movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    if (req.file) {
      deleteFileIfExists(movie.poster);
      movie.poster = req.file.filename;
    }

    movie.title = req.body.title ?? movie.title;
    movie.description = req.body.description ?? movie.description;
    movie.genre = req.body.genre ?? movie.genre;
    movie.releaseYear = req.body.releaseYear
      ? Number(req.body.releaseYear)
      : movie.releaseYear;

    await movie.save();

    res.json({ message: "Movie updated", movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    deleteFileIfExists(movie.poster);
    await Movie.deleteOne({ _id: req.params.id });

    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
