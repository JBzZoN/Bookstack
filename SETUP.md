# 🛠️ Zero to Hero: Setup & Deployment

> **Developer's Manual**
>
> This guide covers two ways to run Bookstack:
> 1.  **Standard Local Dev**: Running services individually (Best for debugging).
> 2.  **Kubernetes**: Deploying the full cluster (Best for production simulation).

---

## ✅ 1. Prerequisites (The Fundamentals)

You need these tools installed before doing anything.

| Tool | Version | Why? |
| :--- | :--- | :--- |
| **Java JDK** | 21 (LTS) | Powering the Spring Boot Core. |
| **Node.js** | 18+ | Running the Frontend and Catalog Service. |
| **MySQL** | 8.0 | The database engine. |
| **Apache Kafka** | 3.5+ | Handling async messages. |
| **Maven** | 3.9+ | Building Java projects. |

---

## 💻 2. Local Development (Manual Run)

Follow this order to start the system without errors.

### Step A: Infrastructure (Databases & Kafka)
1.  **Start MySQL**: Ensure it's running on port `3306`.
2.  **Create Schemas**:
    ```sql
    CREATE DATABASE bookstack;
    CREATE DATABASE book_db;
    CREATE DATABASE authorization;
    ```
3.  **Start Kafka**:
    *   Zookeeper: `localhost:2181`
    *   Broker: `localhost:9092`

### Step B: Environment Variables
Create a `.env` file or export these variables. **Crucial for Payments and Messaging.**

```bash
# Payment (Razorpay Test Keys)
export RAZORPAY_KEY_ID="rzp_test_xxxxxx"
export RAZORPAY_KEY_SECRET="your_secret_here"

# Messaging (Gmail App Password)
export SMTP_PASSWORD="your_app_password"
```

### Step C: Start Microservices (In Order)

**1. Auth Server (Port 9090)**
*The Gatekeeper. Must start first.*
```bash
cd server/auth-server
mvn spring-boot:run
```

**2. Bookstack Core (Port 8080)**
*The Business Logic.*
```bash
cd server/bookstack
mvn spring-boot:run
```

**3. Book Catalog (Port 4000)**
*The Search Engine (Node.js).*
```bash
cd server/book-service
npm install
npm run dev
```

**4. API Gateway (Port 7070)**
*The Orchestrator. All traffic goes here.*
```bash
cd server/gateway
mvn spring-boot:run
```

### Step D: Frontend (Port 5173)
```bash
cd client
npm install
npm run dev
```
> Access App: **http://localhost:5173**
> Access API directly: **http://localhost:7070**

---

## 🐳 3. Kubernetes Deployment (One-Click)

If you have Minikube or Docker Desktop K8s enabled, use our script.

```bash
# 1. Start Cluster
minikube start

# 2. Run Deploy Script (Builds Images -> Deploys Pods)
./deploy.sh

# 3. Check Status
kubectl get pods
```

**Wait for 60 seconds** for all databases to initialize and seed data.

---

## ⚠️ Troubleshooting

**Q: "Connection Refused" on Port 3306?**
*   **Fix**: Check if your local MySQL is running. If using Docker, ensure port forwarding is active (`-p 3306:3306`).

**Q: Redux State is empty on refresh?**
*   **Fix**: This is normal if the Backend is down. The frontend needs the Auth Server (`:9090`) to be running to "rehydrate" the user session.

**Q: Images not loading?**
*   **Fix**: Ensure `book-service` (Node.js) is running on port `4000`. The frontend requests images from `http://localhost:7070/book/images/...`.
