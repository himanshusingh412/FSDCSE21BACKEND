# Handling Forms

In a controlled input, React state holds the value and onChange updates it.

## Key ideas
- `<input value={text} onChange={(e) => setText(e.target.value)} />`.
- Call `e.preventDefault()` in onSubmit to stop the page from reloading.
- Derive validation messages from state during render.
- A search box is a controlled input whose value filters a list.
