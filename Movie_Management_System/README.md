📽️ Movie Manager — Full Stack MERN App

A simple and clean Movie Management System built using:

React (frontend)

Express + Node.js (backend API)

MongoDB (database)

Multer for image uploads

Yup validation

Axios API wrapper

This app allows you to:

✔ Add movies
✔ Edit movies
✔ Delete movies
✔ Upload posters
✔ View detailed movie pages
✔ Search movies by title

🚀 Features
🎬 Movie CRUD

Create new movies with:

Title

Description

Genre

Release Year

Poster (image file)

Edit existing movie entries

Delete movies

🔍 Search Functionality

Search by movie title with instant filtering.

📸 Poster Upload

Upload images using multipart form-data.

🖥️ Clean UI

Responsive layout using CSS with flex and grid.

📄 Validated Forms

Using Yup for client-side form validation.

🛠️ Tech Stack
Frontend

React

react-router-dom

Axios

Yup

Backend

Node.js

Express

Multer (file upload)

MongoDB (Mongoose)

📡 API Endpoints
➤ Get all movies

GET /movies

➤ Search movies

GET /movies?q=title

➤ Get single movie

GET /movies/:id

➤ Create movie

POST /movies
(Uses multipart form-data with poster upload)

➤ Update movie

PUT /movies/:id

➤ Delete movie

DELETE /movies/:id

🧩 Project Structure

movie-manager/
 ├── client/        # React frontend
 │   ├── src/
 │   │   ├── api/
 │   │   ├── pages/
 │   │   ├── components/
 │   │   ├── App.js
 │   │   └── styles
 │   └── public/
 ├── backend/       # Express backend
 │   ├── models/
 │   ├── routes/
 │   ├── uploads/
 │   └── server.js
 └── README.md
🧪 Future Improvements

User authentication (login)

Pagination for long movie lists

Rating system

Upload multiple posters

Dark/Light theme toggle

📄 License

MIT License © 2025
You are free to modify and use this project as you like.

If you'd like, I can also generate:

🔥 Backend README
🔥 Frontend-only README
🔥 Screenshot section
🔥 API documentation table