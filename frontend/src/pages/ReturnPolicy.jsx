import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="mx-auto my-10 max-w-4xl rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-xl">
      <h1 className="mb-8 border-b border-white/10 pb-4 text-3xl font-bold text-white">
        Return & Refund Policy
      </h1>

      <p className="mb-6 leading-8 text-zinc-400">
        This Return & Refund Policy is provided for demonstration purposes as
        part of the ShopNest portfolio project. ShopNest is not a commercial
        store, and no real products are sold through this website.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-orange-500">
          1. Return Eligibility
        </h2>
        <p className="leading-8 text-zinc-400">
          In a real-world e-commerce application, customers would typically be
          able to request a return within a specified period after delivery,
          provided the item is unused, in its original condition, and
          accompanied by proof of purchase.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-orange-500">
          2. Refund Process
        </h2>
        <p className="leading-8 text-zinc-400">
          Since ShopNest uses Razorpay's Sandbox environment for demonstration,
          no real payments are processed and no actual refunds are issued. The
          payment workflow exists solely to demonstrate payment integration.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-orange-500">
          3. Non-Returnable Items
        </h2>
        <p className="leading-8 text-zinc-400">
          Example categories such as digital products, customized items,
          perishable goods, and damaged products may be excluded from returns in
          a production e-commerce system. These examples are included only to
          illustrate a typical policy structure.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-orange-500">
          4. Contact
        </h2>
        <p className="leading-8 text-zinc-400">
          If this were a production application, customers could contact the
          support team regarding return or refund requests. As this is a
          portfolio project, no real return requests or refund claims are
          processed.
        </p>
      </section>

      <div className="mt-10 rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
        <p className="text-sm italic text-zinc-400">
          <strong className="text-orange-500">Note:</strong> ShopNest is a
          demonstration project built to showcase full-stack development skills.
          All products, orders, payments, and policies are simulated for
          educational purposes only.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;