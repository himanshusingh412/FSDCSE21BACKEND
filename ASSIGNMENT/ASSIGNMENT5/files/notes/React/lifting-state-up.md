# Lifting State Up

When two components need the same data, move the state to their closest common parent and pass it down as props.

## Key ideas
- The parent owns the state; children receive values and callbacks.
- Example: a search box and a results list share `searchTerm` held in their parent.
- Keeps a single source of truth instead of duplicated, out-of-sync state.
- Pass setter functions down as props: `onSearch={setSearchTerm}`.
