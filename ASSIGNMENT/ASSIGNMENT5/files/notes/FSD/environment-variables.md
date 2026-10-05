# Environment Variables and Configuration

Settings that change between machines, like ports and secrets, belong in environment variables, not in code.

## Key ideas
- Read them with `process.env.PORT`.
- Provide fallbacks: `const PORT = process.env.PORT ?? 5001;`
- Node 20+ can load a file directly: `node --env-file=.env server.js`.
- Add `.env` to .gitignore so secrets never reach the repository.
- Keep a committed `.env.example` listing the variable names without real values.
