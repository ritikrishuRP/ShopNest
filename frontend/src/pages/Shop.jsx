import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (res.ok) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      !category ||
      product.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">

      {/* Heading */}
      <h1 className="mb-2 text-center text-4xl font-bold text-white">
        {category ? `${category} Products` : "All Products"}
      </h1>

      {category && (
        <p className="mb-8 text-center text-zinc-400">
          Showing products from the {category} category
        </p>
      )}

      {!category && <div className="mb-8" />}

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
            {category
              ? `No products found in ${category}.`
              : "Try searching with another keyword."}
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