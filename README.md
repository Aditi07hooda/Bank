# 💳 Bank Management Web Application

## 📝 Introduction

This project is a **full-stack banking web application** designed to simulate the core features of an online banking system. It allows users to manage bank accounts, request and track various types of loans, and perform secure transactions. The application is divided into:

- A **frontend** built using **Angular** and **Angular Material**.
- A **backend** developed in **ASP.NET Core (C#)** with **Entity Framework Core** for data access and SQL-backed migrations.

---

## 🌟 Features

### User Features
- Secure login and authentication (likely via JWT)
- View and edit personal profile details
- Transfer money between accounts
- Apply for various loan types: education, home, and personal loans
- View loan status and history
- Track transaction history

### Admin/Bank Features
- View and manage customer accounts
- Approve or reject loan applications
- Update loan statuses and manage payments

---

## 🧰 Technologies Used

### 🔹 Frontend – Angular

- **Angular 19**: Latest stable version offering modularity and robust component architecture.
- **Angular Material & CDK**: For responsive UI components, dialog boxes, snackbars, etc.
- **NgRx**: For reactive state management using `Store`, `Effects`, and `Devtools`.
- **RxJS**: For reactive programming and observable data streams.
- **CoreUI**: For modern admin dashboard styling and structure.
- **TypeScript**: Strongly typed language that compiles to JavaScript.
- **Zone.js**: Angular's async context management.

#### Development Tools:
- `@angular/cli`: For managing Angular workspace and commands.
- `karma`, `jasmine`: For unit testing.

---

### 🔹 Backend – ASP.NET Core

- **.NET 8.0**: The application uses the latest .NET version for performance, support, and minimal APIs.
- **ASP.NET Core MVC**: To expose RESTful APIs.
- **Entity Framework Core**: For ORM-based database interactions with migration support.
- **JWT Authentication**: For secure, stateless user session management.
- **Controllers**: Include functionality for banking operations, transfers, and loans.
- **Services**: Handle business logic like payment processing, loan handling, etc.
- **Database Context (`BankDatabaseContext`)**: EF Core's DbContext managing models like `Bank`, `Loan`, `TransactionHistory`.

#### Core Backend Components:
- `Controllers/`: Handle routing and API endpoints.
- `Models/`: Define entities like `Loan`, `Bank`, and `TransactionHistory`.
- `Services/`: Contain core logic for loan processing, transfers, etc.
- `HttpReqObject/`: Contain DTOs for various requests like editing profile, transferring money.
- `Migrations/`: EF Core migrations to manage DB schema over time.
