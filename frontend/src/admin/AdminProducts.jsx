import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
      }
    }
  };

  return (
    <div className="mx-auto my-10 max-w-7xl px-5">
      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-orange-500">
            Manage Products
          </h1>

          <Link
            to="/admin/add-product"
            className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/50"
          >
            + Add Product
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  ID
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Name
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Price
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Category
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Stock
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-white/10 transition hover:bg-zinc-800/40"
                >
                  <td className="px-4 py-5 font-mono text-sm text-white">
                    {product._id.substring(0, 8)}...
                  </td>

                  <td className="px-4 py-5 text-white">
                    {product.name}
                  </td>

                  <td className="px-4 py-5 font-semibold text-orange-500">
                    ₹{product.price.toFixed(2)}
                  </td>

                  <td className="px-4 py-5 text-zinc-300">
                    {product.category}
                  </td>

                  <td className="px-4 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        product.stock > 0
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="py-10 text-center text-zinc-400">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;