# Blog API

A RESTful API for creating, updating, deleting, and retrieving blogs with user authentication and image uploads.

## Features

- Create, read, update, and delete blogs
- Upload images for blogs
- Associate blogs with authenticated users
- Populate author details when fetching blogs
- Delete old images on update or deletion

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Multer (for file uploads)
- JWT (for authentication)

## Installation

1. Clone the repository:

sbash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git

Install dependencies:
cd YOUR_REPO
npm install

Create a .env file with:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run the server:

npm run dev


API Endpoints

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| POST   | /blogs     | Create a new blog |
| GET    | /blogs     | Get all blogs     |
| GET    | /blogs/:id | Get a single blog |
| PUT    | /blogs/:id | Update a blog     |
| DELETE | /blogs/:id | Delete a blog     |

##video
https://drive.google.com/file/d/1gTVwn1PvSuYIk8TKfQV1zrWbl4mVcOW4/view?usp=sharing
