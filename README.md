# 🍽️ Restaurant Management System (RMS)

A full-stack enterprise-grade backend solution designed to digitize, streamline, and automate the operational lifecycle of a full-service restaurant. The system manages customer orders, kitchen workflow, table reservations, and payment processing through a secure RESTful API.

---

## ✨ Features

- **Customer Ordering** — Browse menu, place orders by table number, and track order status in real-time without login
- **Kitchen Management** — Chef receives orders in real-time, updates cooking status through a strict state machine
- **Payment Processing** — Cashier generates bills, confirms payments, and tracks revenue by table
- **User Authentication** — JWT-based auth with email verification (6-digit code), role-based access control
- **Menu Management** — Admin manages categories, menu items, pricing, and availability
- **Promotion System** — Create discount promotions (percent, fixed, buy-X-get-Y, free item)
- **Role-Based Access** — Four roles: ADMIN, CHEF, CASHIER, CUSTOMER with strict permission guards
- **Rate Limiting** — Protection against request flooding per IP address

---

## 🛠️ Technologies Used

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| ORM | TypeORM |
| Database | MySQL |
| Authentication | JWT + bcrypt |
| Email | Nodemailer (Gmail) |
| Validation | Joi |
| Rate Limiting | express-rate-limit |
| Dev Server | tsx + nodemon |

---

## 📋 Prerequisites

- Node.js >= 18
- MySQL >= 8.0
- npm >= 9
---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/sapiia/restaurant_system
cd restaurant_system/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=databases_name

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1h


### 4. Create the database

```sql
CREATE DATABASE IF NOT EXISTS databases_name;
```

### 5. Start the server

```bash
npm run dev
```

TypeORM will auto-create all tables on first run (`synchronize: true`).

### 6. Verify server is running

```
GET http://localhost:3000/
```

Response:
```json
{
  "name": "Restaurant Management System API",
  "version": "1.0.0",
  "status": "running"
}
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |

---


## 🔑 Role Permissions

| Endpoint | ADMIN | CHEF | CASHIER | CUSTOMER |
|----------|-------|------|---------|----------|
| Login / Register | ✅ | ✅ | ✅ | ❌ |
| View Menu | ✅ | ✅ | ✅ | ✅ |
| Manage Menu | ✅ | ❌ | ❌ | ❌ |
| Place Order | ✅ | ❌ | ❌ | ✅ |
| View All Orders | ✅ | ✅ | ✅ | ❌ |
| Update Order Status | ✅ | ✅ | ❌ | ❌ |
| Process Payment | ✅ | ❌ | ✅ | ❌ |
| Manage Users | ✅ | ❌ | ❌ | ❌ |
| Manage Promotions | ✅ | ❌ | ❌ | ❌ |

---

## 🗄️ Database Structure

| Table | Description |
|-------|-------------|
| `users` | Staff and customer accounts with roles and verification |
| `categories` | Menu item categories (Main Course, Beverages, etc.) |
| `menu_items` | Food and drink items with pricing and availability |
| `orders` | Customer order sessions linked to table numbers |
| `order_items` | Individual line items within each order |
| `payments` | Payment transactions linked one-to-one with orders |
| `promotions` | Discount and free item promotion configurations |

### Relationships

```
Category ──< MenuItem
Order ──< OrderItem >── MenuItem
Order ──── Payment (one-to-one)
```

### Order Status Flow

```
PENDING → COOKING → READY → SERVED → COMPLETED
UNPAID  ─────────────────────────── → PAID
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts       # TypeORM MySQL DataSource
│   │   └── mailer.ts         # Nodemailer Gmail transporter
│   ├── controllers/          # HTTP request handlers
│   │   ├── AuthController.ts
│   │   ├── MenuController.ts
│   │   ├── OrderController.ts
│   │   ├── PaymentController.ts
│   │   └── PromotionController.ts
│   ├── entities/             # TypeORM database models
│   │   ├── Users.ts
│   │   ├── Category.ts
│   │   ├── MenuItem.ts
│   │   ├── Orders.ts
│   │   ├── OrderItem.ts
│   │   ├── Payment.ts
│   │   └── Promotion.ts
│   ├── middlewares/          # Express middleware
│   │   ├── authMiddleware.ts
│   │   ├── roleMiddleware.ts
│   │   ├── errorMiddleware.ts
│   │   ├── validateMiddleware.ts
│   │   └── rateLimiter.middleware.ts
│   ├── repositories/         # Database query abstraction
│   │   ├── UserRepository.ts
│   │   ├── MenuRepository.ts
│   │   ├── OrderRepository.ts
│   │   ├── PaymentRepository.ts
│   │   └── PromotionRepository.ts
│   ├── routes/               # Express route definitions
│   │   ├── auth.routes.ts
│   │   ├── menu.routes.ts
│   │   ├── order.routes.ts
│   │   ├── payment.routes.ts
│   │   └── promotion.routes.ts
│   ├── services/             # Business logic layer
│   │   ├── AuthService.ts
│   │   ├── MenuService.ts
│   │   ├── OrderService.ts
│   │   ├── PaymentService.ts
│   │   └── PromotionService.ts
│   ├── app.ts                # Express app bootstrap
│   └── server.ts             # Server entry point
├── .env                      # Environment variables
├── package.json
└── tsconfig.json
```

---

## 🚢 Deployment

| Service | Platform |
|---------|----------|
| Backend API | Render |
| Database | Railway (MySQL) |

### Production Environment Variables

```env
NODE_ENV=production
PORT=5000
DB_HOST=<railway-host>
DB_PORT=<railway-port>
DB_USER=<railway-user>
DB_PASSWORD=<railway-password>
DB_NAME=restaurant_system
JWT_SECRET=<strong-secret-key>
JWT_EXPIRES_IN=1h
EMAIL_USER=<gmail>
EMAIL_PASS=<app-password>
```

---

## 🔗 Repository

[https://github.com/sapiia/restaurant_system](https://github.com/sapiia/restaurant_system)

---

## 👨‍💻 Authors

**Team 4**

| Name | Role |
|------|------|
| Dane Miok | Team Leader |
| Sophy Moeurn | Backend Developer |
| Samart Luch | Backend Developer |

- **Course:** Backend Development
- **School:** Passerelles Numériques
- **GitHub:** [https://github.com/sapiia/restaurant_system](https://github.com/sapiia/restaurant_system)

---

## 📄 License

This project is created for educational purposes at **Passerelles Numériques**.

---

*Restaurant Management System — Version 1.0.0*