# Express.js Basics

Express is a minimal Node.js framework for handling requests, middleware and static files.

## Key ideas
- `express()` creates an app; `app.listen(port)` starts the server.
- Middleware runs in order: `app.use(fn)` for every request.
- `express.static("folder")` serves files directly from disk.
- `res.attachment(name)` makes the browser download a response.

## Example
```js
import express from "express";
const app = express();
app.use(express.static("public"));
app.listen(5001);
```
