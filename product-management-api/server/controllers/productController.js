const store = require("../data/products");

function validateProduct(body) {
  const { name, category, price, quantity } = body;
  if (!name || typeof name !== "string") return "name is required";
  if (!category || typeof category !== "string") return "category is required";
  if (price === undefined || isNaN(Number(price))) return "price must be a number";
  if (quantity === undefined || isNaN(Number(quantity))) return "quantity must be a number";
  return null;
}

exports.getAllProducts = (req, res) => {
  res.json(store.getAll());
};

exports.getProductById = (req, res) => {
  const product = store.getById(Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
};

exports.createProduct = (req, res) => {
  const error = validateProduct(req.body);
  if (error) return res.status(400).json({ error });

  const { name, category, price, quantity } = req.body;
  const product = store.create({
    name,
    category,
    price: Number(price),
    quantity: Number(quantity),
  });
  res.status(201).json(product);
};

exports.updateProduct = (req, res) => {
  const id = Number(req.params.id);
  const error = validateProduct(req.body);
  if (error) return res.status(400).json({ error });

  const { name, category, price, quantity } = req.body;
  const updated = store.update(id, {
    name,
    category,
    price: Number(price),
    quantity: Number(quantity),
  });
  if (!updated) return res.status(404).json({ error: "Product not found" });
  res.json(updated);
};

exports.deleteProduct = (req, res) => {
  const id = Number(req.params.id);
  const deleted = store.remove(id);
  if (!deleted) return res.status(404).json({ error: "Product not found" });
  res.status(204).send();
};
