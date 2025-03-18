# Node.js Hexagonal Architecture API

## Description

This project is an API developed in Node.js following the hexagonal architecture. It is implemented without frameworks like Express or Nest, using only Node.js native modules.

## 📌 Main Features

- Hexagonal architecture: separation between domain, application, and infrastructure.
- Mock database for testing without a real database.
- HTTP exception handling with dedicated classes.
- Unit and e2e tests, with specific tests for uncovered cases.
- Docker support for easy deployment and local development.

## 🚀 Installation and Execution

### 1 Clone the Repository

```sh
git clone https://github.com/CodeTraderEdge/banking-challenge-work
cd banking-challenge-work
```

### 2 Start the Project

```sh
docker-compose up -d 
```

This will start the API along with a PostgreSQL database.

## 🌍 API URL

When the container is running, the API will be available at:

- **From the host machine**: `http://localhost:3000`
- **From another container in the same network**: `http://api:3000`

To test the API, you can run:

```sh
curl http://localhost:3000/health
```

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
├── sql
│   ├── init.sql
├── docker-compose.yml
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

**GET** `/transfers?startDate=2025-03-01&endDate=2025-03-10`

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
- PostgreSQL
- Docker & Docker Compose
- Hexagonal Architecture
- Unit Testing with Jest

## 🐜 License

This project is licensed under the MIT License. Feel free to contribute! 🚀
