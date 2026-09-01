# 📸 React Instagram Clone

A modern, responsive **Instagram Web Clone** built with **React 19**, **Vite**, **React Router v7**, **Axios**, and **JSON Server**. 

This project was built as a practical hands-on learning journey to master modern React development, component-driven architecture, asynchronous API handling, and **full-stack CRUD operations**.

---

## 🚀 Key Learnings & Practiced Concepts

### 1. 🔄 Full CRUD Operations in React with Axios
Implemented complete **Create, Read, Update, Delete** workflows interacting with a RESTful backend (`json-server`):

| Operation | HTTP Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Create** | `POST` / `PUT` | `/followers` | Add new followers dynamically with custom username and profile image. |
| **Read** | `GET` | `/posts`, `/followers`, `/suggestions` | Fetch posts, profile details, follower lists, and suggestions on component mount. |
| **Update** | `PUT` | `/posts/:id`, `/followers/:id` | Update profile information (username, bio, avatar) and edit follower details inline. |
| **Delete** | `DELETE` | `/followers/:id` | Remove followers / unfollow users and update the React UI state seamlessly. |

---

### 2. ⚛️ React Core Concepts & Hooks
- **`useState`**: Managing complex UI states, including modals, active tabs, form inputs, loading indicators, and optimistic data lists.
- **`useEffect`**: Handling lifecycle events, fetching initial data on mount, and synchronizing state with backend APIs.
- **Component Architecture & Reusability**: Breaking down the app into modular, single-responsibility components (`Sidebar`, `Feed`, `Story`, `Post`, `Suggestions`, `Profile`).
- **Controlled Components & Forms**: Handling real-time user input validation, state synchronization, and submission workflows.
- **File & Image Uploading**: Using the browser's `FileReader` API to convert local images to Base64 data URLs for avatar updates.
- **Props & Event Handling**: Passing data and callbacks between parent and child components efficiently.

---

### 3. 🌐 Client-Side Routing (`react-router-dom`)
- Configured declarative multi-page routing with `<Routes>` and `<Route>`.
- Programmatic navigation using the `useNavigate` hook for seamless transitions between the main feed and user profile.

---

### 4. 🔗 REST API Integration & Async Handling
- Executing asynchronous requests using `axios` with `async/await` and `.then() / .catch()`.
- Managing asynchronous states (`isSaving`, `isLoading`, `error`) to provide clear visual feedback to the user.
- Setting up and managing a local mock REST API server with **JSON Server** (`db.json`).

---

### 5. 🎨 Responsive UI & Modern CSS Styling
- Pixel-perfect Instagram-inspired aesthetic with clean typography, borders, and modal dialogs.
- Flexible layouts using **CSS Flexbox** and **CSS Grid**.
- Story ring gradient animations, interactive action icons (Like, Comment, Share, Bookmark), and sticky sidebars.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool / Bundler**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Mock Backend**: [JSON Server](https://github.com/typicode/json-server)
- **Styling**: Vanilla CSS (Custom Design System)

---

## ✨ Features

- 🏠 **Home Feed**: Displays stories carousel and a dynamic feed of posts with captions, like counts, and comments.
- 💡 **Suggestions & Follow System**: Suggests accounts with real-time **Follow / Unfollow** toggle synchronized with the database.
- 👤 **Interactive Profile Page**:
  - View post stats, bio, and image grid.
  - **Edit Profile**: Modify username, description/bio, and upload a new profile picture.
  - **Followers Manager (Full CRUD)**:
    - View all followers in an interactive modal.
    - Add new followers with custom details.
    - Edit existing follower information.
    - Remove followers with confirmation prompts.
- 📱 **Navigation Sidebar**: Quick access to Home, Search, Explore, Messages, Notifications, and Profile.

---

## 📂 Project Structure

```text
instagram-clone/
├── public/                 # Static assets (profile & post images)
├── src/
│   ├── assets/             # Icons (Like, Comment, Share, Bookmark, Navigation)
│   ├── App.jsx             # Main application layout & route definitions
│   ├── feed.jsx            # Feed container combining stories and posts
│   ├── index.css           # Global stylesheet and responsive layout rules
│   ├── main.jsx            # React root entry point
│   ├── post.jsx            # Post component with likes, comments, and captions
│   ├── profile.jsx         # Profile page with Edit Profile & Followers CRUD modal
│   ├── sidebar.jsx         # Navigation sidebar with route links
│   ├── story.jsx           # Stories bar with gradient avatar highlights
│   └── suggestions.jsx     # Suggested users widget with follow/unfollow toggle
├── db.json                 # Mock database for posts, followers, and suggestions
├── package.json            # Project dependencies and npm scripts
└── vite.config.js          # Vite configuration
```

---

## 💻 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18+) installed on your machine.

### 2. Clone the Repository
```bash
git clone https://github.com/Jamesaathithyandev/React-Instagram-Clone.git
cd React-Instagram-Clone
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Mock Backend (JSON Server)
In a separate terminal, run:
```bash
npm run json-server
```
*JSON Server will start at `http://localhost:5000`.*

### 5. Start the Vite Development Server
In another terminal, run:
```bash
npm run dev
```
*Open your browser and navigate to `http://localhost:5173`.*

---

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server. |
| `npm run json-server` | Starts the mock REST API backend watching `db.json` on port 5000. |
| `npm run build` | Builds the production bundle. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues. |

---

## 🎯 Summary of Practical Skills Gained

1. Designing scalable and maintainable React component structures.
2. Handling real-world asynchronous API lifecycles and HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
3. Managing local and global UI state without relying on heavy external state libraries.
4. Implementing user-friendly UX patterns such as modals, loading states, and optimistic UI updates.
5. Debugging and resolving JSON schema, routing, and CORS/REST API synchronization challenges.
