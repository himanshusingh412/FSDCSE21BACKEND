import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5001/api/products";

// Give every category its own colour (same text -> same hue)
const hueFor = (text) => {
  let hash = 0;
  for (const ch of String(text)) hash = ch.charCodeAt(0) + hash * 31;
  return Math.abs(hash) % 360;
};

// Small inline icons
const BoxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" /><path d="m3 8 9 5 9-5" /><path d="M12 13v8" />
  </svg>
);
const TagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" /><circle cx="7.5" cy="7.5" r="1.5" />
  </svg>
);
const WalletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5" /><path d="M17 14h.01" />
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" />
  </svg>
);

function App() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Get Products
  const getProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
      setError("");
    } catch {
      setError("Could not reach the server. Is the backend running on port 5001?");
    } finally {
      setLoading(false);
    }
  };

  // Run when page loads
  useEffect(() => {
    getProducts();
  }, []);


  // Add Product
  const addProduct = async (e) => {

    e.preventDefault();

    if (!name.trim() || !price || !category.trim()) return;

    const product = {
      name: name.trim(),
      price: price,
      category: category.trim()
    };

    setSaving(true);

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    // Clear form
    setName("");
    setPrice("");
    setCategory("");

    // Get updated products
    await getProducts();
    setSaving(false);
  };


  // Delete Product
  const deleteProduct = async (id) => {

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    getProducts();
  };


  // Stats
  const totalValue = products.reduce((sum, p) => sum + Number(p.price || 0), 0);
  const categoryCount = new Set(products.map((p) => p.category)).size;

  const formatPrice = (value) =>
    "₹" + Number(value || 0).toLocaleString("en-IN");

  // Search filter
  const query = search.toLowerCase();
  const filteredProducts = products.filter(
    (p) =>
      String(p.name).toLowerCase().includes(query) ||
      String(p.category).toLowerCase().includes(query)
  );


  return (
    <div className="app">

      {/* Background colour glows */}
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="glow glow-3" />
      <div className="grain" />


      {/* Header */}

      <header className="header">
        <div className="brand">
          <span className="brand-mark">P</span>
          <span className="brand-name">Productly</span>
        </div>
        <span className="status">
          <span className={error ? "dot dot-off" : "dot"} />
          {error ? "API offline" : "API connected"}
        </span>
      </header>


      <main className="main">

        <section className="intro">
          <span className="eyebrow">
            <span className="eyebrow-tag">NEW</span>
            Inventory dashboard
          </span>
          <h1>
            Manage your products <em>beautifully.</em>
          </h1>
          <p className="subtitle">
            Add, browse and remove products from your catalogue — all in one place.
          </p>
        </section>


        {/* Stats */}

        <section className="stats">
          <div className="stat stat-violet">
            <span className="stat-icon"><BoxIcon /></span>
            <div className="stat-text">
              <span className="stat-label">Total products</span>
              <span className="stat-value">{products.length}</span>
            </div>
          </div>
          <div className="stat stat-cyan">
            <span className="stat-icon"><TagIcon /></span>
            <div className="stat-text">
              <span className="stat-label">Categories</span>
              <span className="stat-value">{categoryCount}</span>
            </div>
          </div>
          <div className="stat stat-amber">
            <span className="stat-icon"><WalletIcon /></span>
            <div className="stat-text">
              <span className="stat-label">Inventory value</span>
              <span className="stat-value">{formatPrice(totalValue)}</span>
            </div>
          </div>
        </section>


        {error && <div className="alert">{error}</div>}


        <div className="grid">

          {/* Add Product Form */}

          <form className="card form" onSubmit={addProduct}>

            <div>
              <h2>New product</h2>
              <p className="card-sub">Fill in the details below.</p>
            </div>

            <label className="field">
              <span>Product name</span>
              <input
                type="text"
                placeholder="e.g. Wireless Mouse"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label className="field">
              <span>Price (₹)</span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>

            <label className="field">
              <span>Category</span>
              <input
                type="text"
                placeholder="e.g. Electronics"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </label>

            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Adding…" : "Add product"}
            </button>

          </form>


          {/* Product Table */}

          <section className="card table-card">

            <div className="table-head">
              <div>
                <h2>All products</h2>
                <p className="card-sub">
                  {filteredProducts.length} of {products.length} shown
                </p>
              </div>
              <div className="search-wrap">
                <SearchIcon />
                <input
                  type="search"
                  className="search"
                  placeholder="Search name or category…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="empty">Loading products…</div>
            ) : filteredProducts.length === 0 ? (
              <div className="empty">
                <span className="empty-icon"><BoxIcon /></span>
                {products.length === 0
                  ? "No products yet. Add your first one."
                  : "No products match your search."}
              </div>
            ) : (
              <table>

                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th className="right">Price</th>
                    <th className="right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="col-product">
                        <div className="product">
                          <span className="avatar" style={{ "--hue": hueFor(product.name) }}>
                            {String(product.name).charAt(0)}
                          </span>
                          <div>
                            <div className="product-name">{product.name}</div>
                            <div className="product-id">#{product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="col-category">
                        <span className="chip" style={{ "--hue": hueFor(product.category) }}>
                          {product.category}
                        </span>
                      </td>
                      <td className="right col-price">
                        <span className="price">{formatPrice(product.price)}</span>
                      </td>
                      <td className="right col-action">
                        <button
                          className="btn-danger"
                          onClick={() => deleteProduct(product.id)}
                          aria-label={`Delete ${product.name}`}
                          title="Delete"
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            )}

          </section>

        </div>

      </main>

    </div>
  );
}

export default App;
