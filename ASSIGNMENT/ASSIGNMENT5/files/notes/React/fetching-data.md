# Fetching Data in React

Load data inside `useEffect` with `fetch`, then store the result in state.

## Key ideas
- Track loading and error states, not just the data.
- Use an AbortController to cancel requests when a component unmounts.
- Parse JSON with `await response.json()`.
- Check `response.ok` before trusting the body.
