# MartialVerse 🌏🥋

MartialVerse is a global platform to explore the world of martial arts through curated blogs, videos, playlists, and cultural insights. Built with a modern stack for seamless performance and rich content delivery.

---

## 📁 Branch Structure

- `main` — contains the **Frontend** code (React + Tailwind + Clerk)
- `Backendmaster` — contains the **Backend** code (Node.js + Express + MongoDB)


## 🧱 Tech Stack

**Frontend:**

* React (Vite)
* Clerk for Auth
* Tailwind CSS
* Cloudinary for image storage
* Lenis for smooth scroll
* React Parallax for parallax effect

**Backend:**

* Node.js with Express
* MongoDB with Mongoose
* Render for deployment

---

## 🔧 Getting Started

### 📦 Backend Setup

#### 1. Navigate to backend folder:

```bash
cd Backend
```

#### 2. Install dependencies:

```bash
npm install
```

#### 3. Create `.env` file:

```env
MONGO_URI=your_mongo_connection_uri
PORT=5000
PRIMARY_ADMIN_EMAIL=
CLIENT_ORIGIN=https://electratrust.vercel.app
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
FRONTEND_SECRET=
```

#### 4. Run the server:

```bash
npm run dev
```

---

### 💻 Frontend Setup

#### 1. Navigate to frontend folder:

```bash
cd Frontend
```

#### 2. Install dependencies:

```bash
npm install
```

#### 3. Create `.env` file:

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_SUPER_ADMIN_EMAIL=
VITE_API_URL=https://martialversebackend.onrender.com
VITE_FRONTEND_SECRET=
VITE_EDITOR_API_KEY=
```

#### 4. Start the dev server:

```bash
npm run dev
```

This will run the frontend at `http://localhost:5173` by default.

---

## 🚀 Deployment

* **Frontend**: [https://martialverse.vercel.app](https://martialverse.vercel.app)
* **Backend**: [https://martialversebackend.onrender.com](https://martialversebackend.onrender.com)

---

## 📚 Features

* 🔐 Secure authentication using Clerk
* 📸 Upload and preview images using Cloudinary
* 📘 Create and browse rich content via editor API
* 🎖️ Admin role with moderation control
* 🌍 Cultural exploration of martial arts globally

---

## 🧪 Recommended Enhancements

* Add automated tests
* Optimize SEO metadata
* Add PWA support

---

## 📜 License

MIT — feel free to use and extend.


