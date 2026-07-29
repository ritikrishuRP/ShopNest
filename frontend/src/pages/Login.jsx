import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl"
      >
        {/* Top Gradient Line */}
        <div className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-transparent via-orange-500 to-transparent"></div>

        <h2 className="mb-8 text-center text-3xl font-bold text-white">
          Welcome Back
        </h2>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-linear-to-r from-orange-500 to-orange-600 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/50"
          >
            Login
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-orange-500 transition hover:text-orange-400 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;