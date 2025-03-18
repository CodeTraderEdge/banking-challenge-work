# Node.js Hexagonal Architecture API

## Description

This project is an API developed in Node.js following the hexagonal architecture. It is implemented without frameworks like Express or Nest, using only Node.js native modules.

## 📌 Main Features

- Hexagonal architecture: separation between domain, application, and infrastructure.
- Mock database for testing without a real database.
- HTTP exception handling with dedicated classes.
- Unit and e2e tests, with specific tests for uncovered cases.

## 🚀 Installation and Execution

### 1⃣ Clone the Repository

```sh
git clone https://github.com/CodeTraderEdge/banking-challenge-work
cd banking-challenge-work
```

### 2⃣ Install Dependencies

```sh
npm install
```

### 3⃣ Start the Server

```sh
npm run start
```

By default, the server runs at `http://localhost:3000`.

## 💁️ Project Structure

```
├── src
│   ├── Application
│   │   ├── services
│   ├── domain
│   │   ├── entities
│   │   ├── exceptions
│   ├── Infrastructure
│   │   ├── adapters
│   │   │   ├── controllers
│   │   ├── config
│   │   ├── http
│   │   ├── repositories
│   ├── index.js
│   ├── server.js
├── test
├── .env
├── package.json
├── README.md
```

## 📌 Endpoints

### 🔹 Health Check

**GET** `/health`

📌 **Response:**

```json
{
  "status": "ok"
}
```

### 🔹 Get Transfers from the Last Month

**GET** `/transfers`

📌 **Response:**

```json
[
  {
    "id": 1,
    "amount": 1500,
    "companyId": 2,
    "debitAccount": "123-456",
    "creditAccount": "987-654"
  }
]
```

### 🔹 Get Companies Adhered Last Month

**GET** `/companies/adhesions-last-month`

📌 **Response:**

```json
[
  {
    "id": 3,
    "name": "Company C",
    "cuit": 30112233445,
    "adhesionDate": "2025-03-05T09:15:00.000Z"
  }
]
```

### 🔹 Register a Company

**POST** `/companies`

📌 **Body:**

```json
{
  "name": "New Company",
  "cuit": 30987654321
}
```

📌 **Response:**

```json
{
  "id": 8,
  "name": "New Company",
  "cuit": 30987654321,
  "adhesionDate": "2025-04-10T14:00:00.000Z"
}
```

## 🛠 Technologies Used

- Node.js
- Hexagonal Architecture
- Unit Testing with Jest

## 🐜 License

This project is licensed under the MIT License. Feel free to contribute! 🚀

