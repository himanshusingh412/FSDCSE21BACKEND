let products = [
  { id: 1, name: "Wireless Mouse", category: "Electronics", price: 599, quantity: 25 },
  { id: 2, name: "Notebook", category: "Stationery", price: 40, quantity: 200 },
  { id: 3, name: "Office Chair", category: "Furniture", price: 3499, quantity: 12 },
];

let nextId = 4;

function getAll() {
  return products;
}

function getById(id) {
  return products.find((p) => p.id === id);
}

function create(product) {
  const newProduct = { id: nextId++, ...product };
  products.push(newProduct);
  return newProduct;
}

function update(id, updates) {
  const product = getById(id);
  if (!product) return null;
  Object.assign(product, updates);
  return product;
}

function remove(id) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
