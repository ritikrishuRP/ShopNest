 import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-10 text-center shadow-xl">
          <p className="text-lg text-zinc-400">
            Your cart is empty.
          </p>

          <Link
            to="/shop"
            className="mt-5 inline-block rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white transition hover:-translate-y-1"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          {/* Cart Items */}
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-xl transition-all duration-300 hover:translate-x-1 hover:border-orange-500/30 md:flex-row md:items-center"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-32 w-32 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {item.name}
                  </h3>

                  <p className="mb-4 text-lg font-bold text-orange-500">
                    ₹{item.price.toFixed(2)}
                  </p>

                  {/* Quantity */}
                  <div className="mb-5 flex items-center gap-4">
                    <button
                      onClick={() =>
                        handleUpdateQty(item, item.qty - 1)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-white transition hover:border-orange-500 hover:bg-orange-500"
                    >
                      −
                    </button>

                    <span className="text-lg font-semibold text-white">
                      {item.qty}
                    </span>

                    <button
                      onClick={() =>
                        handleUpdateQty(item, item.qty + 1)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-white transition hover:border-orange-500 hover:bg-orange-500"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-xl lg:sticky lg:top-24">
            <h2 className="mb-6 border-b border-white/10 pb-4 text-3xl font-bold text-white">
              Order Summary
            </h2>

            <div className="mb-8 flex items-center justify-between">
              <span className="text-zinc-400">
                Total
              </span>

              <span className="text-3xl font-bold text-orange-500">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full rounded-xl bg-linear-to-r from-orange-500 to-orange-600 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/50"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;