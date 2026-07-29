import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      if (res.ok) {
        alert("Product updated successfully!");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20";

  return (
    <div className="mx-auto my-10 max-w-3xl px-5">
      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
        <h1 className="mb-8 text-3xl font-bold text-orange-500">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            placeholder="Product Name"
            required
            value={formData.name}
            className={inputClass}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <textarea
            rows={5}
            placeholder="Description"
            required
            value={formData.description}
            className={`${inputClass} resize-none`}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Price"
            required
            value={formData.price}
            className={inputClass}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Category"
            required
            value={formData.category}
            className={inputClass}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Stock Quantity"
            required
            value={formData.stock}
            className={inputClass}
            onChange={(e) =>
              setFormData({
                ...formData,
                stock: e.target.value,
              })
            }
          />

          {/* Image Upload */}
          <div className="rounded-xl border-2 border-dashed border-orange-500/40 bg-zinc-950 p-5">
            <label className="mb-3 block font-medium text-zinc-300">
              Replace Image (Optional)
            </label>

            <input
              type="file"
              accept="image/*"
              className="block w-full cursor-pointer text-sm text-zinc-300 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-orange-600"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-linear-to-r from-orange-500 to-orange-600 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;