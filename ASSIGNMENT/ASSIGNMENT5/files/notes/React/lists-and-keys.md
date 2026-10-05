# Lists and Keys

Render arrays with `.map()`; each item needs a key that is unique and stable among its siblings.

## Key ideas
- Use an id from the data as the key, not the array index, when items can be reordered.
- Keys help React match old and new items between renders.
- Keys only need to be unique within one list.
- Filtering a list is just `.filter()` before `.map()`.

## Example
```jsx
<ul>
  {notes.map((note) => <li key={note.id}>{note.title}</li>)}
</ul>
```
