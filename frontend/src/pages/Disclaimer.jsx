import React from "react";

const Disclaimer = () => {
  return (
    <div className="mx-auto my-10 max-w-4xl rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-xl">
      <h1 className="mb-8 border-b border-white/10 pb-4 text-3xl font-bold text-white">
        Legal & Site Disclaimer
      </h1>

      <p className="mb-6 leading-8 text-zinc-400">
        ShopNest is a personal portfolio project created for educational and
        demonstration purposes. It showcases full-stack web development skills,
        including React, Node.js, Express, MongoDB, Redux, and Razorpay
        integration. This website is not intended to operate as a commercial
        e-commerce platform.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-orange-500">
          1. Product Information
        </h2>
        <p className="leading-8 text-zinc-400">
          Product names, descriptions, prices, and images displayed on this
          website are for demonstration purposes only. Some images may be
          sourced from publicly available placeholder services, and the products
          shown may not represent actual items for sale.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-orange-500">
          2. Payment Processing
        </h2>
        <p className="leading-8 text-zinc-400">
          All payment functionality is configured to use Razorpay's Sandbox/Test
          environment. No real financial transactions are processed, and no
          actual charges will be made during testing.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-orange-500">
          3. External Links
        </h2>
        <p className="leading-8 text-zinc-400">
          This website may contain links to third-party websites or services.
          ShopNest is not responsible for the content, privacy policies, or
          practices of any external websites.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-orange-500">
          4. Intellectual Property
        </h2>
        <p className="leading-8 text-zinc-400">
          All custom source code, UI designs, and project implementations are
          created solely for learning and portfolio purposes. Any trademarks,
          logos, or third-party assets remain the property of their respective
          owners.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-orange-500">
          5. Acceptance
        </h2>
        <p className="leading-8 text-zinc-400">
          By using this website, you acknowledge that it is a demonstration
          application and agree to use it solely for evaluation and educational
          purposes.
        </p>
      </section>

      <div className="mt-10 rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
        <p className="text-sm italic text-zinc-400">
          <strong className="text-orange-500">Note:</strong> ShopNest is a
          portfolio project and is not affiliated with any real e-commerce
          company or brand.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;