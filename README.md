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

## 🌿 Branch Structure

This repository follows a clear separation of concerns through Git branches:

- **`frontend` branch**: Contains the Angular-based frontend code.
- **`backend` branch**: Contains the ASP.NET Core backend implementation.

Ensure you check out the correct branch depending on the part of the application you're working with.

---

## 📡 API Endpoints

The backend exposes a RESTful API under three major categories: `Bank`, `Loan`, and `Transfer`.

### 🏦 Bank API

| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| GET    | `/bank/allAcc`     | Get all bank accounts              |
| POST   | `/bank/getAcc`     | Fetch details for a specific account |
| POST   | `/bank/createAcc`  | Create a new bank account          |
| POST   | `/bank/deposit`    | Deposit money into an account      |
| POST   | `/bank/withdraw`   | Withdraw money from an account     |
| GET    | `/bank/alreadyAcc` | Check if account already exists    |
| PUT    | `/bank/editprofile`| Edit user profile information      |
| DELETE | `/bank/delete`     | Delete a bank account              |

---

### 🧾 Loan API

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| POST   | `/loan/homeloan`        | Apply for a home loan                |
| POST   | `/loan/personalLoan`    | Apply for a personal loan            |
| POST   | `/loan/educationLoan`   | Apply for an education loan          |
| GET    | `/loan/getAllRequests`  | Get all loan requests                |
| POST   | `/loan/approve`         | Approve a loan                       |
| POST   | `/loan/reject`          | Reject a loan                        |
| GET    | `/loan/getNumbers`      | Get loan statistics or identifiers   |
| GET    | `/loan/history`         | View loan history                    |
| POST   | `/loan/payment`         | Make a loan payment                  |
| GET    | `/loan/payment-history` | Get payment history for a loan       |

---

### 🔄 Transfer API

| Method | Endpoint                   | Description                         |
|--------|----------------------------|-------------------------------------|
| POST   | `/fromtoAcc`               | Transfer money between two accounts |
| GET    | `/transfer/getAllTransactions` | View all past transactions      |

---

## 🔁 Note

All POST endpoints typically accept JSON payloads. Be sure to include authentication headers if your backend uses JWT or another auth mechanism.
