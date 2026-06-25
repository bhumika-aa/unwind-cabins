# UnwindCabins MERN Platform 🌲

A fully functional, production-ready MERN stack application designed for booking beautiful countryside cabins. 

Built with **React 19, Vite, Node.js, Express, and MongoDB**, featuring robust JWT authentication, drag-and-drop Cloudinary image management, automated Email notifications via Mailtrap, and a comprehensive Admin Dashboard.

---

## 🌟 Features

### 🏡 Public Platform
- **Modern UI/UX**: Pixel-perfect translation of a premium Figma design using TailwindCSS and Framer Motion.
- **Dynamic Cabin Listings**: View real cabins fetched from MongoDB with advanced sorting and filtering.
- **Booking Engine**: Date calculation and secure booking request handling.
- **Experiences & Blogs**: SEO-friendly dynamic pages for travel inspiration.
- **Interactive Map Placeholder & Contact**: Functional contact forms that dispatch automated emails.
- **User Dashboard**: Secure area to view your upcoming bookings and wishlist.

### 🛡️ Secure Authentication
- **JWT & HTTP-Only Cookies**: Iron-clad session management.
- **Forgot/Reset Password**: Automated reset tokens with 10-minute expirations and HTML email links.
- **Protected Routes**: Automatic redirection for unauthenticated or unauthorized users.

### 🛠️ Complete Admin Dashboard
- **Image Management**: Drag & Drop `<ImageUploader />` directly connected to Cloudinary. Deleting entities cleans up orphaned Cloudinary assets automatically.
- **Cabin CRUD**: Manage all cabin listings, upload galleries, and adjust pricing.
- **User CRUD**: Toggle admin privileges or suspend users securely.
- **Booking Management**: Approve, reject, cancel, or refund user bookings.
- **Content Management**: Manage Blogs, Experiences, and Reviews directly from the UI.
- **Communication Management**: Read contact messages and manage newsletter subscribers.

---

## 🏗️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS (v4), Framer Motion, React Router DOM, Axios, React Hook Form, SwiperJS, React Hot Toast.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas, Mongoose (Models & Middlewares).
- **File Storage**: Cloudinary (Memory Storage & Stream Uploads).
- **Email Service**: Nodemailer + Mailtrap (SMTP).
- **Security**: bcryptjs, jsonwebtoken, DOMPurify.

---

## 📂 Folder Structure

```
internship/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # API route logic (Cabins, Auth, Bookings, Users, etc.)
│   ├── middlewares/     # JWT Auth, Error Handling, and Multer configs
│   ├── models/          # Mongoose Schemas (User, Cabin, Booking, etc.)
│   ├── routes/          # Express route definitions
│   ├── utils/           # Nodemailer, Cloudinary streams, Custom Error handlers
│   ├── server.js        # Express Application Entry Point
│   └── seeder.js        # Script to populate database with mock data
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components (Navbar, Footer, ImageUploader, etc.)
    │   ├── context/     # Global React Context (AuthContext)
    │   ├── pages/       # Route-level components (Home, Dashboard, Admin, etc.)
    │   ├── services/    # Axios interceptors and API services
    │   ├── App.jsx      # Application Router
    │   └── main.jsx     # React DOM entry point
    ├── index.html
    ├── tailwind.css     # Global styles & Tailwind directives
    └── vite.config.js   # Vite configuration and API proxy
```

---

## 🚀 Installation & Local Development

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Cloudinary Account
- Mailtrap Account

### 2. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0...
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=30d
JWT_COOKIE_EXPIRES_IN=30

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USERNAME=your_mailtrap_username
EMAIL_PASSWORD=your_mailtrap_password
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_FROM=UnwindCabins <noreply@unwindcabins.com>

FRONTEND_URL=http://localhost:5173
```

### 4. Run the Application

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🗄️ Database Seeding

To quickly populate your local or Atlas database with sample Cabins, Users, Blogs, Experiences, Bookings, and Reviews, use the included seeder script:

```bash
cd backend
node seeder.js
```
*Note: Ensure your MongoDB connection allows access from your current IP address.*

---

## 🌐 API Documentation Reference

All API routes are prefixed with `/api`. Standard responses follow a `{ success: true, data: [...] }` format.

- **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`, `/api/auth/forgotpassword`, `/api/auth/resetpassword/:token`
- **Cabins**: `/api/cabins` (GET, POST), `/api/cabins/:id` (GET, PUT, DELETE)
- **Bookings**: `/api/bookings` (GET, POST), `/api/bookings/:id` (GET, PUT, DELETE)
- **Users (Admin)**: `/api/users` (GET, POST), `/api/users/:id` (GET, PUT, DELETE)
- **Blogs**: `/api/blogs` (GET, POST), `/api/blogs/:id` (GET, PUT, DELETE)
- **Experiences**: `/api/experiences` (GET, POST), `/api/experiences/:id` (GET, PUT, DELETE)
- **Uploads**: `/api/upload` (POST, DELETE), `/api/upload/multiple` (POST)

---

## 🚢 Deployment Instructions

### Backend (Render, Heroku, Railway)
1. Add a `start` script to `package.json`: `"start": "node server.js"`.
2. Push your code to GitHub.
3. Connect your repository to your hosting provider.
4. Add all environment variables from your `.env` to the provider's dashboard.
5. Deploy.

### Frontend (Vercel, Netlify)
1. Update `services/api.js` `baseURL` to point to your deployed backend URL.
2. Push your code to GitHub.
3. Import the `frontend/` directory into Vercel/Netlify.
4. Set the build command to `npm run build` and output directory to `dist`.
5. Deploy.
