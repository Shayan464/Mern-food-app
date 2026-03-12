# 🍔 Food Ordering MERN Application

A full-stack **Food Ordering Web Application** built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.
This platform allows customers to browse food items, add them to the cart, place orders, and track their order status.

An **admin panel** is also included where administrators can manage food items and update order statuses.

## 🌐 Live Links

🔗 **Customer Website**
https://mern-food-app-o9z0.onrender.com

🛠 **Admin Dashboard**
https://mern-food-app-admin-wuu3.onrender.com

⚙ **Backend API**
https://mern-food-app-backend-3ops.onrender.com


---

# 🚀 Features

## 👤 Customer Features

* Browse available food items
* Add food items to cart
* Remove items from cart
* Place food orders
* Track order status
* Secure authentication using JWT

## 🛠 Admin Features

* Add new food items
* Delete food items
* View customer orders
* Update order status (Pending, Preparing, Delivered)
* Manage food menu dynamically

---

# 🧑‍💻 Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Context API
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* REST API

### Database

* MongoDB Atlas
* Mongoose ODM

---

# 📂 Project Structure

```
Food-Delivery-App
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   └── assets
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── config
│
└── admin
    ├── components
    └── pages
```

---

# ⚙️ Installation

### 1️⃣ Clone the Repository

```
git clone https://github.com/Shayan464/Mern-food-app.git
```

### 2️⃣ Install Backend Dependencies

```
cd backend
npm install
```

### 3️⃣ Install Frontend Dependencies

```
cd frontend
npm install
```

### 4️⃣ Setup Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5️⃣ Run Backend

```
npm run server
```

### 6️⃣ Run Frontend

```
npm run dev
```

---

# 🛒 Application Flow

```
User Signup/Login
        ↓
Browse Food Menu
        ↓
Add Items to Cart
        ↓
Place Order
        ↓
Order Stored in MongoDB
        ↓
Admin Updates Order Status
```

---

# 📸 Screens

* Food Menu
* Cart Page
* Order Page
* Admin Dashboard

---

# 🔐 Authentication

User authentication is implemented using **JWT (JSON Web Tokens)** to secure API endpoints.

---

# 📦 API Endpoints

## User

```
POST /api/user/register
POST /api/user/login
```

## Food

```
GET /api/food/list
POST /api/food/add
POST /api/food/remove
```

## Orders

```
POST /api/orders/place
POST /api/orders/userorders
```

---

# 🎯 Future Improvements

* Online payment integration
* Real-time order tracking
* Notifications for order updates
* Improved UI and animations
* Mobile responsive improvements

---

# 👨‍💻 Author

**Shayan Khan**

Full Stack Developer | MERN Stack
