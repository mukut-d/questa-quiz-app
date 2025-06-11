# 📚 Questa – Quiz Creation & Sharing Platform

Questa is a fullstack quiz application that enables authenticated users to create, manage, and share quizzes publicly. Anyone with the link can respond to a quiz without authentication, while creators can view and analyze submissions securely.

---

## 🎯 Objective

Build and deploy a secure, full-featured quiz platform that demonstrates foundational fullstack skills including:

- API development
- Authentication
- Database integration
- Deployment

---

## 🚀 Live Demo

🔗 [Visit Live App](https://your-live-link.vercel.app)

> 🧪 Use these sample credentials to test:
>
> - Email: `demo@questa.com`
> - Password: `questa123`

---

## 🛠 Tech Stack

| Category   | Stack                      |
| ---------- | -------------------------- |
| Framework  | Next.js 15 (App Router)    |
| Language   | TypeScript                 |
| Styling    | Tailwind CSS v4, shadcn/ui |
| Database   | PostgreSQL (via Supabase)  |
| ORM        | Prisma                     |
| Auth       | BetterAuth / Supabase Auth |
| Deployment | Vercel                     |

---

## 🔐 Authentication

- Email-based signup & login
- Persistent sessions
- UI updates dynamically based on auth state
- Only authenticated users can create or view their quizzes
- Public users can view and respond to shared quizzes

---

## ⚙️ Core Features

### ✅ Authenticated User Actions

- Create a quiz with a title and at least 2 questions:
  - Single-choice (radio buttons)
  - Short text input
- View quiz via generated public link
- View all responses submitted to their quizzes

### 🌍 Public User Actions

- Access quizzes via `/quiz/[id]`
- Submit responses without logging in
- Answers are stored securely in the database

---

## 🧱 Backend API Endpoints

| Route                      | Method | Description                             |
| -------------------------- | ------ | --------------------------------------- |
| `/api/quizzes`             | POST   | Create a new quiz                       |
| `/api/quizzes/[id]`        | GET    | Fetch a public quiz                     |
| `/api/quizzes/[id]/submit` | POST   | Submit a quiz response                  |
| `/api/user/quizzes`        | GET    | Fetch quizzes created by logged-in user |
| `/api/quiz/[id]/responses` | GET    | Get all responses for a quiz            |

> Built using **Next.js Route Handlers (App Router)** and securely connected to PostgreSQL via Prisma.

---

## 🖥️ Screenshots

<!-- Add screenshots here -->
<!-- ![Homepage](./public/screenshots/homepage.png) -->

---

## 📦 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/questa.git
   cd questa
   ```
