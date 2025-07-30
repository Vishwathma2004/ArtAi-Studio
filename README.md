# ArtAi-Studio

An AI-powered full-stack application that generates SaaS (Software-as-a-Service) product templates based on text input using modern web technologies.

---

## 📌 Project Overview

**ArtAi-Studio** is designed to help users convert ideas or descriptions into functional SaaS product templates with minimal effort. It features a React-based frontend, a Node.js + Express backend, and MongoDB for storage. Authentication, image uploads, and user-specific data storage are all built in.

---

## 🧱 Tech Stack

| Layer     | Technology                          |
|-----------|--------------------------------------|
| Frontend  | React, Tailwind CSS, Framer Motion   |
| Backend   | Node.js, Express.js                  |
| Database  | MongoDB with Mongoose                |
| Auth      | JWT (JSON Web Tokens)                |

---

## 📁 Folder Structure

```plaintext
text-to-saas/
│
├── client/ # React frontend
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/ # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
│
├── .gitignore
├── README.md
└── package.json
```

# ⚙️ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Vishwathma2004/ArtAi-Studio.git
cd ArtAi-Studio
````

### 2️⃣ Install Dependencies

**Frontend:**

```bash
cd client
npm install
```

**Backend:**

```bash
cd ../server
npm install
```

### 🌐 Environment Setup

Create a `.env` file inside the `server/` directory and add:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### ▶️ Running the App

**Start the Backend:**

```bash
cd server
node server.js
```

Or with nodemon:

```bash
nodemon server.js
```

**Start the Frontend:**

```bash
cd client
npm run dev
```

---

## 🔐 Authentication

* **Register:** `POST /api/users/register`
* **Login:** `POST /api/users/login`

Uses JWT tokens for secure routes.

---

## 📦 API Endpoints

### User Routes

* `POST /api/users/register` – Register a user
* `POST /api/users/login` – Login and get token

### Image Routes

* `POST /api/images/upload` – Upload image to DB
* `GET /api/images` – Fetch all user images

Add `Authorization: Bearer <token>` header to protected routes.

---

## 📸 Features

* Live image preview
* Text-to-image and SaaS section generation
* Secure login/register system
* RESTful API design
* Responsive design and animations

---

## 🧑‍💻 Author

**Vishwathma N**
📍 Mangaluru, India
🎓 Computer Science @ SJEC
🔗 [LinkedIn Profile](https://www.linkedin.com/in/vishwathma-n)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🚀 Future Improvements

* Deployment to Vercel / Render
* Payment gateway integration
* Advanced SaaS template customization
* Admin dashboard

---

## 🙌 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a pull request.

```
