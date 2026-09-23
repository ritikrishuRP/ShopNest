import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 px-5 py-4 shadow-2xl backdrop-blur-xl md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">

        {/* Logo */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(249,115,22,0.3)]"
          >
            <img
              src="/ShopNestLogo.png"
              alt="ShopNest"
              className="h-9 w-9 rounded-lg object-cover drop-shadow-[0_2px_8px_rgba(249,115,22,0.35)]"
            />

            <span>
              ShopNest
              <span className="text-3xl text-orange-500">.</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <ul className="flex flex-wrap items-center gap-7">

          {/* Shop - visible to everyone */}
          <li>
            <Link
              to="/shop"
              className="relative text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Shop
            </Link>
          </li>

          {user ? (
            <>
              {/* Cart - only logged-in users */}
              <li>
                <Link
                  to="/cart"
                  className="relative text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Cart ({cartItems.length})
                </Link>
              </li>

              {/* Profile */}
              <li>
                <Link
                  to="/profile"
                  className="relative text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Hi, {user.name}
                </Link>
              </li>

              {/* Admin */}
              {user.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className="relative text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Admin
                  </Link>
                </li>
              )}

              {/* Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-md border border-red-500/30 px-4 py-2 font-semibold text-red-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            /* Login */
            <li>
              <Link
                to="/login"
                className="relative text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;