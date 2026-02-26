# TODO Application – Angular + .NET

This repository contains a full-stack TODO application built with:

- **Frontend:** Angular (Standalone Components, Reactive Forms, RxJS)
- **Backend:** ASP.NET Core Web API (.NET 8+)
- **Storage:** In-memory repository (no database required)

Development Environment:

- Visual Studio Community Edition 2026
- Visual Studio Code

The application allows users to:

- View TODO items
- Add new TODO items
- Delete TODO items

---

## 🏗 Architecture Overview

### Backend (ASP.NET Core)

- Clean layered structure:
  - Controller
  - Service
  - Repository
- In-memory data store using `Singleton` lifetime
- RESTful API design
- Swagger enabled for API exploration (port 7291)
- xUnit test project included

### Frontend (Angular)

- Standalone component architecture (port 4201)
- Reactive Forms
- RxJS with `BehaviorSubject` for reactive state
- Async pipe for automatic UI updates
- Proxy configuration to avoid CORS issues 
- No manual change detection

---

## 📂 Solution Structure

todo-solution/
│
├── backend/
│ ├── Todo.Api/
│ └── Todo.Api.Tests/
│
├── frontend/
│ └── todo-ui/
│
└── README.md
