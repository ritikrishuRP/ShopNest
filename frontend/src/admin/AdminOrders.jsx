import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      setOrders(
        orders.map((order) =>
          order._id === id
            ? { ...order, status }
            : order
        )
      );
    }
  };

  return (
    <div className="mx-auto my-10 max-w-7xl px-5">
      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
        <h1 className="mb-8 text-3xl font-bold text-orange-500">
          Manage Orders
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Order ID
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  User
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Total
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Date
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-white/10 transition hover:bg-zinc-800/40"
                >
                  <td className="px-4 py-5 font-mono text-sm text-white">
                    {order._id.substring(0, 8)}...
                  </td>

                  <td className="px-4 py-5 text-zinc-300">
                    {order.userId?.name || "Deleted User"}
                  </td>

                  <td className="px-4 py-5 font-semibold text-emerald-500">
                    ₹{order.totalAmount.toFixed(2)}
                  </td>

                  <td className="px-4 py-5 text-zinc-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-5">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div className="py-10 text-center text-zinc-400">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;