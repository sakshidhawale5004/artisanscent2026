import { useState } from "react";
import { ArrowRight, Check, ShieldCheck, Sparkles, Truck, Lock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

type FooterLink = [label: string, href: string];

const shopLinks: FooterLink[] = [
  ["Luxury Perfumes", "/perfumes"],
  ["Pure Essence Oils", "/essence-oils"],
  ["Car Diffusers", "/car-perfumes"],
  ["Sacred Agarbatti", "/agarbatti"],
  ["Handcrafted Soaps", "/soaps"],
];

const maisonLinks: FooterLink[] = [
  ["Our Story & About", "/about"],
  ["KEOMC Botanical Labs", "/keomc"],
  ["Exhibitions", "/exhibitions"],
  ["Project Sites", "/project-sites"],
  ["Contact Concierge", "/contact"],
];

const policyLinks: FooterLink[] = [
  ["Privacy Policy", "/privacy-policy"],
  ["Return & Refund Policy", "/return-policy"],
  ["Terms & Conditions", "/terms-and-conditions"],
  ["Shipping & Logistics", "/return-policy#shipping"],
  ["FAQs & Assistance", "/#faq"],
];

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <div className="font-display text-base tracking-wider uppercase text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-[1px] bg-[#d4af37]" />
        <span>{title}</span>
      </div>
      <ul className="space-y-2.5 text-xs text-[#a8b8ae] font-light">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="hover:text-[#86efac] hover:translate-x-0.5 transition-all inline-block duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

type FooterProps = {
  tagline?: string;
  newsletter?: boolean;
  marginTop?: number;
};

export function Footer({
  tagline = "Luxury fragrances. Botanical expertise. Artisanal excellence.",
  newsletter = true,
  marginTop = 0,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer
      className="bg-[#05170e] text-[#ded9d2] border-t border-[#1b5e3f]/40 relative overflow-hidden"
      style={{ marginTop: marginTop ? `${marginTop}px` : undefined }}
    >
      {/* Subtle ambient lighting in background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#1b5e3f]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-[#d4af37]/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Value Assurance Ribbon */}
      <div className="border-b border-white/10 bg-[#071d12]/70 backdrop-blur-sm py-5 sm:py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/50 flex items-center justify-center text-[#86efac] shrink-0">
              <ShieldCheck size={16} />
            </div>
            <div>
              <div className="font-semibold text-white tracking-wide">100% Authentic Botanicals</div>
              <div className="text-[11px] text-[#9fb3a6]">Pure unadulterated rare extracts</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/50 flex items-center justify-center text-[#86efac] shrink-0">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="font-semibold text-white tracking-wide">Extrait Concentration</div>
              <div className="text-[11px] text-[#9fb3a6]">Long-lasting 8–12h sillage</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/50 flex items-center justify-center text-[#86efac] shrink-0">
              <Truck size={16} />
            </div>
            <div>
              <div className="font-semibold text-white tracking-wide">Pan-India Delivery</div>
              <div className="text-[11px] text-[#9fb3a6]">Free shipping on orders ₹999+</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/50 flex items-center justify-center text-[#86efac] shrink-0">
              <Lock size={16} />
            </div>
            <div>
              <div className="font-semibold text-white tracking-wide">Secure Checkout</div>
              <div className="text-[11px] text-[#9fb3a6]">256-Bit encrypted transactions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Column 1: Brand & Identity (4 Cols) */}
          <div className="sm:col-span-2 lg:col-span-4">
            <a href="/" className="inline-flex items-center gap-3 mb-4 group">
              <img
                src="/assets/logo.jpeg"
                alt="Artisan Scent Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#d4af37]/60 shadow-md group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="font-display tracking-widest text-2xl text-white block leading-none">
                  ARTISAN <span className="text-[#d4af37]">SCENT</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#86efac] font-medium block mt-1">
                  Haute Parfumerie &amp; Botanicals
                </span>
              </div>
            </a>

            <p className="text-xs text-[#a8b8ae] leading-relaxed mb-5 font-light max-w-sm">
              Rooted in centuries-old Indian perfume traditions and modern steam distillation with KEOMC Botanical Labs. Formulating luxury perfumes, therapeutic essence oils, hanging car diffusers, and sacred incense.
            </p>

            <div className="space-y-3 text-xs text-[#cad6cf]">
              <div className="flex items-start gap-2.5 text-[11px]">
                <MapPin size={15} className="text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block text-[10px] uppercase tracking-wider mb-0.5">
                    Visit us
                  </span>
                  <span className="text-[#a8b8ae] leading-relaxed block">
                    Flat No. 602, Plot No. 1, Shiv Shankar Plaza 2, Sector 7, Airoli, Navi Mumbai 400708, India.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <Mail size={13} className="text-[#d4af37] shrink-0" />
                <a href="mailto:care@artisanscent.com" className="hover:text-[#86efac] transition-colors">
                  care@artisanscent.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Shop (2 Cols) */}
          <div className="lg:col-span-2 sm:col-span-1">
            <FooterColumn title="Shop" links={shopLinks} />
          </div>

          {/* Column 3: The Maison (2 Cols) */}
          <div className="lg:col-span-2 sm:col-span-1">
            <FooterColumn title="Maison" links={maisonLinks} />
          </div>

          {/* Column 4: Customer Policies (2 Cols) */}
          <div className="lg:col-span-2 sm:col-span-1">
            <FooterColumn title="Policies" links={policyLinks} />
          </div>

          {/* Column 5: Newsletter Dispatch (2 Cols) */}
          <div className="lg:col-span-2">
            <div className="font-display text-base tracking-wider uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-[1px] bg-[#d4af37]" />
              <span>The Dispatch</span>
            </div>
            <p className="text-xs text-[#a8b8ae] font-light leading-relaxed mb-4">
              Join our private reserve for notifications on rare botanical extractions and private formulations.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
              className="space-y-2"
            >
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your email address"
                  className="w-full bg-[#0a2316] border border-[#2d8659]/50 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-[#6f8577] focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="w-full bg-[#1b5e3f] hover:bg-[#237750] text-white border border-[#2d8659] text-xs h-9 font-medium"
              >
                {subscribed ? (
                  <span className="flex items-center gap-1.5 text-[#86efac]">
                    <Check size={14} /> Subscribed
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    Subscribe <ArrowRight size={13} className="text-[#86efac]" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Links & Copyright */}
      <div className="border-t border-white/10 bg-[#04110a] py-6 px-4 sm:px-8 text-xs text-[#7e9185]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left text-[11px]">
            © {new Date().getFullYear()} Artisan Scent. All rights reserved. Handcrafted with Botanical Dedication.
          </div>

          <div className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] text-center font-mono">
            ✦ FRAGRANCE IS PERSONAL. MAKE IT YOURS. ✦
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] text-[#9eb3a6]">
            <a href="/privacy-policy" className="hover:text-[#86efac] transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="/return-policy" className="hover:text-[#86efac] transition-colors">
              Return Policy
            </a>
            <span>·</span>
            <a href="/terms-and-conditions" className="hover:text-[#86efac] transition-colors">
              Terms &amp; Conditions
            </a>
            <span>·</span>
            <a href="/contact" className="hover:text-[#86efac] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
