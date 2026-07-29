import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.slice(0, 4)); // Featured products
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div
        className="
          relative overflow-hidden rounded-2xl
          bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.2),transparent_60%),linear-gradient(135deg,#18181b_0%,#09090b_100%)]
          text-white
          px-8 py-24
          text-center
          border border-white/5
          shadow-[0_10px_40px_rgba(0,0,0,0.5)]
          mb-12
        "
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-5 drop-shadow-lg">
          Welcome to ShopNest
        </h1>

        <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto">
          Discover the best products at unbeatable prices.
        </p>
      </div>

      {/* Featured Products */}
      <h2 className="text-3xl font-bold text-white mb-8">
        Featured Products
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-zinc-400">Loading...</div>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;