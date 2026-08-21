# SkillForge API Engine 🚀

✨ Full-stack AI-powered Skill & Career Development Platform! 🎓 Analyze skill gaps, generate AI career roadmaps, and assess technical competencies. Powered by FastAPI, MongoDB, Google GenAI (Gemini), React & Tailwind CSS. Features JWT authentication, role-based access control (Student, Mentor, Admin), and RAG-assisted career guidance! ⚡

> An advanced, full-stack, AI-powered skill and career development platform integrating modern web architectures, a Node.js management layer, and a Python FastAPI AI engine.

---

## ✨ Features

- 🏛️ **Monorepo / Multi-Project Ecosystem** – Centralized repository housing scalable MERN modules, CRUD applications, and expanding backend services.
- 🏗️ **Full-Stack MERN Architecture** – End-to-end integration connecting decoupled React single-page applications with Node.js & Express RESTful APIs.
- ⚡ **Axios API Integration** – Asynchronous client-side HTTP request handling utilizing normalized paths for real-time frontend-backend communication.
- 🔄 **Real-Time CRUD Operations** – Instant UI updates and client state re-rendering on User Creation, Retrieval, Updates, and Deletions.
- 🗄️ **MongoDB & Mongoose Schema Design** – Structured document schemas, explicit data validation, and persistent cloud data management via MongoDB Atlas.
- 🌐 **Dynamic Client-Side Routing** – Multi-view navigation and parameter matching managed via React Router DOM.
- 🎨 **Responsive UI Layer** – Dynamic dark-themed views, adaptive table layouts, and interactive forms styled with modern UI design principles.
- 🚀 **Production-Ready Serverless Deployment** – Cloud deployment configurations utilizing custom `vercel.json` rewrites and serverless function entry points.
- ⚙️ **Centralized Environment Vault** – Secure handling of environment configurations (`MONGO_URI`, `GEMINI_API_KEY`, `SECRET_KEY`) via `.env` integration across modules.
- ⚡ **Optimized Developer Workflow** – Rapid frontend development powered by Vite combined with backend hot-reloading tooling.

---

## 🛠️ Tech Stack & Dependencies

| Tool / Library | Type | Purpose |
| :--- | :--- | :--- |
| **Node.js** | Runtime | Server-side JavaScript execution environment |
| **Express.js** | Backend Framework | Web framework for handling RESTful API routes & HTTP requests |
| **Python / FastAPI** | AI & Core Engine | High-performance Python backend for AI and RAG processing |
| **React.js** | Frontend Library | Declarative UI library for building component-based client views |
| **MongoDB Atlas** | Database | Cloud-hosted NoSQL document database for user data storage |
| **Mongoose** | Backend ODM | Schema-based data modeling and async queries for MongoDB |
| **Axios** | Frontend HTTP Client | Promise-based client for sending HTTP requests to backend endpoints |
| **React Router DOM** | Client Routing | Declarative routing for single-page dynamic view navigation |
| **Vite** | Frontend Tooling | High-performance build tool and hot-reloading dev server |
| **dotenv** | Utility | Loads environment variables from `.env` file into configuration space |
| **CORS** | Backend Middleware | Enables cross-origin resource sharing between React and backend services |
| **Vercel** | Hosting / Serverless | Platform for deploying frontend SPA and serverless backend API functions |

---

## Prerequisites

- **Python** (v3.10 or higher)
- **Node.js** (v16 or higher)
- **MongoDB** (Local or Atlas instance)

---

## 🌐 Deployment & Environment Setup

### 1. MongoDB Atlas Configuration
 Before deploying, ensure your database access is open to Vercel:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Navigate to **Network Access** under Security.
3. Click **Add IP Address** and select **Allow Access from Anywhere** (`0.0.0.0/0`).
4. Save changes.

---

### 2. Environment Variables on Vercel
Set up your environment variables in Vercel before or after deployment:
1. In your Vercel Project Dashboard, go to **Settings ➔ Environment Variables**.
2. Add your environment key-value pairs (e.g., `MONGO_URL`, `JWT_SECRET`, `PORT`).
3. ⚠️ **Important Requirement:** 
   * Ensure **Production**, **Preview**, and **Development** targets are **ALL CHECKED**.
   * **DO NOT toggle on the "Sensitive" option** for `MONGO_URL` to prevent variable save/sync issues.

---

### 3. Deploy to Vercel

1. Push your latest code to GitHub.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"New Project"**.
4. Connect your GitHub repository.
5. Select/Connect the exact project root folder containing `package.json` (to avoid nested directory deployment issues).
6. Configure Build Settings:
   * Vercel automatically detects Vite/Node settings.
   * Toggle the **"Build Command"** switch and manually type `npm run build` to override it (if using a build step).
7. Ensure all Environment Variables (`MONGO_URL`, etc.) are added under the project settings.
8. Click **"Deploy"**.

> 💡 **Note:** If you edit or update any Environment Variable after deploying, always go to the **Deployments** tab, click the three dots (`...`) on the latest deployment, and select **Redeploy** to apply changes! & ***Make sure your project structure strictly follows the root layout:***

```bash
Project_Folder/
├── backend/
├── frontend/
└── vercel.json
```

---

## 📂 Project Directory Structure

**Generated:** 8/21/2026, 9:23:45 PM
**Root Path:** `workspace\SkillForge_LoopLab_Hackathon`

```
├── 📁 app
│   ├── 📁 core
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 config.py
│   │   └── 🐍 security.py
│   ├── 📁 db
│   │   ├── 🐍 __init__.py
│   │   └── 🐍 database.py
│   ├── 📁 services
│   │   ├── 🐍 __init__.py
│   │   └── 🐍 skill_engine.py
│   └── 🐍 __init__.py
├── 📁 backend
│   ├── 📁 config
│   │   └── 📄 db.js
│   ├── 📁 controllers
│   │   ├── 📄 authController.js
│   │   └── 📄 profileController.js
│   ├── 📁 middleware
│   │   └── 📄 authMiddleware.js
│   ├── 📁 models
│   │   ├── 📄 ProfileModel.js
│   │   └── 📄 UserModel.js
│   ├── 📁 routes
│   │   ├── 📄 authRoutes.js
│   │   └── 📄 profileRoutes.js
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── 📄 server.js
├── 📁 docs
│   └── 📄 SkillForge_Project_Presentation_Updated.pptx
├── 📁 frontend
│   ├── 📁 public
│   │   ├── 🖼️ favicon.svg
│   │   └── 🖼️ icons.svg
│   ├── 📁 src
│   │   ├── 📁 api
│   │   │   └── 📄 axios.js
│   │   ├── 📁 components
│   │   │   ├── 📄 AIChat.jsx
│   │   │   └── 📄 Navbar.jsx
│   │   ├── 📁 routes
│   │   │   ├── 📄 Home.jsx
│   │   │   ├── 📄 Login.jsx
│   │   │   ├── 📄 Profile.jsx
│   │   │   ├── 📄 Register.jsx
│   │   │   └── 📄 StudentList.jsx
│   │   ├── 📁 services
│   │   │   └── 📄 aiService.js
│   │   ├── 📄 App.jsx
│   │   ├── 🎨 index.css
│   │   └── 📄 main.jsx
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── 📄 vite.config.js
├── ⚙️ .gitignore
├── 📝 README.md
├── 🐍 main.py
├── 🐍 test_ai.py
└── ⚙️ vercel.json
```

---

# 📦 MERN Stack: Frontend Architecture Setup Guide

This documentation provides a step-by-step guide to setting up a production-ready **Frontend Workspace** for a MERN stack application using **React + Vite**. It covers project initialization, dependency configuration, and local setup—preparing the UI layer to seamlessly connect with an Express/Node.js backend.

## 1. Initialize Vite Project

Run the following command in your terminal:

```bash
npm init vite
```

### During the prompt configuration, fill out the selections exactly like this:

Proceed? y

Project Name: name

Package Name: name

Select a framework: React

Select a variant: JavaScript

Select oxlintrc? Yes

Install with npm? Yes

---

### 💻 How to Run the frontend of the MERN Project Locally

If you want to pull this project and run it again locally, simply execute these commands:

```bash
# Navigate to the project folder
cd Project_dir

# create node_modules folder by running this command
npm i

# Start the local development server
npm run dev
```

---

## 2. Installing Core Dependencies for MERN Stack Backend

Run this command inside your project directory to install npm pakages in pakages.json file:

```bash
npm i axios
npm i react-router-dom
npm i @tailwindcss/vite
```

**It automatically Create package.json if not exists. Like**

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "axios": "^1.19.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.2",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.4",
    "eslint": "^10.8.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^17.7.0",
    "vite": "^8.2.0"
  }
}
```

**Note:** Install packages when needed

---

### Installing Tailwind CSS v4 (Vite)

```bash
npm install tailwindcss @tailwindcss/vite
```

Add plugin to `vite.config.js`:

```js
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
};
```

Add to `index.css`:

```css
@import "tailwindcss";
```

### Setting Up React Router v7 (via `create-react-router`)

Installed using the official React Router CLI as per [reactrouter.com](https://reactrouter.com):

```bash
npx create-react-router@latest
cd my-project
npm run dev
```

Or add to an existing Vite project:

```bash
npm install react-router-dom
```

---

# 📦 MERN Stack: Backend Architecture Setup Guide

## 1. Installing Node.js & NPM
Download and install the LTS version from [Node.js Official Site](https://nodejs.org/).
Verify installation in your terminal:
```bash
node -v
npm -v
```

## 2. Installing MongoDB Community Server & Mongosh
1. Download **MongoDB Community Server** from [MongoDB Download Center](https://www.mongodb.com/try/download/community).
2. Download **MongoDB Shell (`mongosh`)** to run CLI database operations.
3. Start the local server daemon:
```bash
# Verify connection using mongosh CLI
mongosh
```

## 3. Setting Up `package.json` with ES Modules
Initialize your Node project inside any project directory:
```bash
npm init
```

### During the prompt configuration, fill out the selections like this:

package name: (name)

version: (1.0.0) 

description: may add
​
entry point: (server.js)​

test command: just enter​

git repository: (https://github.com/username/repo_name.git)

keywords: may add

author: may add

license: (ISC) may be MIT for open source

type: (commonjs) recommended module

Is this OK? (yes) 

---

### 💻 How to Run the backend of the MERN Project Locally  

If you want to pull this project and run it again locally, simply execute these commands:

```bash
# Navigate to the project folder
cd Project_dir

# create node_modules folder by running this command  
npm i

# Start the local development server
npm start
```

---

To enable modern ES6 `import/export` syntax instead of `require()`, open `package.json` and add `"type": "module"`:
```json
{
  "name": "node",
  "version": "1.0.0",
  "bugs": {
    "url": "https://github.com/username/repo/issues"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/username/repo.git"
  },
  "license": "ISC",
  "author": "",
  "type": "commonjs",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js" // add manually write "nodemon index.js" if installed
  }
}

```

---

## 4. Installing Core Dependencies for MERN Stack Backend
Run this command inside your project directory to install npm pakages in pakages.json file:
```bash
npm i express
npm i mongoose
npm i nodemon
npm i cors
npm i dotenv
npm i cookie-parser
npm i jsonwebtoken
npm i bcryptjs
```

**It automatically Create package.json if not exists. Like**

```json
{
  "name": "skillforge_looplab_hackathon",
  "version": "1.0.0",
  "description": "🎯 SkillForge — AI-powered career roadmap &amp; skill assessment platform for LoopLab LoopLearn Hackathon 2026 🚀 Aligned with UN SDGs 4, 8, 9 &amp; 10 🌍 Built with MERN, Python microservices, RAG, Agentic AI, Docker &amp; K8s.",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/MehmoodCoder/SkillForge_LoopLab_Hackathon.git"
  },
  "keywords": [],
  "type": "module",
  "bugs": {
    "url": "https://github.com/MehmoodCoder/SkillForge_LoopLab_Hackathon/issues"
  },
  "homepage": "https://github.com/MehmoodCoder/SkillForge_LoopLab_Hackathon#readme",
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.9.3",
    "nodemon": "^3.1.14"
  }
}
```

**Note:**  Install packages when needed

---

## 📚 Modern Full-Stack Learning Resources

### ⚛️ Frontend Framework & Build Tools
- [React Documentation](https://react.dev) — *(Official docs for hooks, state management, and modern component architecture)*
- [Vite Guide](https://vitejs.dev) — *(Ultra-fast frontend build tool and local development server)*
- [React Router Documentation](https://reactrouter.com) — *(Client-side routing, page navigation, and dynamic loaders)*
- [Tailwind CSS Documentation](https://tailwindcss.com) — *(Utility-first CSS framework for rapid UI and responsive styling)*

### 🐍 Backend & REST APIs
- [FastAPI Documentation](https://fastapi.tiangolo.com) — *(Modern, high-performance Python framework for building REST APIs)*
- [PyJWT Documentation](https://pyjwt.readthedocs.io) — *(JSON Web Tokens for secure backend authentication and authorization)*

### 🍃 Database & Package Management
- [MongoDB Manual](https://www.mongodb.com/docs/) — *(NoSQL document database, aggregation pipelines, and CRUD operations)*
- [PyMongo Documentation](https://pymongo.readthedocs.io) — *(Official Python driver for MongoDB integration)*
- [NPM Documentation](https://docs.npmjs.com) — *(Node package manager for installing frontend dependencies)*

### 🌐 References & General Tutorials
- [W3Schools Tutorials](https://www.w3schools.com) — *(Quick reference guides for JavaScript, Web APIs, and Node.js)*
- [MDN Web Docs](https://developer.mozilla.org) — *(The gold standard documentation for HTML, CSS, JavaScript, and HTTP standards)*

---

## 👤 Author

**MehmoodCoder**

- 🔗 GitHub: [https://github.com/MehmoodCoder](https://github.com/MehmoodCoder)
- 🌐 Portfolio: [My Portfolio Link](https://mh56-portfolio.vercel.app)

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the API, add new features, or optimize database queries, please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

### **_Happy coding without chai ! ☕_**