# Conditional Rendering

React shows different UI based on state using ordinary JavaScript expressions inside JSX.

## Key ideas
- Ternary for either/or: `{loading ? <Spinner /> : <List />}`.
- `&&` for show/hide: `{error && <p>{error}</p>}`.
- Beware `{count && ...}`: a count of 0 renders "0".
- Return early from a component for loading and error states.
