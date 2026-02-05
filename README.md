# 📚 Bookstack: The Modern Library Platform

> **Microservices • Polyglot • Cloud-Native**
>
> *A scalable, feature-rich library management system built with the industry's best technologies.*



![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green?logo=spring-boot)
![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=nodedotjs)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux)
![K8s](https://img.shields.io/badge/Kubernetes-Ready-blue?logo=kubernetes)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)
![Kafka](https://img.shields.io/badge/Kafka-Ready-blue?logo=kafka)
![Feign](https://img.shields.io/badge/Feign-Ready-blue?logo=feign)
![.net](https://img.shields.io/badge/.net-8-purple?logo=dotnet)
![node.js](https://img.shields.io/badge/node.js-18-green?logo=nodedotjs)
![express](https://img.shields.io/badge/express-18-green?logo=express)
![mysql](https://img.shields.io/badge/mysql-18-green?logo=mysql)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

</div>

---

## 📋 Table of Contents

- [🚀 Introduction](#-introduction)
- [💎 Why Bookstack?](#-why-bookstack)
- [🏗️ System Architecture](#-system-architecture)
- [🛠️ Technology Stack](#-technology-stack-polyglot)
- [📂 Project Structure](#-project-structure)
- [🌟 Key Features](#-key-features--deep-dives)
- [📖 Documentation](#-comprehensive-documentation)
- [🔮 Roadmap](#-future-roadmap)
- [⚡ Quick Start](#-quick-start)

---

## 🚀 Introduction

**Bookstack** is a next-generation library platform engineered to handle massive scale. Unlike traditional library software that feels stuck in the 90s, Bookstack is **alive, real-time, and resilient**.

We use a **Polyglot Microservices Architecture**, blending the enterprise reliability of **Java Spring Boot**, the speed of **Node.js**, the robustness of **.NET**, and the interactivity of **React**.

Whether you are a **Member** renting the latest bestseller, a **Librarian** managing stock, or an **Admin** analyzing trends, Bookstack delivers a seamless experience.

---

## 💎 Why Bookstack?

We solve the hard problems so you don't have to.

| Feature | The Old Way | The Bookstack Way |
| :--- | :--- | :--- |
| **Search** | Slow, exact match only. | **< 50ms**, multi-field, partial matching algorithm. |
| **Payments** | In-browser calculation (Insecure). | **Server-Side Order Creation** with HMAC verification. |
| **Reliability** | Monolith crashes = Total outage. | **Fault-Tolerant Microservices**. If Node dies, Java lives. |
| **Scaling** | Vertical scaling only. | **Horizontal K8s Scaling**. Spin up 100 book services instantly. |

---

## 🏗️ System Architecture

graph TD

    %% Client Layer
    User[💻 User / Browser] -->|HTTPS| Gateway[🚪 API Gateway<br/>(Spring Cloud :7070)]

    %% Gateway Routing
    Gateway -->|/auth/**| Auth[🔐 Auth Service<br/>(Spring Security)]
    Gateway -->|/books/**| Catalog[📗 Book Catalog<br/>(Node.js)]
    Gateway -->|/members/**| Core[📚 Bookstack Core<br/>(Spring Boot)]
    Gateway -->|/logs/**| Logger[📝 Logger Service<br/>(.NET)]

    %% Async Messaging
    Core -->|Publish Events| Kafka[(📨 Apache Kafka)]
    Kafka -->|Consume| Messaging[🔔 Messaging Service<br/>(Spring Boot)]

    %% Databases
    Auth --> AuthDB[(🗄️ Auth DB)]
    Core --> CoreDB[(🗄️ Bookstack DB)]
    Catalog --> BookDB[(🗄️ Book DB)]

    %% Service Grouping
    subgraph Backend Cluster
        Auth
        Core
        Catalog
        Logger
        Messaging
    


---

## 🛠️ Technology Stack (Polyglot)

We believe in using the right tool for the specific job.

| Layer | Technology | Key Responsibility |
|-------|------------|--------------------|
| **Frontend** | ![React](https://img.shields.io/badge/React-18-blue?logo=react) ![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux) | **Single Page Application** usage `createAsyncThunk` for optimistic UI. |
| **Gateway** | ![Spring Gateway](https://img.shields.io/badge/Spring_Gateway-Routing-green?logo=spring) | **Port 7070**. Central entry point & Security. |
| **Core** | ![Java 21](https://img.shields.io/badge/Java-21-orange?logo=openjdk) ![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-green?logo=spring-boot) | **Port 8080**. Memberships, Rentals, Fine Calculations. |
| **Catalog** | ![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=nodedotjs) ![Express](https://img.shields.io/badge/Express-Fast-lightgrey?logo=express) | **Port 4000**. Book Search, Trending Algorithms. |
| **Auth** | ![Spring Security](https://img.shields.io/badge/Spring_Security-JWT-green?logo=spring-security) | **Port 9090**. JWT Issuance & Validation. |
| **Logs** | ![.NET](https://img.shields.io/badge/.NET-8-purple?logo=dotnet) | **Port 5020**. Centralized Logging Service. |

---

## 📂 Project Structure

A quick look at how our code is organized:

```
Bookstack/
├── client/                 # ⚛️ React Frontend (Vite)
├── server/                 # ☁️ Backend Microservices
│   ├── gateway/            # Spring Cloud Gateway
│   ├── auth-server/        # Spring Security Auth
│   ├── bookstack/          # Spring Boot Core Logic
│   ├── book-service/       # Node.js Catalog Service
│   ├── logger/             # .NET C# Logging Service
│   └── messaging/          # Spring Cloud Stream Consumer
├── k8s/                    # ☸️ Kubernetes Manifests
└── docs/                   # 📘 Detailed Documentation
```

---

## 🌟 Key Features & Deep Dives

We have documented our complex features in detail.

### 🔍 [Advanced Search System](docs/FEATURE_SEARCH.md)
- **Multi-Field Matching**: Searches Title, ISBN, Author, and Publisher simultaneously.
- **Optimized SQL**: Uses `LIKE %query%` with index-aware logic in Node.js.

### 💳 [Secure Payments (Razorpay)](docs/FEATURE_PAYMENTS.md)
We use a **3-Step Security Flow** to prevent tampering.
- **Server**: Creates Order (controls price).
- **Client**: Handles User Payment.
- **Server**: Verifies Cryptographic Signature (HMAC SHA256).

### ⚛️ [Reactive State (Redux Toolkit)](docs/FRONTEND_REDUX.md)
- **Slices**: Modular state management.
- **Optimistic UI**: Interface updates instantly before the server confirms.

### 📨 [Async Messaging (Kafka)](docs/FEATURE_MESSAGING.md)
- **Event-Driven**: Decouples "sending" from "processing".
- **Broadcast System**: Efficiently handles newsletter distribution to all members.

---

## 📖 Comprehensive Documentation

### For Developers
- **[📘 System Manual](docs/SYSTEM_MANUAL.md)**: **START HERE**. The complete technical reference containing Port Maps, Configuration details, and internal routing logic.
- **[📡 API Reference (Deep Dive)](docs/API_REFERENCE.md)**: Exhaustive list of all 30+ endpoints with request/response JSON examples.
- **[ Postman Collection](docs/bookstack_postman_collection.json)**: Ready-to-import JSON file for testing all APIs.
- **[🔍 Search Feature](docs/FEATURE_SEARCH.md)**: How the search functionality operates end-to-end.
- **[💳 Payments & Razorpay](docs/FEATURE_PAYMENTS.md)**: Documentation on the secure payment flow.
- **[📨 Messaging System](docs/FEATURE_MESSAGING.md)**: Deep dive into Kafka producers and consumers.

### For Architects & Leads (Technical Deep Dive)
- **[📡 Microservices Communication](docs/TECH_MICROSERVICES.md)**: Feign Clients, Kafka Protocols, and Sync/Async patterns.
- **[🐳 DevOps & Kubernetes](docs/TECH_DEVOPS.md)**: Dockerfiles, K8s Manifests, and Jenkins Pipelines.
- **[🔐 Spring Security & Auth](docs/TECH_SECURITY.md)**: JWT Architecture, Filter Chains, and IdP Logic.

---
- **[🛠️ Setup & Deployment](docs/SETUP.md)**: One-click deployment guide using `deploy.sh`.
- **[🏗️ Architecture Diagram](docs/ARCHITECTURE.md)**: Visualizing the data flow.
- **[💾 Database Schema](docs/DATABASE.md)**: ER Diagrams for our distributed databases.

---

## 🔮 Future Roadmap

We are constantly improving.

- [ ] **AI Recommendation Engine**: Replace SQL queries with Vector DB for smarter book suggestions.
- [ ] **Mobile App**: Native Android/iOS wrappings for the client.
- [ ] **Multi-Tenancy**: Support for multiple library branches in a single cluster.

---

## ⚡ Quick Start

1.  **Prerequisites**: Docker & Kubernetes.
2.  **Deploy**:
    ```bash
    ./deploy.sh
    ```
    *This script builds all 6 microservices and deploys them to K8s automatically.*

4.  **Access**:
    Open `http://localhost:7070` to explore the library!

---

*Built with ❤️ by the **Bookstack Team** (Sunbeam & Co.)*