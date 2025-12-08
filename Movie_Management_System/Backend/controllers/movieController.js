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
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const updatedData = {};

    if (req.body.title) updatedData.title = req.body.title;
    if (req.body.description) updatedData.description = req.body.description;
    if (req.body.genre) updatedData.genre = req.body.genre;
    if (req.body.releaseYear) {
      updatedData.releaseYear = Number(req.body.releaseYear);
    }

    if (req.file && req.file.filename) {
      deleteFileIfExists(movie.poster);
      updatedData.poster = req.file.filename;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      updatedData,
      { new: true } 
    );

    res.json({ message: "Movie updated successfully", movie: updatedMovie });
    
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
