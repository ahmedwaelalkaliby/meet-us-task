# 🛍️ Yeshtery Login Task

A simple **Next.js 15 + Tailwind CSS** authentication flow using the **App Router**, **API Routes**, **Redux Toolkit**, and **Cookies** for secure state management.
The project manages login, logout, and user persistence with clean Redux logic and Sonner for toast notifications.

---

## 🚀 Tech Stack

* Next.js 15 (App Router)
* Tailwind CSS
* Redux Toolkit + React Redux
* TypeScript
* Sonner (toast notifications)
* Yup + React Hook Form (form validation)

---

## ⚙️ Features

* Login with email and password
* Secure token storage using HTTP-only cookies
* Persistent authentication with Redux Toolkit
* Fetch user data from a protected endpoint
* Logout and clear authentication state
* Toast notifications for success and error handling
* Asynchronous API calls handled with createAsyncThunk

---

## 🧱 Redux Authentication Flow

The authentication flow is built using Redux Toolkit.
It includes three main async actions:

* **loginUser** — Authenticates the user and stores token cookies.
* **getUserData** — Fetches user info using the stored token.
* **logoutUser** — Clears the authentication session and Redux state.

The Redux slice manages the loading, success, and error states and updates the UI accordingly.

---

## 🧠 Store Integration

Redux is configured as a global store and provided to the entire app using React Redux.
All components can access authentication status, user data, or loading states through Redux hooks.

---

## 🔐 API Endpoints

* `/api/auth/login` → Authenticates the user and sets the token cookie
* `/api/auth/user` → Retrieves user data for authenticated users
* `/api/auth/logout` → Logs out and clears cookies

---

## 🧩 Environment Variables

Use a `.env.local` file based on `.env.example` to store your API base URL or other environment settings.

---

## 🧠 Development

Install dependencies and start the development server:

* `npm install`
* `npm run dev`

The project will run locally at **[http://localhost:3000](http://localhost:3000)**

---

## 🧹 Notes

* Redux Toolkit now handles all authentication logic.
* Toast notifications use **Sonner** for user feedback.
* Axios has been replaced with the native Fetch API.
* Cookies remain **HTTP-only** for secure token handling.
