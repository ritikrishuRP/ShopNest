import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const { user } = useContext(AuthContext);

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handlePayment = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      navigate("/shop");
      return;
    }

    try {
      setLoading(true);

      // 1. Create Razorpay order on backend
      const orderRes = await fetch("/api/payments/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          amount: totalPrice,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        console.error("Razorpay order error:", orderData);

        alert(
          orderData.message ||
            "Failed to initialize Razorpay payment."
        );

        return;
      }

      // Make sure Razorpay SDK is available
      if (!window.Razorpay) {
        alert(
          "Razorpay SDK is not loaded. Please refresh the page and try again."
        );
        return;
      }

      // 2. Razorpay checkout configuration
      const options = {
        key: orderData.key_id,

        amount: orderData.amount,

        currency: orderData.currency,

        name: "ShopNest",

        description: "ShopNest Order",

        order_id: orderData.id,

        handler: async function (response) {
          try {
            // 3. Verify payment on backend
            const verifyRes = await fetch(
              "/api/payments/verify",
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },

                body: JSON.stringify(response),
              }
            );

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              alert(
                verifyData.message ||
                  "Payment verification failed."
              );

              return;
            }

            // 4. Save order in database
            const saveOrderRes = await fetch(
              "/api/orders",
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },

                body: JSON.stringify({
                  items: cartItems,
                  totalAmount: totalPrice,
                  address,
                  paymentId:
                    response.razorpay_payment_id,
                }),
              }
            );

            const saveOrderData =
              await saveOrderRes.json();

            if (!saveOrderRes.ok) {
              alert(
                saveOrderData.message ||
                  "Payment succeeded but order could not be saved."
              );

              return;
            }

            // 5. Clear cart
            dispatch(clearCart());

            // 6. Redirect
            navigate("/ordersuccess");

          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            alert(
              "Something went wrong while verifying payment."
            );
          }
        },

        prefill: {
          name: address.fullName,
          email: user.email,
        },

        notes: {
          address: `${address.street}, ${address.city}, ${address.postalCode}, ${address.country}`,
        },

        theme: {
          color: "#f97316",
        },

        modal: {
          ondismiss: function () {
            console.log(
              "Razorpay checkout closed by user."
            );
          },
        },
      };

      // 7. Open Razorpay
      const razorpay = new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Razorpay payment failed:",
            response.error
          );

          alert(
            response.error?.description ||
              "Payment failed."
          );
        }
      );

      razorpay.open();

    } catch (error) {
      console.error(
        "Payment initialization error:",
        error
      );

      alert(
        "Unable to start payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    handlePayment();
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">

      <h1 className="mb-8 text-center text-4xl font-bold text-white">
        Checkout
      </h1>

      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <h2 className="mb-3 text-2xl font-semibold text-white">
            Shipping Address
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            required
            value={address.fullName}
            onChange={(e) =>
              setAddress({
                ...address,
                fullName: e.target.value,
              })
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          <input
            type="text"
            placeholder="Street Address"
            required
            value={address.street}
            onChange={(e) =>
              setAddress({
                ...address,
                street: e.target.value,
              })
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          <input
            type="text"
            placeholder="City"
            required
            value={address.city}
            onChange={(e) =>
              setAddress({
                ...address,
                city: e.target.value,
              })
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          <input
            type="text"
            placeholder="Postal Code"
            required
            value={address.postalCode}
            onChange={(e) =>
              setAddress({
                ...address,
                postalCode: e.target.value,
              })
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          <input
            type="text"
            placeholder="Country"
            required
            value={address.country}
            onChange={(e) =>
              setAddress({
                ...address,
                country: e.target.value,
              })
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          <div className="mt-8 border-t border-white/10 pt-6">

            <div className="mb-6 flex items-center justify-between">

              <span className="text-lg text-zinc-400">
                Total Amount
              </span>

              <span className="text-3xl font-bold text-orange-500">
                ₹{totalPrice.toFixed(2)}
              </span>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-linear-to-r from-orange-500 to-orange-600 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Opening Payment..."
                : "Pay Now"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Checkout;