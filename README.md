# 📚 Questa – Quiz Creation & Sharing Platform

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel&logoColor=white)](https://questa-quiz-hmv8gysiy-mukut-ds-projects.vercel.app/dashboard)

**Questa** is a fullstack quiz application that enables authenticated users to create, manage, and analyze quizzes. Quizzes can be shared publicly, and anyone with the link can respond—no login required!

---

## 🚀 Live Demo

🔗 [Visit Live App](https://questa-quiz-hmv8gysiy-mukut-ds-projects.vercel.app/dashboard)

> 🧪 **Sample Login Credentials**
>
> - Email: `demo@questa.com`
> - Password: `questa123`

---

## 🎯 Objective

To build and deploy a modern, secure, and full-featured quiz platform showcasing:

- End-to-end fullstack development
- Authentication and public access control
- Robust API routes and DB operations
- Deployment with environment separation

---

## 🛠 Tech Stack

| Category   | Stack                   |
| ---------- | ----------------------- |
| Framework  | Next.js 15 (App Router) |
| Language   | JavaScript              |
| Styling    | Tailwind CSS v4         |
| Database   | MongoDB Atlas           |
| Auth       | Firebase Authentication |
| Deployment | Vercel                  |

---

## 🔐 Authentication

- Firebase-based email/password auth
- Persistent sessions using client-side state
- Auth-based route protection
- Only logged-in users can create/view quizzes
- Public quizzes require no login to attempt

---

## ⚙️ Core Features

### 👤 For Authenticated Users

- Create quizzes with:
  - Short-text questions
  - Multiple-choice options
- View quiz dashboard
- Access shareable public quiz link
- View and analyze all quiz submissions

### 🌍 For Public Users

- Access quiz via unique URL
- Attempt quiz without logging in
- Responses saved securely in MongoDB

---

## 🔄 API Endpoints

| Route                      | Method | Description                             |
| -------------------------- | ------ | --------------------------------------- |
| `/api/quizzes`             | POST   | Create a new quiz                       |
| `/api/quizzes/[id]`        | GET    | Get a specific quiz                     |
| `/api/responses`           | POST   | Submit answers to a quiz                |
| `/api/quiz/[id]/responses` | GET    | Get all responses for a quiz            |
| `/api/quiz/[id]/combined`  | GET    | Fetch quiz and its associated responses |

> All routes built using **Next.js Route Handlers** and MongoDB integration

---

## 🖼️ Screenshots

<!-- Add screenshots here -->
<!-- ![Dashboard](./public/screenshots/dashboard.png) -->
<!-- ![Quiz View](./public/screenshots/quiz_view.png) -->

---

## 🧪 Local Development Setup

```bash
git clone https://github.com/yourusername/questa.git
cd questa

# Install dependencies
npm install

# Create a .env.local and add Firebase + MongoDB config

# Run the app
npm run dev
```
