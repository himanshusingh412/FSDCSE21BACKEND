# useRef and DOM Access

`useRef` holds a mutable value that survives re-renders without causing one, and can point at a DOM element.

## Key ideas
- `const inputRef = useRef(null);` then `<input ref={inputRef} />`.
- Access the element with `inputRef.current` (e.g. `.focus()`).
- Changing `ref.current` does not trigger a re-render.
- Useful for timers, previous values and focusing inputs.
