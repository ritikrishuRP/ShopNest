import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/5 bg-zinc-950 px-5 py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
        <div>
          <h3 className="mb-2.5 text-xl font-semibold text-orange-500">
            ShopNest
          </h3>
          <p className="text-sm text-zinc-400">
            Premium E-Commerce Platform.
          </p>
        </div>

        <div className="flex gap-5">
          <Link
            to="/about"
            className="text-sm text-zinc-400 transition-colors hover:text-orange-500"
          >
            About Us
          </Link>

          <Link
            to="/return"
            className="text-sm text-zinc-400 transition-colors hover:text-orange-500"
          >
            Return Policy
          </Link>

          <Link
            to="/disclaimer"
            className="text-sm text-zinc-400 transition-colors hover:text-orange-500"
          >
            Disclaimer
          </Link>
        </div>

        <div className="text-sm text-zinc-400">
          &copy; {new Date().getFullYear()} ShopNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;