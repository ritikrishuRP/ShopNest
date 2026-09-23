import Razorpay from "razorpay";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid payment amount",
      });
    }

    // Razorpay expects amount in paise
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      ...order,

      // Public key ID can safely be sent to frontend
      key_id: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error("Razorpay Create Order Error:", error);

    res.status(500).json({
      message: error.message || "Failed to create Razorpay order",
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message: "Incomplete payment information",
      });
    }

    const sign =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSign = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({
        message: "Payment verified successfully",
      });
    }

    return res.status(400).json({
      message: "Invalid payment signature",
    });

  } catch (error) {
    console.error("Razorpay Verification Error:", error);

    res.status(500).json({
      message: "Payment verification failed",
    });
  }
};