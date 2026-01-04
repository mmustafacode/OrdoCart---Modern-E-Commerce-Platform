# 🛍️ OrdoCart - Premium E-Commerce Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-success?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

> **Experience the future of online shopping.** OrdoCart is a state-of-the-art e-commerce solution built for performance, scalability, and an immersive user experience.

---

## ✨ Features

### 👤 For Users

| Feature                | Description                                                           |
| :--------------------- | :-------------------------------------------------------------------- |
| **🔐 Secure Auth**     | JWT-based authentication with HTTP-only cookies for maximum security. |
| **🔍 Smart Search**    | Global search functionality to find products instantly.               |
| **🛒 Seamless Cart**   | Persistent cart management that remembers your choices.               |
| **❤️ Wishlist**        | Save your favorite items locally to view later.                       |
| **💳 Smooth Checkout** | typically streamlined shipping and payment flow.                      |
| **📱 Responsive**      | Fully optimized for mobile, tablet, and desktop devices.              |

### 🛠️ For Admins

| Feature                    | Description                                                    |
| :------------------------- | :------------------------------------------------------------- |
| **📊 Analytics Dashboard** | Real-time insights into Revenue, Orders, and User growth.      |
| **📦 Product Management**  | Easy-to-use interface to create, update, and manage inventory. |
| **👥 User Control**        | Manage user accounts and roles effortlessly.                   |
| **🚚 Order Tracking**      | Track and update order statuses in real-time.                  |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v16+)
- **MongoDB** (Local or Atlas URI)
- **Cloudinary Account** (For image hosting)

### 1. Clone the Repository

```bash
git clone https://github.com/mmustafacode/OrdoCart---Modern-E-Commerce-Platform.git
cd OrdoCart---Modern-E-Commerce-Platform
```

### 2. Backend Setup

Configure and start the server.

```bash
cd backend
npm install
```

**Create a `.env` file** in the `backend` folder:

```properties
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Start the Server:**

```bash
npm run dev
```

### 3. Frontend Setup

Launch the user interface.

```bash
# Open a new terminal
cd frontend
npm install
npm run dev
```

🚀 **Visit:** `http://localhost:5173`

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** [React 19](https://react.dev/) (Vite)
- **State:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Auth:** JWT & Bcrypt
- **Storage:** Cloudinary

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<p align="center">
  Built with ❤️ by <b>Mustafa Code</b>
</p>
