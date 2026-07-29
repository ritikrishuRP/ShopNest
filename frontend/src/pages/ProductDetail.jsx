import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1,
      })
    );

    alert("Successfully added to your cart!");
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-xl font-semibold text-orange-500">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-xl font-semibold text-red-500">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-zinc-400">
        <Link
          to="/"
          className="text-orange-500 transition hover:text-orange-400"
        >
          Home
        </Link>

        <span className="mx-2">/</span>

        <Link
          to="/shop"
          className="text-orange-500 transition hover:text-orange-400"
        >
          Shop
        </Link>

        <span className="mx-2">/</span>

        <span>{product.category}</span>

        <span className="mx-2">/</span>

        <span className="font-medium text-white">{product.name}</span>
      </div>

      {/* Product Card */}
      <div className="grid gap-12 rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-125 w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            {product.name}
          </h1>

          <p className="mb-6 text-4xl font-bold text-orange-500">
            ₹{product.price.toFixed(2)}
          </p>

          <div className="mb-8">
            <h3 className="mb-3 text-xl font-semibold text-white">
              Product Description
            </h3>

            <p className="leading-8 text-zinc-400">
              {product.description}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="rounded-xl bg-linear-to-r from-orange-500 to-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/50"
          >
            Add to Cart
          </button>

          <div className="mt-8">
            {product.stock > 0 ? (
              <p className="font-semibold text-emerald-500">
                ● In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="font-semibold text-red-500">
                ● Out of Stock
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 