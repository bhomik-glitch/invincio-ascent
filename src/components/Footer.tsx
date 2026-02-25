import { MapPin, Mail, Phone, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="section-padding bg-card border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl font-bold gold-text mb-4">INVINCIO</p>
            <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-6">
              Leadership Transformation Institute. Mentorship by Former SSB Assessors.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3 font-sans text-sm">
              <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">About Us</a>
              <a href="#programs" className="block text-muted-foreground hover:text-primary transition-colors">Programs</a>
              <a href="#results" className="block text-muted-foreground hover:text-primary transition-colors">Success Stories</a>
              <a href="#faq" className="block text-muted-foreground hover:text-primary transition-colors">FAQs</a>
              <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4 font-sans text-sm">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>New Delhi, India</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+919999999999" className="hover:text-primary transition-colors">+91 99999 99999</a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:info@invincio.in" className="hover:text-primary transition-colors">info@invincio.in</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground font-sans text-xs">
            © 2025 Invincio Services LLP. All rights reserved.
          </p>
          <div className="flex gap-6 font-sans text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
