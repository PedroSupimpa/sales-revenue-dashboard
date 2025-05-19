# Sales Revenue Dashboard

This is a fullstack sales and revenue dashboard application built with:

- **Backend**: Node.js, Express, GraphQL (Apollo Server), MongoDB, Redis
- **Frontend**: React.js, Vite, Chakra UI, Zustand, Apollo Client

---

## 🧰 Requirements

- Node.js 18+
- Docker (for MongoDB and Redis)
- npm or yarn

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PedroSupimpa/sales-revenue-dashboard.git
cd sales-revenue-dashboard
```

### 2. Start MongoDB and Redis with Docker

```bash
docker compose up -d
```

This will start:

- MongoDB on port `27017`
- Redis on port `6379`

---

### 3. Setup environment variables

Copy the example file:

```bash
cp .env.example .env
```

---

### 4. Install dependencies and run the backend

```bash
cd backend
npm install
```

### 5. Run the database seeder

This will populate your MongoDB with sample data (customers, products, and orders):

```bash
node seed.js
```

> ✅ Two sample `customerId` values will be printed in the console. You can use them to test order-related GraphQL queries in the backend or in the frontend app.

---

### 6. Start the backend server

```bash
npm run dev
```

- GraphQL Playground available at: [http://localhost:4000/graphql](http://localhost:4000/graphql)

---

### 7. Run the frontend

In a new terminal:

```bash
cd ../frontend
npm install
npm run dev
```

- Frontend will be available at: [http://localhost:5173](http://localhost:5173)

---

## 📄 Sample GraphQL Queries (`queries.graphql`)

```graphql
# Get all products
query {
  products {
    id
    name
    category
    price
  }
}

# Get all orders
query {
  orders {
    id
    total
    customer {
      name
    }
  }
}

# Create an order (use one of the printed customerId from seed.js)
mutation {
  createOrder(customerId: "PASTE_CUSTOMER_ID_HERE") {
    id
    total
  }
}
```
