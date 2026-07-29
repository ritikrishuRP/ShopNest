import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/analytics", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate("/login");
          }

          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [user, navigate]);

  const cards = [
    {
      title: "Total Orders",
      value: stats?.totalOrders,
    },
    {
      title: "Total Products",
      value: stats?.totalProducts,
    },
    {
      title: "Total Users",
      value: stats?.totalUsers,
    },
    {
      title: "Total Revenue",
      value: `₹${stats?.totalRevenue.toFixed(2)}`,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-2 flex items-center gap-4">
          <img
            src="/ShopNestLogo.png"
            alt="ShopNest Logo"
            className="h-12 w-12 rounded-xl object-cover drop-shadow-[0_0_12px_rgba(249,115,22,0.35)]"
          />

          <h1 className="text-4xl font-bold text-white">
            Admin Dashboard
          </h1>
        </div>

        <p className="text-lg text-zinc-400">
          Welcome back,{" "}
          <span className="font-semibold text-white">
            {user?.name}
          </span>
        </p>
      </div>

      {/* Statistics */}
      {stats ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-zinc-900 p-8 text-center shadow-xl transition duration-300 hover:-translate-y-1 hover:border-orange-500/30"
            >
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-400">
                {card.title}
              </h3>

              <p className="text-5xl font-bold text-orange-500">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center">
          <p className="text-lg font-semibold text-orange-500">
            Loading metrics...
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-xl">
        <h2 className="mb-8 text-2xl font-bold text-orange-500">
          Administrative Controls
        </h2>

        <div className="flex flex-wrap gap-5">
          <button
            onClick={() => navigate("/admin/add-product")}
            className="rounded-xl bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/50"
          >
            + Add Product
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className="rounded-xl bg-zinc-700 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-zinc-600"
          >
            📦 Manage Products
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
            className="rounded-xl bg-zinc-700 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-zinc-600"
          >
            🚚 Manage Orders
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="rounded-xl bg-zinc-700 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-zinc-600"
          >
            👥 Users Directory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;