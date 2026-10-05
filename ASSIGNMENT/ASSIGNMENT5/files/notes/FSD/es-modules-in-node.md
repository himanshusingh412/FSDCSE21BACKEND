# ES Modules in Node.js

Use `import` / `export` instead of `require()` by setting "type": "module" in package.json.

## Key ideas
- Named exports: `export const add = (a, b) => a + b;`
- Default export: `export default app;`
- File extensions are required in relative imports: `import x from "./x.js"`.
- `import.meta.dirname` replaces `__dirname`.
- Top-level `await` works in modules.
