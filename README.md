# 🎓 Modern Exam & Diploma Management Platform

A robust, full-stack Next.js application built to efficiently manage online exams, diplomas, and users. Featuring sophisticated role-based access control, a rich interactive dashboard, and a comprehensive audit logging system.

## 🚀 Tech Stack

- **Framework:** Next.js (App Router, Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Radix UI, Shadcn UI
- **State & Data Fetching:** React Query (@tanstack/react-query)
- **Form Management:** React Hook Form
- **Authentication:** NextAuth.js
- **Icons:** Lucide React

## ✨ Key Features

### 🔐 Advanced Authentication & Authorization

- Complete user registration and login flow.
- Password management (Forgot/Reset password integrations).
- Email verification hooks.
- Secure, role-based routing protecting User vs. Admin dashboards.

### 🛡️ Dashboard & Role Management

- **Admin Dashboard:** Access detailed insights, manage exams, assign diplomas, configure platform settings, and monitor detailed user activity.
- **User Dashboard:** Personalized hub for users to view assigned diplomas, track progress, manage their profiles, and take specific exams.
- Utilizes Next.js parallel and intercepted routes (`@admin`, `@user`) for seamless role-based UI separation.

### 📋 Exams & Diplomas Engine

- Create, read, update, and delete diploma programs.
- Complex exam and questions management module.
- Support for bulk question uploading and editing.
- Responsive pagination and skeleton loading states for a better UX.

### 🔍 Audit Logging System

- Comprehensive tracking for admin events and user actions.
- Actionable logs screen with robust server-side search and filtering features (by Category, Action, User ID, Date).

## 📂 Project Structure

```bash
├── components/          # Reusable UI components (Shadcn, Radix)
├── public/              # Static assets (fonts, icons, images)
├── src/
│   ├── app/             # Next.js App Router (Layouts, API routes, parallel routes)
│   ├── features/        # Feature-based modular architecture
│   │   ├── auth/              # Auth screens, forms, APIs, and hooks
│   │   ├── dashboard-admin/   # Admin specific capabilities (logs, exams management)
│   │   ├── dashboard-user/    # User specific capabilities
│   │   └── account-settings/  # Cross-role profile and settings views
│   └── shared/          # Globally shared types, hooks, context, and constants
```

## 🛠️ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended) and a package manager such as `npm`, `yarn`, `pnpm`, or `bun`.

### Installation

1. Clone the repository and navigate into the directory:

   ```bash
   git clone <repository-url>
   cd exam
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root of the project and populate it with your configuration (e.g., API URL, NextAuth secrets).

   ```env
   NEXT_PUBLIC_API_URL=http://your-backend-api.com
   NEXTAUTH_SECRET=your_super_secret_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to explore the app.

## 🤝 Contributing

Contributions, issues, and feature requests are highly appreciated. Feel free to check out the issues page if you want to contribute.

## 📄 License

This project is licensed under the MIT License.
