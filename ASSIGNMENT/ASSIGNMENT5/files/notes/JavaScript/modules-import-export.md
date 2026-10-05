# Modules: import and export

Modules split code into files that share values explicitly through import and export.

## Key ideas
- Named export: `export function add(a, b) { return a + b; }`
- Default export: `export default App;`
- Import named: `import { add } from "./math.js";`
- Import default: `import App from "./App.jsx";`
- Each module has its own scope; nothing leaks into the global scope.
