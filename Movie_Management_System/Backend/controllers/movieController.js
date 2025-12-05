import Movie from "../models/movieMpdels.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

 const deleteFileIfExists = (filename) => {
    if (filename) return
    const filePath = path.resolve(__dirname, "../uploads", filename);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
    }
}

export const createMovie = async (req, res) => {
    try {
        const { title, description, genre, releaseYear } = req.body

        if (!title) return res.status(400).json({ message: "Title is required" });

        const posterFile = req.file ? req.file.filename : null

        const movie = new Movie({
            title,
            description,
            genre,
            releaseYear: releaseYear ? Number(releaseYear) : undefined,
            poster: posterFile
        })

        await movie.save()
        res.status(201).json({ message: "Movie created", movie });
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export const getMovies = async (req, res) => {
  try {
    const q = req.query.q || "";
    const filter = q ? { title: { $regex: q, $options: "i" } } : {};

    const movies = await Movie.find(filter).sort({ createdAt: -1 });
    res.json({ movies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMovieById= async (req, res) => {
    try {
        const movie = Movie.findById(req.params.id)
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        res.json({ movie })
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

export const updateMovie = async (req, res) => {
    try {
        const movie = Movie.findById(req.params.id)
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        if (req.file) {
            deleteFileIfExists(movie.poster)
            movie.poster = req.file.filename;
        }

        const { title, description, genre, releaseYear } = req.body;
        movie.title = title ?? movie.title;
        movie.description = description ?? movie.description;
        movie.genre = genre ?? movie.genre;
        movie.releaseYear = releaseYear ? Number(releaseYear) : movie.releaseYear;

        movie.save();
        res.json({ message: "Movie updated", movie });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        deleteFileIfExists(movie.poster);
        await Movie.deleteOne({ _id: req.params.id });
        res.json({ message: "Movie deleted" });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}