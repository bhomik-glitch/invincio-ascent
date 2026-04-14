import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Why Invincio", href: "/difference" },
  { label: "Recommendations", href: "/results" },
  { label: "Process", href: "/process" },
  { label: "FAQs", href: "/faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 h-16"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #e5e7eb" : "1px solid rgba(229,231,235,0.6)",
        boxShadow: scrolled ? "0 2px 16px rgba(0,86,140,0.06)" : "none",
        transition: "background 250ms ease, box-shadow 250ms ease, border-color 250ms ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex items-center justify-between">

        <Link to="/" className="flex items-center">
          <img src="/assets/logo.png" alt="Invincio" className="h-9 md:h-10 w-auto object-contain" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-base font-medium text-[#00568C] hover:text-[#2FB4E7] transition-colors duration-150"
              style={{ textDecoration: "none" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* CTA — golden yellow, deep blue text */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-[#F6B828] text-[#00568C] px-5 py-2 rounded-full text-sm font-semibold group"
            style={{
              transition: "background-color 200ms ease, transform 120ms ease, box-shadow 200ms ease",
              boxShadow: "0 2px 8px rgba(246,184,40,0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e0a720";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(246,184,40,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#F6B828";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(246,184,40,0.25)";
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Register Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#00568C] p-1"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden border-t border-[#e5e7eb] px-6 py-5 flex flex-col gap-4"
          style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(12px)" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-[#00568C] hover:text-[#2FB4E7] transition-colors duration-150"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-[#F6B828] text-[#00568C] px-5 py-2.5 rounded-full text-sm font-semibold mt-2"
            style={{ transition: "background-color 200ms ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0a720")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F6B828")}
          >
            Register Now
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
