# 📡 Deep Dive API Reference

> **Base URL (Gateway)**: `http://localhost:7070`
>
> All requests should be made to the Gateway. It routes traffic to the appropriate microservice based on the path prefix.

## 🔐 Authentication (`/auth`)
*Service: Auth Server (Port 9090)*

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | **Login & Get JWT** | `{"username": "...", "password": "..."}` | `{"token": "eyJhb...", "role": "Full Stack Developer", ...}` |
| `GET` | `/auth/users` | Get all users | - | `[User, ...]` |
| `POST` | `/auth/search/users` | Search users | `?search=query` (Query Param) | `[User, ...]` |
| `GET` | `/auth/email` | Get all user emails | - | `["a@b.com", ...]` |
| `GET` | `/auth/allstaff` | Get all staff members | - | `[AllStaffDto, ...]` |
| `GET` | `/auth/allmember` | Get all active members | - | `[AllStaffDto, ...]` |
| `POST` | `/auth/addstaff` | Register new staff/user | `User` JSON object | `Integer` (UserId) |
| `POST` | `/auth/editstaff` | Edit staff details | `editStaffDto` | `String` (message) |
| `POST` | `/auth/particularuser` | Get specific user detail | `{"username": "..."}` | `AllEmailDto` |

---

## 📚 Bookstack Core: Membership & Rentals (`/member`)
*Service: Bookstack Core (Port 8080)*
*Headers Required*: `X-User-Id` (Injected by Gateway usually, or sent manually)

### Books & Recommendations
| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/member/books` | Get all books (with copy availability) | - |
| `GET` | `/member/book/{id}` | Get specific book details | - |
| `GET` | `/member/liked-books` | Get books liked by user | - |
| `POST` | `/member/likes/toggle` | Toggle Like on a book | `{"bookId": 123}` |
| `GET` | `/member/recommended-books` | Personal recommendations | - |
| `GET` | `/member/trending-books` | Top rented books | - |
| `GET` | `/member/new-arrived-books` | Recently added books | - |
| `GET` | `/member/might-liked-books/{id}`| "You might also like" | - |

### Reviews
| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/member/books/{id}/reviews` | Get reviews for a book | - |
| `POST` | `/member/books/{id}/reviews` | Add a review | `{"rating": 5, "comment": "Great!"}` |

### History
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/member/history-borrowed-books` | Past rental history |
| `GET` | `/member/currently-borrowed-books` | Active rentals |

---

## 👔 Staff & Administration (`/staff`, `/admin`)
*Service: Bookstack Core (Port 8080)*

### Staff Operations (`/staff`)
| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/staff/books` | List all books (Staff view) | - |
| `POST` | `/staff/search/book` | Search books (Advanced) | `{"search": "query"}` |
| `POST` | `/staff/search/user` | Search users | `{"search": "query"}` |
| `POST` | `/staff/rent-logic` | Process Rent (Check limits) | `BookMemberDto` |
| `POST` | `/staff/return-logic/submit` | Process Return | `BookMemberDto` |
| `POST` | `/staff/record` | **Commit Transaction** | `RentRenewReturnRequestDTO` |
| `POST` | `/staff/fine` | Calculate Fines | `MemberIdDto` |
| `POST` | `/staff/email` | **Send Newsletter (Kafka)** | `{"email": "content..."}` |
| `POST` | `/staff/genre` | Add Genre to Book | `BookGenreRequestDto` |

### Admin Operations (`/admin`)
| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/admin/addmember` | Add new member | `AddStaffDto` |
| `POST` | `/admin/calculatefine` | Force calculate fine | `UserId` |
| `POST` | `/admin/sendfine` | Email fine notice | `EmailDTO` |
| `POST` | `/admin/sendfinetoall` | Broadcast fine notices | - |

---

## 💳 Payments & Membership (`/membership`, `/payment`)
*Service: Bookstack Core (Port 8080)*

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/membership/start-payment` | **Step 1**: Create Razorpay Order | `?membershipType=GOLD` |
| `POST` | `/membership/payment-success`| **Step 2**: Verify & Activate | `{"razorpay_order_id": "...", "razorpay_signature": "..."}` |
| `POST` | `/payment/preview` | Calculate cost preview | `PaymentRequestDTO` |
| `GET` | `/payment/config` | Get Public Key | - |

---

## 📗 Catalog Service (`/book`)
*Service: Node.js Book Service (Port 4000)*
*Note*: This service provides high-performance search and catalog data.

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/book/search` | **Fast Search** (Title, ISBN, etc) | `{"search": "query"}` |
| `GET` | `/book/allbooks` | Get all books (Raw) | - |
| `POST` | `/book/add` | Add Book (Multipart) | `FormData` (imageFile, title, etc) |
| `POST` | `/book/trending-books` | Algo: High interest books | - |
| `POST` | `/book/recommended-books` | Algo: ML Basics | - |
| `GET` | `/book/book/:bookId` | Get Book by ID | - |
| `POST` | `/book/names-by-id` | Bulk resolve IDs to names | `{"ids": [1, 2, 3]}` |

---

---

## 🚦 Standard Status Codes

| Code | Meaning | When to expect it |
| :--- | :--- | :--- |
| **200 OK** | Success | Standard response for successful GET/POST. |
| **400 Bad Request** | Invalid Input | Missing JSON fields, invalid email format, or business logic rule failed (e.g. "Rent Limit Exceeded"). |
| **401 Unauthorized** | Auth Failed | Invalid password or missing/expired JWT token. |
| **403 Forbidden** | No Permission | Member trying to access Admin endpoints. |
| **500 Server Error** | System Crash | Database connection failed or unexpected NullPointerException. |

---

## 🧩 Microservice Synchronization

While many operations are independent, some require **synchronous inter-service communication** (via Feign Client).

### 1. Bookstack Core → Auth Server
- **Client**: `AuthorizationClient`
- **Why?**: The Core service needs user details (emails for newsletters, names for UI) but doesn't own the user database.
- **Sync Calls**:
    - `GET /auth/users`: To list all members.
    - `POST /auth/search/users`: To find specific users.
    - `GET /auth/email`: To fetch email addresses for Kafka broadcasts.

### 2. Bookstack Core → Node.js Catalog
- **Client**: `BookClient`
- **Why?**: The Core service manages "copies" (stock), while Node.js manages "catalog" (metadata).
- **Sync Calls**:
    - `GET /book/copy`: Checks *real-time* availability before approving a rent.
    - `PUT /book/id`: Updates the "available copies" count after a return.

### 3. Messaging → Auth Server
- **Client**: `AuthorizationClient` (in Messaging)
- **Why?**: The Kafka consumer receives a message "Send to All", but it needs the *actual list* of email addresses which lives in the Auth Server.
- **Sync Calls**:
    - `GET /auth/email`: Fetches the recipient list just-in-time.

---

## 📝 Data Transfer Objects (DTOs) & Roles

Below is the dictionary of all data structures used in the API.

### 🛠️ Administrative DTOs
| DTO Name | Role & Usage |
| :--- | :--- |
| **`AddStaffDto`** | **Registration Payload**. Used when an Admin adds a new Staff or Member. Contains all PII (DOB, Salary, Address). |
| **`EmailDTO`** | **Newsletter Container**. Wraps the HTML content sent to the Kafka queue. |
| **`UserDTO`** | **Public User Profile**. Safe version of the User entity (no passwords) shared between microservices. |

### 📚 Rental Logic DTOs
| DTO Name | Role & Usage |
| :--- | :--- |
| **`RentRequestDTO`** | **Pre-Check Payload**. Used to ask "Can this user rent X more books?" without committing. |
| **`RentRenewReturnRequestDTO`** | **Transaction Commit**. The master payload containing a list of `RentRenewReturnRecordDTO` items to finalize a bulk action. |
| **`BookMemberDto`** | **Single Item Context**. Represents one book + one member pair, used for calculating fines or verifying status. |
| **`BookCopyCountDto`** | **Sync Payload**. Sent to Node.js service to update the cached number of available copies. |

### 💳 Payment DTOs
| DTO Name | Role & Usage |
| :--- | :--- |
| **`PaymentRequestDTO`** | **Order Initiator**. Calculates the bill based on `billing` (amount) and `membershipType` (e.g., GOLD). |
| **`PaymentSuccessRequestDTO`** | **Verification Payload**. Contains the cryptographic `razorpay_signature` to prove the user actually paid. |

### 🔍 Search DTOs
| DTO Name | Role & Usage |
| :--- | :--- |
| **`Search`** | **Query Wrapper**. Simple wrapper `{"search": "..."}` used to ensure consistent JSON parsing across services. |
| **`BookSearchDTO`** | **Result Item**. Lightweight book object (Title, ISBN, Publisher) optimized for search results lists. |

