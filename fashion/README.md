👗 Fashion Store Management System

A complete backend API for managing fashion products like clothing, footwear & accessories using Node.js, Express, and MongoDB.


🚀 Tech Stack
| Technology         | Purpose          |
| ------------------ | ---------------- |
| Node.js            | Backend Runtime  |
| Express.js         | Server & Routing |
| MongoDB            | Database         |
| Mongoose           | ODM for MongoDB  |
| Postman (optional) | API Testing      |

📂 Project Structure
fashion-store/
│
├─ server.js                   → Main server file
│
├─ config/
│   └── db.js                  → MongoDB connection
│
├─ models/
│   └── Fashion.model.js       → Mongoose schema/model
│
├─ controllers/
│   └── Fashion.controller.js  → CRUD logic for products
│
├─ routes/
│   └── Fashion.routes.js      → Product CRUD routes
│
└─ middleware/
    └── logger.js              → Custom logger middleware


🌐 API Endpoints (CRUD)
| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | `/api/fashion`     | Add new product  |
| GET    | `/api/fashion`     | Get all products |
| PUT    | `/api/fashion/:id` | Update product   |
| DELETE | `/api/fashion/:id` | Delete product   |

🛍 Sample Product JSON (Post in Postman)
{
  "productId": "TSH1001",
  "name": "Sports T-Shirt",
  "brand": "Nike",
  "category": "Clothing",
  "subCategory": "Sportswear",
  "gender": "Male",
  "price": 599,
  "description": "High quality cotton t-shirt",
  "imageUrl": "https://example.com/tshirt.jpg"
}

📌 Middleware Used
| Name           | Purpose                      |
| -------------- | ---------------------------- |
| cors           | Allow frontend access        |
| logger         | Logs each request to console |
| express.json() | Parse JSON bodies            |


🏁 Status

✔ Backend API completed
🔜 Frontend React UI Coming soon… 🚀

❤️ Author

Ankit Mahajan
📍 India
📧 Contact anytime for improvements & suggestions!

If you want, I can also:

✔ Create Frontend UI
✔ Add Search, Filter, Pagination
✔ Upload Images to Cloudinary
✔ User Authentication (JWT)

🎥 Video Demonstration

Watch the full walkthrough of the Fashion Store Management System in action! 👇

🔗Video Demo:
👉 
