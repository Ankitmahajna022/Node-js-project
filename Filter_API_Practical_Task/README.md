📦 Product Filter API
Built using Express.js, MongoDB, and Mongoose
This project demonstrates how to create multiple GET routes to filter Product data using different query conditions such as name, brand, category, price range, rating, sorting, and pagination.

🚀 Features / Routes Included
✅ 1. Fetch all products
bash
Copy code
GET /api/products/
✅ 2. Fetch product by ID
bash
Copy code
GET /api/products/id/:id
✅ 3. Search by productName (case-insensitive)
pgsql
Copy code
GET /api/products/search/name?name=iphone
✅ 4. Search by brand
sql
Copy code
GET /api/products/search/brand?brand=Samsung
✅ 5. Search by multiple fields (name + category + brand)
sql
Copy code
GET /api/products/search/multi?productName=phone&category=Mobile&brand=Samsung
✅ 6. Filter by category
bash
Copy code
GET /api/products/category?category=Electronics
✅ 7. Filter by price range
arduino
Copy code
GET /api/products/price?min=1000&max=5000
✅ 8. Filter products by rating
bash
Copy code
GET /api/products/rating?rating=4
✅ 9. Sort products by price
sql
Copy code
GET /api/products/sort?order=asc
GET /api/products/sort?order=desc
✅ 10. Pagination
bash
Copy code
GET /api/products/pagination?page=1&limit=5
Response includes:
nginx
Copy code
totalProducts  
totalPages  
currentPage  
products  
✅ 11. BONUS – Advanced filtering
Combine multiple filters in one route:

pgsql
Copy code
GET /api/products/filter?category=Mobile&minPrice=10000&rating=4&sort=asc&page=2&limit=5
🛠 Technologies Used
Node.js

Express.js

MongoDB

Mongoose

Postman (for API testing)

🗂 Folder Structure
arduino
Copy code
project/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── productController.js
│
├── models/
│   └── productModel.js
│
├── routes/
│   └── productRoutes.js
│
├── server.js
└── README.md
🗄 Product Model (Mongoose Schema)
js
Copy code
productName: { type: String, required: true },
category: { type: String, required: true },
brand: { type: String, required: true },
price: { type: Number, required: true },
rating: { type: Number, default: 0 },
description: String,
createdAt: { type: Date, default: Date.now }
📌 Pagination Explanation (Simple for Students)
Pagination is used to divide a large number of items into smaller pages.
Instead of sending all data at once, we only send the required page.

Example:
If there are 100 products and limit is 10:

Page	Products Returned
1	1 – 10
2	11 – 20
3	21 – 30
...	...
10	91 – 100

⚠ Error Handling
If no data matches the filter, API returns:

json
Copy code
{
  "message": "No products found"
}
📬 POST Route (Add Product)
bash
Copy code
POST /api/products/add-product
Sample JSON:

json
Copy code
{
  "productName": "Samsung S24 Ultra",
  "category": "Mobile",
  "brand": "Samsung",
  "price": 89999,
  "rating": 4.8,
  "description": "Latest Samsung flagship"
}
🧪 Testing With Postman
Students must test:

✔ GET all products
✔ GET by ID
✔ Search by name
✔ Search by brand
✔ Combined search
✔ Price range
✔ Rating filter
✔ Sorting
✔ Pagination
✔ Bonus multi-filter
✔ Add product (POST)

▶ How to Run the Project
1. Install dependencies
nginx
Copy code
npm install
2. Start MongoDB
(MongoDB Compass or local MongoDB server)

3. Run server
powershell
Copy code
npm start
Server runs on:

arduino
Copy code
http://localhost:5000
If you want, I can also generate:

✅ A full zipped project
✅ Postman collection
✅ Video explanation script

video link:https://drive.google.com/file/d/1d2zYHqIvBruD4aTNSftpao_WbT__EvR1/view?usp=sharing