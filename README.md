# 🛒 Mini Ecommerce

A full-stack **MERN** shopping app: browse products, search by name, view details, manage a cart and place orders. Built as a learning project to show how a React frontend, an Express API and MongoDB work together.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209-47A248?logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-339933?logo=node.js&logoColor=white)

## ✨ Features

- **Product catalogue** – product grid with images, ratings and a placeholder fallback for missing images
- **Search** – case-insensitive keyword search on product name (`/search?keyword=...`)
- **Product details** – dedicated page with rating, price, stock status and quantity selector
- **Shopping cart** – add items, change quantity (capped at available stock), remove items, live order summary
- **Place order** – saves the order in MongoDB and decrements product stock
- **Toast notifications** – feedback when items are added to the cart
- **Seed script** – loads 10 sample products into the database with one command

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, React Router 7, React Toastify, Bootstrap 5, Font Awesome (CDN) |
| Backend | Node.js, Express 5, Mongoose 9, CORS, dotenv, Nodemon |
| Database | MongoDB |

## 📁 Project Structure

```
mini-ecommerce/
├── backend/
│   ├── app.js                  # Express server entry point
│   ├── seeder.js               # Seeds the database with sample products
│   ├── config/
│   │   └── connectDatabase.js  # MongoDB connection
│   ├── controllers/            # productControllers.js, orderControllers.js
│   ├── models/                 # productModel.js, orderModel.js
│   ├── routes/                 # product.js, order.js
│   ├── data/products.json      # Sample product data
│   └── .env sample             # Example environment variables
├── frontend/
│   ├── public/images/          # Logo, placeholder and product images
│   └── src/
│       ├── App.js              # Routes and cart state
│       ├── components/         # Header, Footer, Search, ProductCard
│       └── pages/              # Home, ProductDetail, Cart
├── templates/                  # Original static HTML/CSS mockups
├── Explanations/               # File-by-file beginner walkthroughs
└── ARCHITECTURE.md             # Architecture and data-flow diagrams
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.19 or newer (required by Mongoose 9)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally, or a MongoDB Atlas connection string

### 1. Clone the repository

```bash
git clone https://github.com/Makeshkumar103/mini-ecommerce.git
cd mini-ecommerce
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `backend/.env` file (use `.env sample` as a reference):

```env
PORT=8000
NODE_ENV=development
DB_URL=mongodb://localhost:27017/mini-ecommerce
```

Load the sample products, then start the API:

```bash
node seeder.js     # wipes the products collection and inserts the sample data
npm start          # runs the server with nodemon on http://localhost:8000
```

### 3. Set up the frontend

In a second terminal:

```bash
cd frontend
npm install
npm start          # opens http://localhost:3000
```

The frontend reads the API address from `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:8000/api/v1
```

## 🔌 API Reference

Base URL: `http://localhost:8000/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/products` | List all products |
| `GET` | `/products?keyword=phone` | Search products by name (case-insensitive) |
| `GET` | `/product/:id` | Get a single product by its MongoDB id |
| `POST` | `/order` | Create an order and reduce stock |

**`POST /order`** – request body is the cart array:

```json
[
  { "product": { "_id": "64f...", "name": "OPPO F21S Pro 5G", "price": 245.7, "stock": 5 }, "qty": 2 }
]
```

Response:

```json
{ "success": true, "message": "Order placed successfully!", "order": { "amount": "491.40", "status": "pending", "...": "..." } }
```

## 🗄️ Data Models

**Product** – `name`, `price`, `description`, `ratings`, `images[{ image }]`, `category`, `seller`, `stock`, `numOfReviews`, `createdAt`

**Order** – `cartItems[]`, `amount`, `status` (starts as `pending`), `createdAt` / `updatedAt`

## 🔄 How It Works

1. **Home** fetches `GET /products` and renders a card per product. The search box navigates to `/search?keyword=...`, which re-fetches with the keyword.
2. **Product page** fetches `GET /product/:id`; *Add to Cart* stores `{ product, qty }` in React state (held in `App.js`).
3. **Cart** lets the user adjust quantities and totals, then sends the whole cart to `POST /order`.
4. The backend calculates the total, saves the order and subtracts each item's quantity from stock.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for diagrams and the [`Explanations/`](./Explanations) folder for a file-by-file walkthrough.

## ⚠️ Known Limitations & Roadmap

This is a learning project, so some things are intentionally simple:

- [ ] No user accounts or authentication
- [ ] Cart lives in React state and is lost on page refresh (could use `localStorage` or a cart API)
- [ ] No payment integration – orders are saved with status `pending`
- [ ] Prices and stock are stored as strings in the schemas; `Number` would be safer
- [ ] No input validation on `POST /order`, and stock is updated outside a database transaction
- [ ] No automated tests yet

## 🤝 Contributing

Issues and pull requests are welcome. Fork the repo, create a feature branch and open a PR.

## 👤 Author

**Makeshkumar** – [@Makeshkumar103](https://github.com/Makeshkumar103)
