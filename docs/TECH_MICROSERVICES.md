# 📡 Technical Deep Dive: Microservices Communication

> **Synchronous vs. Asynchronous Signals**
>
> **Architecture Pattern**: Hybrid.
> **Sync**: We use **OpenFeign** for strict transactional consistency (e.g., Checking if a book exists before renting).
> **Async**: We use **Apache Kafka** for "fire-and-forget" tasks (e.g., Sending emails, Logging).

---

## ⚡ 1. Synchronous Communication (Feign Client)

We avoid `RestTemplate` because it's verbose. Instead, we use **Spring Cloud OpenFeign** to create declarative REST clients.

### 🔍 How it Works
1.  **Interface Definition**: We define an interface that looks like a Controller but acts as a Client.
2.  **Service Discovery**: We use k8s service names (`http://auth-server:9090`) to route requests internally.

### 📝 Code Example: Core -> Auth
**Scenario**: The Core service needs to know the email of a user to send a fine notice.

**File**: `server/bookstack/src/main/java/com/project/bookstack/client/AuthorizationClient.java`

```java
@FeignClient(value = "authorization", url = "http://auth-server:9090")
public interface AuthorizationClient {

    // Calls GET /auth/user/email/{id} on Auth Server
    @GetMapping("/auth/user/email/{userId}")
    String getEmail(@PathVariable("userId") Integer userId);
    
    // Calls GET /auth/validate to check token validity
    @GetMapping("/auth/validate")
    boolean validateToken(@RequestHeader("Authorization") String token);
}
```

### 📝 Code Example: Core -> Catalog (Node.js)
**Scenario**: Checking stock availability before approving a rent request.

**File**: `server/bookstack/src/main/java/com/project/bookstack/client/BookClient.java`

```java
@FeignClient(name = "book-service", url = "http://express-service:4000")
public interface BookClient {

    @GetMapping("/book/check-stock/{bookId}")
    StockResponse checkStock(@PathVariable Integer bookId);
    
    @PostMapping("/book/decrement/{bookId}")
    void decrementStock(@PathVariable Integer bookId);
}
```

---

## 📨 2. Asynchronous Communication (Apache Kafka)

We use Kafka to decouple high-latency tasks from the user experience.

### 🏗️ The Pipeline
1.  **Topic**: `email-topic`
2.  **Partitioning**: Single partition (simple FIFO ordering).
3.  **Serialization**: JSON Strings.

### 🔊 Producer (The Sender)
**Service**: `Bookstack Core`
**Trigger**: Admin clicks "Send Newsletter".

```java
// StaffService.java
kafkaTemplate.send("email-topic", new EmailDTO("Hello World", null));
```

### 👂 Consumer (The Listener)
**Service**: `Messaging Service`
**Action**: Wakes up, calls Auth Server for emails, sends SMTP.

```java
// MessageService.java
@KafkaListener(topics = "email-topic", groupId = "bookstack-project")
public void listen(EmailDTO payload) {
    // 1. Acknowledge message
    // 2. Process (Send Email)
    emailService.blast(payload.getContent());
}
```

---

## 🛠️ 3. Protocol Reference

| Source | Destination | Protocol | Method | Content-Type | Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Gateway** | **Any Service** | HTTP/1.1 | REST | JSON | Routing external traffic. |
| **Core** | **Auth** | HTTP/1.1 | Feign | JSON | Validating User IDs. |
| **Core** | **Catalog** | HTTP/1.1 | Feign | JSON | Synchronizing Inventory. |
| **Core** | **Kafka** | TCP | Binary | JSON | Offloading Email/Logs. |
| **Logger** | **Log DB** | JDBC | SQL | - | Storing Audit Logs. |

---

## ⚠️ Failure Handling (Resilience)

1.  **Feign Fallbacks**: If `auth-server` is down, the Core service will throw a `RetryableException`. We currently do not have Circuit Breakers implemented (Future Scope).
2.  **Kafka Dead Letter Queue (DLQ)**: If the Messaging Service fails to send an email (e.g., SMTP down), the message remains in the topic until processed.
