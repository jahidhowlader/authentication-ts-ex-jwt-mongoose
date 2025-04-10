# 🧑‍💻 User Management API

A simple user authentication and management system built with **Zod**, **Mongoose**, and **JWT**. This API provides functionalities like user registration, login, profile update, and admin-based user listing with robust validation and role-based access control.

## 🛠 Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/jahidhowlader/authentication-ts-ex-jwt-mongoose.git
    cd <repository_directory>

2. Create a .env file in the root directory and configure the following variables:
    PORT=<your_port_here>
    DATABASE_URL=<your_mongodb_connection_string>
    BCRIPT_SALT=<your_bcrypt_salt>
    JWT_SECRET=<your_jwt_secret>

3. Install the dependencies:
    npm install

4. Run the application:
    npm start

---

## ✨ Features

### ✅ Create User
- Input validation using **Zod** and **Mongoose**.
- Checks if a user already exists.
- Password is **hashed** before storing.
- Password is **excluded** when fetching users.
- Generates a **unique ID** for each user.

---

### 🔐 Login
- Validates if the user exists.
- Ensures the user is **not deleted** and **not blocked**.
- Matches the input password with the stored hashed password.
- Generates and returns a **JWT token** upon successful login.

---

### 👥 Get All Users (Admin Only)
- Requires **JWT token** in request headers.
- Token is **verified**.
- Admin user is validated:
  - Exists.
  - Not deleted.
  - Not blocked.
  - Has proper **admin role**.
- Returns a list of all users.

---

### ✏️ Update User Profile (Self)
- Requires **JWT token** in request headers.
- Token is **verified**.
- Validates that:
  - User is not deleted.
  - User is not blocked.
  - **Token user ID matches the request parameter ID.**
- Input data is validated using **Zod** and **Mongoose**.
- Updates and returns the user profile.

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **Zod** for schema validation
- **bcrypt** for password hashing
- **JWT** for authentication
- **rateLimiter** for DDos