# React Auth System (Redux Toolkit + RTK Query + Refresh Token)

A modern and scalable authentication frontend built with **React**, **Redux Toolkit**, and **RTK Query**.

This project is not just a basic login page — it includes a full authentication workflow:

- Login
- Signup
- Email Verification
- Resend Verification Email
- Forgot Password
- Reset Password
- Protected Routes
- Automatic Refresh Token Handling (Re-auth on 401)

This repository demonstrates a clean, real-world approach to building authentication logic using modern frontend best practices.

## Key Features

- React + React Router v6
- Redux Toolkit (`createSlice`) for auth state management
- RTK Query (`createApi`) for API layer
- JWT authentication with **Access Token + Refresh Token**
- Auto token refresh (if access token expires)
- Form handling with **Formik**
- Strong validation with **Yup validation schemas**
- Toast notifications using **React Toastify**
- Clean UI with **React-Bootstrap**
- Reusable architecture and maintainable folder structure

## Backend API (Required)

You must clone and run the backend API first:

```bash
git clone <https://github.com/Mehmet-Durmus/aspnet-core-jwt-auth-api/tree/main>
```

### 1) Clone this repository

```bash
gitclone https://github.com/hasamuddinafz/react-auth-rtk-query.git
cd react-auth-rtk-query
```

### 2) Install dependencies

```bash
npm install
```

This installs all required libraries (`react`, `redux toolkit`, `rtk query`, `formik`, `yup`, `toastify`, etc.)

### 3) Create `.env` file

Create a file named `.env` in the project root:

```
REACT_APP_API_URL=http://localhost:5000/api
```

> Make sure the URL matches your backend API base address.

### 4) Start the project

```bash
npm start
```

Frontend will run on:

- `http://localhost:3000`

## Authentication Architecture Overview

This project follows the standard secure JWT auth design:

### Access Token

- Used for authenticated requests
- Short-lived token
- Sent inside request headers:
  - `Authorization: Bearer {token}`

### Refresh Token

- Long-lived token
- Used to obtain a new access token when it expires

## Redux Toolkit Auth Slice (`authSlice`)

The authentication state is managed using Redux Toolkit.

### Stored Values

- `accessToken`
- `refreshToken`
- `expiration`

This structure ensures:

- UI can react instantly to auth changes
- Tokens are persisted even after page refresh

Example:

```jsx
const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  expiration: localStorage.getItem("tokenExpiration") || null,
};
```

## `setCredentials()` How Login State is Persisted

When authentication succeeds, the backend returns token data.

The frontend stores them using the `setCredentials()` reducer:

```jsx
setCredentials: (state, action) => {
  const { accessToken, refreshToken, expiration } = action.payload;

  state.accessToken = accessToken;
  state.refreshToken = refreshToken;
  state.expiration = expiration;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("tokenExpiration", expiration);
};
```

### Why this matters?

Because in real projects:

- Redux is reset on page refresh
- localStorage ensures persistence across reloads

This approach provides a stable user experience.

## `logout()` Clean Logout Implementation

The logout reducer clears both:

- Redux state
- localStorage

```jsx
logout: (state) => {
  state.accessToken = null;
  state.refreshToken = null;
  state.expiration = null;

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpiration");
};
```

## RTK Query API Layer

API requests are built using RTK Query services.

This allows:

- clean code
- automatic caching
- request lifecycle states (`isLoading`, `isSuccess`, `isError`)
- centralized API logic

Example (Auth Service):

```jsx
exportconst authService =createApi({
reducerPath:"authApi",
  baseQuery,
endpoints:(builder) => ({
login: builder.mutation({
query:(credentials) => ({
url:"/Auth/LogIn",
method:"POST",
body: credentials,
      }),
    }),

refreshToken: builder.mutation({
query:(data) => ({
url:"/Auth/RefreshTokenLogIn",
method:"POST",
body: data,
      }),
    }),

isLoggedIn: builder.query({
query:() =>"/Auth/IsLoggedIn",
    }),
  }),
});
```

## Automatically Injecting JWT into Requests (`prepareHeaders`)

Every API request automatically includes the access token:

```jsx
prepareHeaders: (headers, { getState }) => {
  const token =
    getState()?.auth?.accessToken || localStorage.getItem("accessToken");

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  headers.set("Content-Type", "application/json");
  return headers;
};
```

This keeps components clean and prevents repetition.

## Refresh Token Auto Re-Auth (401 → Refresh → Retry)

One of the most important parts of this project is the automatic refresh flow.

### How it works:

1. A protected request is sent normally
2. If access token is expired → backend returns `401 Unauthorized`
3. The frontend sends a refresh request
4. If refresh succeeds:
   - update tokens using `setCredentials()`
   - retry the original request automatically
5. If refresh fails:
   - logout user

### `userId` is extracted from the JWT `sub` claim

Instead of storing `userId` in localStorage, the refresh request uses:

```jsx
userId = jwtDecode(accessToken)?.sub;
```

This is cleaner and avoids unnecessary identity storage.

## ProtectedRoute Component

Private pages (like Dashboard) are protected using a reusable component:

```jsx
import { useSelector }from"react-redux";
import {Navigate }from"react-router-dom";

constProtectedRoute = ({ children }) => {
const accessToken =useSelector((state) => state.auth.accessToken);

if (!accessToken) {
return<Navigateto="/login"replace />;
  }

return children;
};

exportdefaultProtectedRoute;
```

### Example usage

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## Forms & Validation (Formik + Yup)

This project uses **Formik** for form state management and **Yup schemas** for validation.

This approach keeps:

- inputs clean
- validation reusable
- errors consistent across screens

### Example Formik usage pattern

```jsx
<Formik
  initialValues={{email:"",password:"" }}
  validationSchema={LoginSchema}
  onSubmit={handleSubmit}
>
```

### Validation is separated into schema files

Instead of writing rules inside components, schemas are placed in a dedicated folder:

- `login.schema.js`
- `signup.schema.js`
- `forgot-password.schema.js`
- etc.

This improves maintainability and keeps UI code simple.

## Auth Screens Included

This project includes a full auth lifecycle, not just login/signup:

- Login
- Sign Up
- Email Verification
- Resend Verification Email
- Forgot Password
- Reset Password
- Dashboard (Protected)

Each screen integrates:

- API requests via RTK Query
- Formik + Yup validation
- Toast notifications
- clean UI components

## Debugging & Testing

To test the refresh token logic:

- Use a short-lived access token on the backend (1–2 minutes)
- Navigate to Dashboard
- Trigger a protected request
- Observe:
  - request fails with 401
  - refresh request fires
  - original request is retried successfully

## What This Project Demonstrates

This project demonstrates that I can design and implement:

- a complete authentication system
- scalable Redux Toolkit + RTK Query architecture
- token persistence and secure handling
- refresh token strategy for real-world apps
- form validation patterns used in production
- reusable protected route systems
- clean, maintainable React code structure

## Credits

This project uses an external backend API for JWT authentication.

### Backend API Author

**Mehmet Durmuş**

### Backend Repository

- GitHub: https://github.com/Mehmet-Durmus/aspnet-core-jwt-auth-api
- Branch used: `main`
- Clone command:

```bash
git clone https://github.com/Mehmet-Durmus/aspnet-core-jwt-auth-api.git
```
