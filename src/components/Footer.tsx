import { MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#eaf6f8] border-t border-[#e5e7eb] px-6 py-16 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <p className="font-serif text-2xl font-bold text-[#00568C] mb-4">INVINCIO</p>
            <p className="font-sans text-sm leading-relaxed text-[#6B7280] mb-6">
              Leadership Transformation Institute. Specialized mentorship by Ex-SSB Assessors.
            </p>
            <div className="flex gap-4 items-center">
              <a
                href="https://www.instagram.com/lt_col_ankur_sabharwal"
                className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-150"
                aria-label="Instagram"
              >
                <img src="/assets/instagram-1-svgrepo-com.svg" alt="Instagram" className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-150"
                aria-label="LinkedIn"
              >
                <img src="/linkedin-svgrepo-com.svg" alt="LinkedIn" className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@learntolivetolearn"
                className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-150"
                aria-label="YouTube"
              >
                <img src="/youtube-svgrepo-com.svg" alt="YouTube" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#00568C] mb-4">Quick Links</h4>
            <div className="space-y-3 font-sans text-sm">
              {[
                { label: "About Us",        href: "/about"    },
                { label: "Programs",        href: "/programs" },
                { label: "Success Stories", href: "/results"  },
                { label: "FAQs",            href: "/faq"      },
                { label: "Contact",         href: "#contact"  },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  to={href}
                  className="block text-[#6B7280] hover:text-[#2FB4E7] transition-colors duration-150"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#00568C] mb-4">Contact Us</h4>
            <div className="space-y-4 font-sans text-sm">
              <div className="flex items-start gap-3 text-[#6B7280]">
                <MapPin className="w-4 h-4 text-[#00568C] shrink-0 mt-0.5" />
                <span>New Delhi, India</span>
              </div>
              <div className="flex items-center gap-3 text-[#6B7280]">
                <Phone className="w-4 h-4 text-[#00568C] shrink-0" />
                <a
                  href="tel:+918601407444"
                  className="hover:text-[#2FB4E7] transition-colors duration-150"
                >
                  +91 86014 07444
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#6B7280]">
                <Mail className="w-4 h-4 text-[#00568C] shrink-0" />
                <a
                  href="mailto:invincio_soldier@outlook.com"
                  className="hover:text-[#2FB4E7] transition-colors duration-150"
                >
                  invincio_soldier@outlook.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e5e7eb] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-[#6B7280]">
            © 2026 Invincio Services LLP. All rights reserved.
          </p>
          <div className="flex gap-6 font-sans text-xs text-[#6B7280]">
            <a href="#" className="hover:text-[#2FB4E7] transition-colors duration-150">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#2FB4E7] transition-colors duration-150">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
