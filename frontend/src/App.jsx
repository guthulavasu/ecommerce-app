
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      axios.get("/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Unable to load products");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>My E-Commerce Store</h1>
      <p>Welcome to our online shopping platform!</p>

      {loading && <h3>Loading products...</h3>}
      {error && <h3>{error}</h3>}

      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p>Price: ₹{Number(product.price).toLocaleString("en-IN")}</p>
            <button>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
