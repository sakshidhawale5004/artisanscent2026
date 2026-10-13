import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type FooterLink = [label: string, href: string];

const shopLinks: FooterLink[] = [
  ["Perfumes", "/perfumes"],
  ["Essence Oils", "/essence-oils"],
  ["Car Perfumes", "/car-perfumes"],
  ["Agarbatti", "/agarbatti"],
  ["Soaps", "/soaps"],
];

const exploreLinks: FooterLink[] = [
  ["Journal", "/journal"],
  ["Exhibitions", "/exhibitions"],
  ["Project Sites", "/project-sites"],
];

const companyLinks: FooterLink[] = [
  ["About", "/about"],
  ["Contact", "/contact"],
];

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <div className="font-semibold mb-2 uppercase tracking-wide">{title}</div>
      <div className="space-y-1 text-muted-foreground">
        {links.map(([label, href]) => (
          <div key={href}>
            <a href={href} className="hover:text-gold transition-colors">
              {label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

type FooterProps = {
  tagline?: string;
  newsletter?: boolean;
  marginTop?: number;
};

export function Footer({
  tagline = "Premium fragrances. Botanical expertise. Artisanal excellence.",
  newsletter = false,
  marginTop = 70,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="footer" style={{ marginTop }}>
      <div className="footer-top reveal-on-scroll">
        <div>
          <a href="/" className="wordmark">
            ARTISAN<span className="text-gold">SCENTS</span>
          </a>
          <p className="text-[11px] text-muted-foreground mt-2 max-w-xs">{tagline}</p>
        </div>

        <div className="flex gap-10 flex-wrap text-[11px]">
          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Company" links={companyLinks} />
        </div>

        {newsletter && (
          <div className="max-w-sm w-full">
            <div className="font-display text-2xl mb-3">A note from Artisan Scents</div>
            <form
              className="flex border-b border-foreground"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Your email address"
                placeholder="Your email address"
                className="bg-transparent outline-none text-[11px] flex-1 min-w-0"
              />
              <Button variant="ghost" size="icon" aria-label="Subscribe">
                {subscribed ? <Check /> : <ArrowRight />}
              </Button>
            </form>
            {subscribed && (
              <p className="status-note mt-2">
                Thank you. Newsletter delivery is not connected yet.
              </p>
            )}
          </div>
        )}
      </div>
      <div className="footer-bottom">
        <span>© 2026 Artisan Scents. All rights reserved.</span>
        <span>FRAGRANCE IS PERSONAL. MAKE IT YOURS.</span>
        <span>
          <a href="/about">About</a> · <a href="/contact">Contact</a> · <a href="#">Privacy</a>
        </span>
      </div>
    </footer>
  );
}

