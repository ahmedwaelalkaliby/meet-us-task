# 🛍️ Yeshtery Login Task

A simple Next.js 15 + Tailwind CSS login flow using **Next.js App Router**, **API Routes**, and **Cookies** for authentication.  
The project handles login securely with backend token storage and uses Sonner for toast notifications.

---

## 🚀 Tech Stack
- **Next.js 15 (App Router)**
- **Tailwind CSS**
- **Axios** (for backend API calls)
- **Sonner** (toast notifications)
- **Yup + React Hook Form** (form validation)

---

## ⚙️ Features
- Login with email and password  
- Token stored securely in **HTTP-only cookies**  
- `/api/auth/user` for protected routes  
- Simple Dashboard page with logout  
- Toast feedback for success/errors  
- No state management library — since the user info API currently returns **401**, there’s no user data to store  

---

## 🧩 Environment Variables

Create a `.env.local` file based on `.env.example`:

## 🧠 Development

npm install
npm run dev


## 🧹 Notes

No Redux/Zustand is used — the user info endpoint returns 401, so no persistent state was needed.
Authentication is handled entirely via secure cookies.