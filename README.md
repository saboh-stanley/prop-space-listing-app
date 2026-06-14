
# 🏠 PropSpace - Property Listing Application

A full-stack web application where users can list, view, update, and delete properties for rent or sale. Built with React, Node.js, Express, and MongoDB.

## ✨ Features

### User & Authentication Management
- User registration with unique email and username
- Passwords salted and hashed using SHA256
- JWT (JSON Web Token) authentication
- Protected routes requiring valid token

### Account Management Dashboard
- Update profile name, phone number, and avatar URL
- Change password with current password verification

### Property Listings (CRUD)
- **Create**: Authenticated users can add property listings
- **Read (Public)**: Anyone can view all properties with search/filter
- **Read (Private)**: Users can view only their own listings in dashboard
- **Update**: Authors can edit their own properties (others blocked)
- **Delete**: Authors can delete their own properties (others blocked)
- **Search/Filter**: Filter by city or price range

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 |
| Backend | Node.js + Express |
| Database | MongoDB (NoSQL) |
| Authentication | JWT + SHA256 |
| HTTP Client | Axios |

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/saboh-stanley/prop-space-listing-app.git
   cd prop-space-listing-app
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Create .env file** in root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/prop_space
   JWT_SECRET=your_super_secret_key_here
   ```

5. **Start MongoDB**
   ```bash
   mongod
   ```

6. **Run the application**
   
   Terminal 1 (Backend):
   ```bash
   npm start
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm start
   ```

7. **Open browser** at `http://localhost:3000`

## 📡 API Endpoints

### User Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/register` | Register new user | Public |
| POST | `/api/users/login` | Login user | Public |
| GET | `/api/users/profile` | Get user profile | Private |
| PUT | `/api/users/profile` | Update profile | Private |
| PUT | `/api/users/password` | Change password | Private |

### Property Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/properties` | Get all properties (with filters) | Public |
| GET | `/api/properties/:id` | Get single property | Public |
| POST | `/api/properties` | Create new property | Private |
| GET | `/api/properties/user/listings` | Get user's properties | Private |
| PUT | `/api/properties/:id` | Update property (author only) | Private |
| DELETE | `/api/properties/:id` | Delete property (author only) | Private |

### Query Parameters for Filtering

| Parameter | Type | Description |
|-----------|------|-------------|
| `city` | string | Filter by city (case-insensitive) |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |

## 📁 Project Structure

```
prop_space/
├── backend/
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth middleware
│   ├── models/          # Database models
│   └── routes/          # API routes
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth context
│   │   ├── pages/       # Page components
│   │   └── services/    # API service
├── server.js
├── .env
└── package.json
```

## 👨‍💻 Author

**GitHub:** [@saboh-stanley](https://github.com/saboh-stanley)

**Project Link:** [https://github.com/saboh-stanley/prop-space-listing-app](https://github.com/saboh-stanley/prop-space-listing-app)

---




