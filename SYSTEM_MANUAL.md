# 📘 System Manual (Technical Operations)

> **The "Flight Manual" for Bookstack**
>
> **Audience**: System Admins, DevOps, and Senior Developers.
> **Purpose**: A reference guide for Ports, Configurations, and Directory layout.

---

## 🗺️ 1. Port Map & Network Topology

The system reserves specific ports. Ensure these are free on your host.

| Service | Port | Protocol | Usage |
| :--- | :--- | :--- | :--- |
| **API Gateway** | `7070` | HTTP | **Primary Endpoint**. All frontend traffic hits this. |
| **Auth Server** | `9090` | HTTP | Internal Auth calls. |
| **Bookstack Core** | `8080` | HTTP | Core Logic (Members, Rents). |
| **Book Catalog** | `4000` | HTTP | Node.js Service (Images, Search). |
| **Messaging** | `5050` | HTTP | Not exposed (Background Worker). |
| **Logger** | `5020` | HTTP | .NET Audit Logger. |
| **Frontend** | `5173` | HTTP | Vite Dev Server. |
| **MySQL** | `3306` | TCP | Database Access. |
| **Kafka** | `9092` | TCP | Event Broker. |

---

## ⚙️ 2. Configuration Reference (`application.properties`)

Key keys you need to know about.

### 🔐 Security & Keys
| Variable | Service | Description |
| :--- | :--- | :--- |
| `razorpay.key.id` | Core (Java) | Public Key ID for Payments. |
| `razorpay.key.secret` | Core (Java) | **Secret** for Signature Verification. |
| `jwt.secret` | Auth (Java) | **Secret** for signing tokens. |

### 🛠️ Service Discovery (Hardcoded URLs)
*Since we don't use Eureka, services point directly to each other.*

| Property | Value | Description |
| :--- | :--- | :--- |
| `application.config.auth-url` | `http://localhost:9090` | Core -> AuthSync. |
| `application.config.book-url` | `http://localhost:4000` | Core -> Catalog Sync. |

---

## 📂 3. Directory Structure

Where does the code live?

```bash
Bookstack/
├── client/                 # React Frontend (Vite)
├── server/
│   ├── gateway/            # Spring Cloud Gateway (Port 7070)
│   ├── auth-server/        # Spring Security (Port 9090)
│   ├── bookstack/          # Main Java App (Port 8080)
│   ├── book-service/       # Node.js Catalog (Port 4000)
│   ├── messaging/          # Notification Service (Port 5050)
│   └── logger/             # .NET Service (Port 5020)
└── docs/                   # You are here 📍
```

---

## 🚑 4. Troubleshooting Guide

### 🔴 Issue: Images are Broken (404)
*   **Cause**: The frontend asks for `http://localhost:7070/book/images/foo.jpg`.
*   **Routing**: Gateway must route `/book/**` to `localhost:4000`.
*   **Fix**: Ensure `book-service` is running on port 4000. Check Gateway logs.

### 🔴 Issue: "Signature Verification Failed" (Payment)
*   **Cause**: The `razorpay.key.secret` in `application.properties` does not match the key used to generate the signature on the frontend (or Razorpay dashboard).
*   **Fix**: Update `.env` or properties file with the correct secret.

### 🔴 Issue: "KafkaTimeoutException"
*   **Cause**: Kafka Broker is down.
*   **Fix**: Restart Zookeeper & Broker.
*   **Workaround**: The app will throw errors on "Send Newsletter" but will continue to work for Rentals.

---

## 📜 5. Log Locations

| Service | Location |
| :--- | :--- |
| **Java Services** | `console` (Standard Output) |
| **Node.js** | `console` (Standard Output) |
| **Audit Logs** | Stored in `logger_db` (SQL) via the .NET service. |
