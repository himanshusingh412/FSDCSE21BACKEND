# Middleware in Express

Middleware functions sit between the request and the response and can read, change or end a request.

## Key ideas
- Signature: `(req, res, next) => { ... }`.
- Call `next()` to pass control to the next middleware.
- Order matters: middleware runs in the order it is registered.
- Error-handling middleware takes four arguments: `(err, req, res, next)`.

## Example
```js
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
```
