
# 🎓 Modern Exam & Diploma Management Platform


<img width="1536" height="1024" alt="exam-app" src="https://github.com/user-attachments/assets/926b9aa2-a676-4cde-8ff5-12b54b3946e0" />


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



