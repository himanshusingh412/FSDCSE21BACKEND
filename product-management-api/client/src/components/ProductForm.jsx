import { useEffect, useState } from "react";

const emptyForm = { name: "", category: "", price: "", quantity: "" };

export default function ProductForm({ onSubmit, editingProduct, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        category: editingProduct.category,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingProduct]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm(emptyForm);
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
      <div className="form-row">
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Category
          <input name="category" value={form.category} onChange={handleChange} required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Price
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            min="0"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">{editingProduct ? "Save Changes" : "Add Product"}</button>
        {editingProduct && (
          <button type="button" className="secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
