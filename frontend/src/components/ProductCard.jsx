import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-zinc-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/30 hover:shadow-2xl">
      <div className="overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between bg-gradient-to-t from-zinc-900 via-zinc-900 to-transparent p-5">
        <div>
          <h3 className="mb-2 truncate text-lg font-semibold text-white">
            {product.name}
          </h3>

          <p className="mb-4 text-2xl font-bold text-orange-500">
            ₹{product.price}
          </p>
        </div>

        <Link
          to={`/product/${product._id}`}
          className="rounded-md bg-orange-500 px-4 py-2 text-center font-medium text-white transition-all duration-300 hover:bg-orange-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;