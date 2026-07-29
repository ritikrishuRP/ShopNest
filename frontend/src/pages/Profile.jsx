import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch("/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
            logout();
            navigate("/login");
          }

          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="mx-auto my-10 max-w-6xl px-5">
      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-start">
          <div>
            <h1 className="mb-3 text-4xl font-bold text-white">
              My Profile
            </h1>

            <p className="mb-2 text-lg text-zinc-400">
              <span className="font-semibold text-white">Name:</span>{" "}
              {user.name}
            </p>

            <p className="mb-5 text-lg text-zinc-400">
              <span className="font-semibold text-white">Email:</span>{" "}
              {user.email}
            </p>

            <span className="inline-block rounded-lg bg-orange-500/10 px-4 py-2 text-sm font-bold text-orange-500">
              Account Type: {user.role.toUpperCase()}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Orders */}
        <h2 className="mb-6 text-2xl font-bold text-orange-500">
          Order History
        </h2>

        {loading ? (
          <p className="text-zinc-400">
            Fetching your orders...
          </p>
        ) : orders.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-10 text-center">
            <p className="mb-5 text-zinc-400">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/shop"
              className="inline-block rounded-xl bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/50"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="flex flex-col justify-between gap-6 rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition duration-300 hover:border-orange-500/30 md:flex-row md:items-center"
              >
                <div>
                  <p className="mb-2 text-sm text-zinc-400">
                    Order ID:{" "}
                    <span className="break-all text-white">
                      {order._id}
                    </span>
                  </p>

                  <p className="mb-2 text-sm text-zinc-400">
                    Placed On:{" "}
                    <span className="text-white">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </p>

                  <p className="text-sm text-zinc-400">
                    Total:{" "}
                    <span className="font-bold text-emerald-500">
                      ₹{order.totalAmount.toFixed(2)}
                    </span>
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-block rounded-full px-5 py-2 text-sm font-bold ${
                      order.status === "Delivered"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : order.status === "Shipped"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-amber-500/10 text-amber-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;