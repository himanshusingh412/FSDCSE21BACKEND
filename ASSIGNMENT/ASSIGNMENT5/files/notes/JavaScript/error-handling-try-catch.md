# Error Handling with try/catch

try/catch lets a program recover from errors instead of crashing.

## Key ideas
- Code that might fail goes in `try`; recovery goes in `catch (error)`.
- `finally` always runs, whether or not an error was thrown.
- Throw your own errors: `throw new Error("Note not found");`
- With async code, wrap `await` calls in try/catch.
- Rethrow errors you cannot handle so a caller further up can deal with them.
