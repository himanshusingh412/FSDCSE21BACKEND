import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm.jsx";
import ProductList from "./components/ProductList.jsx";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "./api.js";

export default function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSubmit(form) {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, form);
        setEditingProduct(null);
      } else {
        await createProduct(form);
      }
      await loadProducts();
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app">
      <h1>Product Management</h1>
      {error && <p className="error">{error}</p>}
      <ProductForm
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        onCancelEdit={() => setEditingProduct(null)}
      />
      <ProductList products={products} onEdit={setEditingProduct} onDelete={handleDelete} />
    </div>
  );
}
