import React from "react";

const About = () => {
  return (
    <div className="mx-auto my-10 max-w-5xl rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
      <div className="flex flex-col items-center gap-8 md:flex-row">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src="/dp.jpg"
            alt="Ritik Rishu"
            className="h-52 w-52 rounded-full border-4 border-orange-500 object-cover shadow-[0_0_30px_rgba(249,115,22,0.35)]"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h1 className="mb-2 text-4xl font-bold text-white">
            About Me
          </h1>

          <h2 className="mb-6 text-xl font-semibold text-orange-500">
            Ritik Rishu • Full Stack Developer
          </h2>

          <p className="mb-4 leading-8 text-zinc-400">
            Hi! I'm <span className="font-semibold text-white">Ritik Rishu</span>,
            a passionate Full Stack Developer with experience building modern web
            applications using the MERN stack. I enjoy creating responsive,
            user-friendly interfaces and developing scalable backend systems.
          </p>

          <p className="mb-4 leading-8 text-zinc-400">
            ShopNest is one of my portfolio projects, built to demonstrate
            real-world e-commerce functionality including authentication,
            shopping cart management, payment gateway integration, order
            processing, and an admin dashboard.
          </p>

          <p className="leading-8 text-zinc-400">
            I'm continuously improving my skills in React, Node.js, Express,
            MongoDB, Redux Toolkit, Tailwind CSS, and modern web technologies,
            while also exploring AI-powered applications.
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-12">
        <h3 className="mb-5 text-2xl font-semibold text-white">
          Technologies
        </h3>

        <div className="flex flex-wrap gap-3">
          {[
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Redux Toolkit",
            "Tailwind CSS",
            "JavaScript",
            "JWT",
            "Cloudinary",
            "Razorpay",
            "Git",
            "GitHub",
          ].map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400 transition hover:bg-orange-500 hover:text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-12">
        <h3 className="mb-5 text-2xl font-semibold text-white">
          Connect with Me
        </h3>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/YOUR_USERNAME"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/10 bg-zinc-800 px-5 py-3 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/YOUR_USERNAME"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/10 bg-zinc-800 px-5 py-3 transition hover:border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            LinkedIn
          </a>

          <a
            href="mailto:YOUR_EMAIL@gmail.com"
            className="rounded-lg border border-white/10 bg-zinc-800 px-5 py-3 transition hover:border-green-500 hover:bg-green-500 hover:text-white"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;