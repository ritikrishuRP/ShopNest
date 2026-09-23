import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { AuthContext } from "../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (res.ok) {
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", {
        state: {
          from: `/product/${id}`,
        },
      });

      return;
    }

    if (!product || product.stock <= 0) return;

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

        {/* CLICKABLE CATEGORY */}
        <Link
          to={`/shop?category=${encodeURIComponent(product.category)}`}
          className="text-orange-500 transition hover:text-orange-400"
        >
          {product.category}
        </Link>

        <span className="mx-2">/</span>

        <span className="font-medium text-white">
          {product.name}
        </span>
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
            disabled={product.stock <= 0}
            className="rounded-xl bg-linear-to-r from-orange-500 to-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;