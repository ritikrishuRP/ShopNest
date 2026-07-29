import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="mx-auto my-16 max-w-2xl px-5">
      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-10 text-center shadow-2xl">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 text-5xl text-emerald-500">
          ✓
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-4xl font-bold text-emerald-500">
          Payment Successful!
        </h1>

        {/* Message */}
        <p className="mx-auto mb-10 max-w-lg text-lg leading-8 text-zinc-400">
          Thank you for your order. We have securely received your payment and
          will begin processing your shipment shortly.
        </p>

        {/* Action Button */}
        <Link
          to="/shop"
          className="inline-block rounded-xl bg-linear-to-r from-orange-500 to-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;