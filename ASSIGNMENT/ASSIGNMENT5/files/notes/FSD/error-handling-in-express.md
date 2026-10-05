# Error Handling in Express

Express catches errors thrown in handlers and passes them to error-handling middleware.

## Key ideas
- Error middleware has four parameters: `(err, req, res, next)` and is registered last.
- Express 5 forwards rejected promises from async handlers automatically.
- Send a safe message to the client; log the full error on the server.
- Add a final 404 handler for requests that match no route.

## Example
```js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong");
});
```
