📦 Product Filter API
Built using Express.js, MongoDB, and Mongoose
This project demonstrates how to create multiple GET routes to filter Product data using different query conditions such as name, brand, category, price range, rating, sorting, and pagination.

🚀 Features / Routes Included
✅ 1. Fetch all products
GET /api/products/
✅ 2. Fetch product by ID
GET /api/products/id/:id
✅ 3. Search by productName (case-insensitive)
GET /api/products/search/name?name=iphone
✅ 4. Search by brand

GET /api/products/search/brand?brand=Samsung
✅ 5. Search by multiple fields (name + category + brand)

GET /api/products/search/multi?productName=phone&category=Mobile&brand=Samsung
✅ 6. Filter by category
GET /api/products/category?category=Electronics
✅ 7. Filter by price range
GET /api/products/price?min=1000&max=5000
✅ 8. Filter products by rating
GET /api/products/rating?rating=4
✅ 9. Sort products by price

GET /api/products/sort?order=asc
GET /api/products/sort?order=desc
✅ 10. Pagination
GET /api/products/pagination?page=1&limit=5
Response includes:
totalProducts  
totalPages  
currentPage  
products  
✅ 11. BONUS – Advanced filtering
Combine multiple filters in one route:
GET /api/products/filter?category=Mobile&minPrice=10000&rating=4&sort=asc&page=2&limit=5
🛠 Technologies Used
Node.js

Express.js

MongoDB

Mongoose



✅ A full zipped project
✅ Postman collection
✅ Video explanation script

video link:https://drive.google.com/file/d/1d2zYHqIvBruD4aTNSftpao_WbT__EvR1/view?usp=sharing