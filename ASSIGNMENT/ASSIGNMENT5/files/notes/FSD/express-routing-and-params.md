# Routing and Route Parameters in Express

Routes match a URL path and HTTP method to a handler; parameters capture parts of the path.

## Key ideas
- `app.get("/notes/:subject", handler)` captures `req.params.subject`.
- Query strings are read from `req.query` (e.g. `?q=react`).
- `express.Router()` groups related routes into their own module.
- Routes are matched top to bottom; the first match wins.

## Example
```js
import { Router } from "express";
const router = Router();
router.get("/:subject", (req, res) => res.send(req.params.subject));
export default router;
```
