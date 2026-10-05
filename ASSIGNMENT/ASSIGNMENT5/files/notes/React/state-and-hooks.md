# State and Hooks

`useState` stores values that change over time; `useEffect` runs side effects after render.

## Key ideas
- `const [value, setValue] = useState(initial)`.
- Updating state re-renders the component.
- `useEffect(fn, [deps])` re-runs only when deps change.
- Derive values (like filtered lists) during render instead of storing them in state.
