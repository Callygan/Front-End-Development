# Todo API (Express + MongoDB)

Simple REST API for managing todos with Express and Mongoose.

## Prerequisites
- Node.js 18+ and npm
- MongoDB running locally (`mongod` service)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional) Create a `.env` file:
   ```
   PORT=3001
   MONGODB_URI=mongodb://127.0.0.1:27017/todo_app
   ```
   If `.env` is absent, defaults are used.
3. Start the server:
   ```bash
   npm start
   ```

## Endpoints
- `GET /` – health check, returns "Todo API is running".
- `GET /todos` – list all todos.
- `GET /todos/:id` – get one todo by id.
- `POST /todos` – create todo. Body: `title` (required), `description?`, `completed?`.
- `PUT /todos/:id` – update fields. Body: any of `title`, `description`, `completed`.
- `DELETE /todos/:id` – remove todo.

## Curl examples (Terminal)
```powershell
curl http://localhost:3001/
curl http://localhost:3001/todos

curl -Method POST http://localhost:3001/todos `
  -Headers @{'Content-Type'='application/json'} `
  -Body '{"title":"Buy milk","description":"2L","completed":false}'

curl -Method PUT http://localhost:3001/todos/<id> `
  -Headers @{'Content-Type'='application/json'} `
  -Body '{"completed":true}'

curl -Method DELETE http://localhost:3001/todos/<id>
```

## Notes
- IDs are MongoDB ObjectIds (e.g., `6981c57ed24b76aa80805511`).
- `.gitignore` excludes `node_modules`, `.env`, and log artifacts.
