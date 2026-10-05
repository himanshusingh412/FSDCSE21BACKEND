# Setting Up React with Vite

Vite creates a React project with a fast dev server and an optimized production build.

## Key ideas
- `npm create vite@latest my-app -- --template react` scaffolds the project.
- `npm run dev` starts the dev server with hot reload.
- `npm run build` writes optimized files to `dist/`.
- `server.proxy` in vite.config.js forwards requests (like `/files`) to a backend.
