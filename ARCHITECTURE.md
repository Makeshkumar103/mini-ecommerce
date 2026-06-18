# JVL-Ecommerce Architecture

## System Overview

```mermaid
graph TB
    subgraph Frontend ["Frontend - React (port 3000)"]
        A[index.js] --> B[App.js]
        B --> C[Header.js]
        B --> D[Footer.js]
        B --> E[Home.js]
        B --> F[ProductDetail.js]
        B --> G[Cart.js]
        C --> H[Search.js]
        E --> I[ProductCard.js]
    end

    subgraph Backend ["Backend - Express (port 8000)"]
        J[app.js] --> K[routes/product.js]
        J --> L[routes/order.js]
        K --> M[controllers/productControllers.js]
        L --> N[controllers/orderControllers.js]
        M --> O[models/productModel.js]
        N --> P[models/orderModel.js]
        N --> O
        J --> Q[config/connectDatabase.js]
    end

    subgraph Database ["MongoDB"]
        R[(mini-ecommerce)]
    end

    Frontend -- HTTP fetch --> Backend
    Q --> R
    O --> R
    P --> R
```

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser as React SPA
    participant API as Express API
    participant DB as MongoDB

    User->>Browser: Open / (Home)
    Browser->>API: GET /api/v1/products
    API->>DB: Product.find({})
    DB-->>API: products[]
    API-->>Browser: JSON { products }
    Browser-->>User: Render ProductCards

    User->>Browser: Click product link
    Browser->>API: GET /api/v1/product/:id
    API->>DB: Product.findById(id)
    DB-->>API: product
    API-->>Browser: JSON { product }
    Browser-->>User: Render ProductDetail

    User->>Browser: Add to Cart
    Browser->>Browser: setCartItems([...prev, item])

    User->>Browser: Place Order
    Browser->>API: POST /api/v1/order { cartItems }
    API->>DB: Order.create({cartItems, amount, status})
    API->>DB: Product.findByIdAndUpdate(stock - qty)
    DB-->>API: order
    API-->>Browser: JSON { success: true }
    Browser-->>User: "Order Completed"

    User->>Browser: Search keyword
    Browser->>API: GET /api/v1/products?keyword=phone
    API->>DB: Product.find({name: /phone/i})
    DB-->>API: filtered products
    API-->>Browser: JSON { products }
    Browser-->>User: Render filtered ProductCards
```

## File Dependency Graph

```
frontend/public/index.html
  └── (loads React bundle)

frontend/src/index.js
  ├── React
  ├── ReactDOM
  ├── ./index.css
  └── ./App

frontend/src/App.js
  ├── ./App.css                          (styling)
  ├── ./components/Header                (nav bar)
  │     ├── ./Search                     (keyword input)
  │     │     ├── react (useState)
  │     │     └── react-router-dom (useNavigate)
  │     └── react-router-dom (Link)
  ├── ./components/Footer                (footer)
  ├── ./pages/Home                       (product listing)
  │     ├── react (useEffect, useState)
  │     ├── react-router-dom (useSearchParams)
  │     └── ../components/ProductCard    (card UI)
  │           └── react-router-dom (Link)
  ├── ./pages/ProductDetail              (product details + add to cart)
  │     ├── react (useEffect, useState)
  │     ├── react-router-dom (useParams)
  │     └── react-toastify (toast)
  ├── ./pages/Cart                       (cart management + order)
  │     ├── react (useState)
  │     └── react-router-dom (Link)
  ├── react-router-dom (BrowserRouter, Routes, Route)
  ├── react (useState)
  └── react-toastify (ToastContainer, CSS)

backend/app.js (entry point)
  ├── dotenv         →  backend/config/config.env
  ├── express
  ├── cors
  ├── ./config/connectDatabase
  │     └── mongoose  →  backend/config/config.env (DB_URL)
  ├── ./routes/product
  │     └── ../controllers/productControllers
  │           └── ../models/productModel → mongoose
  └── ./routes/order
        └── ../controllers/orderControllers
              ├── ../models/orderModel  → mongoose
              └── ../models/productModel → mongoose
```

## Route Map

| Method | URL | Component / Controller | Description |
|--------|-----|----------------------|-------------|
| `GET` | `/` | `Home.js` | Product listing page |
| `GET` | `/search?keyword=...` | `Home.js` | Filtered product listing |
| `GET` | `/product/:id` | `ProductDetail.js` | Single product details |
| `GET` | `/cart` | `Cart.js` | Shopping cart |
| `GET` | `/api/v1/products` | `getProducts` | API: all/filtered products |
| `GET` | `/api/v1/product/:id` | `getSingleProduct` | API: single product |
| `POST` | `/api/v1/order` | `createOrder` | API: place order |

## State Management

```
App.js (useState)
  └── cartItems ──props──► Header.js (cart count badge)
  └── cartItems, setCartItems ──props──► ProductDetail.js (add to cart)
  └── cartItems, setCartItems ──props──► Cart.js (display, modify, order)
```

## Component Tree

```mermaid
graph TB
    App[App.js - BrowserRouter]
    App --> Toast[ToastContainer]
    App --> Header[Header.js]
    Header --> Search[Search.js]
    App --> Routes
    Routes --> Home[Home.js /]
    Home --> PC[ProductCard.js]
    Home --> PC2[ProductCard.js]
    Home --> PCn[...]
    Routes --> PD[ProductDetail.js /product/:id]
    Routes --> Cart[Cart.js /cart]
    App --> Footer[Footer.js]
```

## Key Configuration

| File | Key Settings |
|------|-------------|
| `backend/config/config.env` | PORT=8000, DB_URL=mongodb://localhost:27017/mini-ecommerce |
| `frontend/.env` | REACT_APP_API_URL=http://localhost:8000/api/v1 |
| `backend/package.json` | Express 5, Mongoose 9, Cors, Dotenv |
| `frontend/package.json` | React 19, React Router DOM 7, React Toastify 11 |
