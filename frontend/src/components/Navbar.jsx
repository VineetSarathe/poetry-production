import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LanguageToggle from "./LanguageToggle";
import Logo from "../assets/Logo.png";

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const location = useLocation();   // ✅ NEW

  // underline hover effect
  const linkClass =
    "relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full";

  // close mobile menu
  const handleNavClick = () => {
    setOpen(false);
  };

  // ✅ AUTO CLOSE MENU ON ROUTE CHANGE
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-[#5b1919] backdrop-blur-md text-white pr-8 py-3 fixed top-0 left-0 right-0 z-50 shadow-md rounded-2xl m-2">

      <div className="flex justify-between items-center max-w-7xl mx-auto">

        {/* LOGO */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="h-[20px] w-[240px] flex items-center shrink-0"
        >
          <img
            src={Logo}
            alt="Logo"
            className="h-[180px] object-contain"
          />
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex gap-8 items-center">

          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/poems" className={linkClass}>
            Poems
          </NavLink>

          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>

          {/* ✅ Always Visible */}
          <NavLink to="/admin/dashboard" className={linkClass}>
            Admin
          </NavLink>

          <LanguageToggle />
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 px-2">

          <NavLink
            to="/"
            end
            className={linkClass}
            onClick={handleNavClick}
          >
            Home
          </NavLink>

          <NavLink
            to="/poems"
            className={linkClass}
            onClick={handleNavClick}
          >
            Poems
          </NavLink>

          {/* ✅ ADD THIS */}
          <NavLink
            to="/about"
            className={linkClass}
            onClick={handleNavClick}
          >
            About
          </NavLink>

          <NavLink
            to="/admin/dashboard"
            className={linkClass}
            onClick={handleNavClick}
          >
            Admin
          </NavLink>

          <div className="bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition">
            <LanguageToggle />
          </div>

        </div>
      )}
    </nav>
  );
}
