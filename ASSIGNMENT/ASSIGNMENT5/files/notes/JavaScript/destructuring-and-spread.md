# Destructuring and Spread

Destructuring pulls values out of arrays and objects; spread copies or merges them.

## Key ideas
- Object: `const { title, subject } = note;`
- Array: `const [first, second] = list;`
- Default values: `const { size = 0 } = note;`
- Spread copies: `const copy = { ...note, title: "New" };`
- Rest collects the remainder: `const [head, ...tail] = list;`
