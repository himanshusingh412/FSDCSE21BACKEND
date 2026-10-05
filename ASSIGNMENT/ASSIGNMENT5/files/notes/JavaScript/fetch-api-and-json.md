# The Fetch API and JSON

`fetch` requests a resource over HTTP and returns a Promise for the response.

## Key ideas
- `const res = await fetch("/files/notes.json");`
- Check `res.ok` – fetch only rejects on network failure, not on 404 or 500.
- `await res.json()` parses the body; `JSON.stringify` does the reverse.
- An AbortController cancels a request that is no longer needed.
