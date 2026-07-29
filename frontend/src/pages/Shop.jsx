import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="mb-8 text-center text-4xl font-bold text-white">
        All Products
      </h1>

      {/* Search */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
        />
      </div>

      {loading ? (
        <div className="flex h-60 items-center justify-center">
          <p className="text-lg font-semibold text-orange-500">
            Loading Products...
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900 py-16 text-center shadow-xl">
          <h2 className="mb-3 text-2xl font-semibold text-white">
            No Products Found
          </h2>

          <p className="text-zinc-400">
            Try searching with another keyword.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;