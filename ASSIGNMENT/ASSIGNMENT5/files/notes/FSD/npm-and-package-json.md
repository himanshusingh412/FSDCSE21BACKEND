# npm and package.json

package.json describes a Node project: its name, scripts, dependencies and module type.

## Key ideas
- `npm init -y` creates a package.json with defaults.
- `npm install express` adds a dependency; `--save-dev` adds a dev dependency.
- `"scripts"` defines commands run with `npm run <name>` (`npm start` needs no `run`).
- `"type": "module"` enables `import` / `export` in .js files.
- Commit package-lock.json; never commit node_modules.
