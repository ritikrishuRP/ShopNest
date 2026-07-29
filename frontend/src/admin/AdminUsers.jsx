import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/auth/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <div className="mx-auto my-10 max-w-7xl px-5">
      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
        <h1 className="mb-8 text-3xl font-bold text-orange-500">
          User Directory
        </h1>

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
                  Email
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Role
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  Joined
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-white/10 transition hover:bg-zinc-800/40"
                >
                  <td className="px-4 py-5 font-mono text-sm text-white">
                    {u._id.substring(0, 8)}...
                  </td>

                  <td className="px-4 py-5 font-medium text-white">
                    {u.name}
                  </td>

                  <td className="px-4 py-5 text-zinc-300">
                    {u.email}
                  </td>

                  <td className="px-4 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                        u.role === "admin"
                          ? "bg-orange-500/10 text-orange-500"
                          : "bg-emerald-500/10 text-emerald-500"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="px-4 py-5 text-zinc-300">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="py-10 text-center text-zinc-400">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;