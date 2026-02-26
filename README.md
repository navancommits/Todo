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
## 🏗 Screen shots

Frontend:

<img width="857" height="1100" alt="image" src="https://github.com/user-attachments/assets/30765bf2-03e3-4594-a1e7-c60a94f1608d" />


Backend:

<img width="1914" height="1106" alt="image" src="https://github.com/user-attachments/assets/6252c248-42be-4506-a5c8-11baf7b45697" />


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
