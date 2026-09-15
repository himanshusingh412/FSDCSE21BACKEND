# Mini Product Management API

A small full-stack app: Express REST API backend + React (Vite) frontend, for managing products (CRUD).

## Structure

```
product-management-api/
  server/   Express REST API (port 5000)
  client/   React app (Vite, port 5173)
```

## Run the backend

```
cd server
npm install
npm run dev   # or: npm start
```

API base URL: `http://localhost:5050/api/products`

| Method | Endpoint            | Description         |
|--------|----------------------|----------------------|
| GET    | /api/products         | List all products    |
| GET    | /api/products/:id      | Get one product      |
| POST   | /api/products          | Create a product     |
| PUT    | /api/products/:id      | Update a product     |
| DELETE | /api/products/:id      | Delete a product     |

Product shape: `{ name, category, price, quantity }`

## Run the frontend

```
cd client
npm install
npm run dev
```

Open `http://localhost:5173`. The frontend talks to the API at `http://localhost:5050`, so run the backend first.

Data is stored in memory on the server, so it resets when the server restarts.
