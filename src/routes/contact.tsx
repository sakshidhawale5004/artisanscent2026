import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Artisan Scents" },
      {
        name: "description",
        content:
          "Let's talk scent. Bespoke fragrance commissions, wholesale procurement, and botanical inquiries. Our team in Navi Mumbai is here to guide you.",
      },
    ],
  }),
  component: ContactPage,
});

const EMAIL = "keomc12@gmail.com";
const PHONE = "+91 98202 52868";
const WHATSAPP = "919820252868";
const ADDRESS =
  "Flat No. 602, Plot No. 1, Shiv Shankar Plaza 2, Sector 7, Airoli, Navi Mumbai 400708, India.";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Shiv Shankar Plaza 2, Sector 7, Airoli, Navi Mumbai 400708");

const interests = [
  "Product enquiry",
  "Bespoke fragrance commission",
  "Wholesale procurement",
  "Botanical / raw material",
  "Consultancy",
  "Other",
];

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(interests[0]);
  const [message, setMessage] = useState("");

  const body = useMemo(
    () =>
      `Name: ${name}\nEmail: ${email}\nInterested in: ${interest}\n\n${message}`.trim(),
    [name, email, interest, message],
  );

  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Enquiry — ${interest}`,
  )}&body=${encodeURIComponent(body)}`;
  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Enquiry — ${interest}\n\n${body}`,
  )}`;

  return (
    <>
      <div className="announcement">
        Atelier Commissions · Bespoke & Wholesale <span className="ml-3">✦</span>
      </div>
      <Header currentPage="Contact" />

      <main className="bg-[#fafaf8] text-[#333333] min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#1b5e3f]/15 py-14 sm:py-20 px-4 sm:px-12 bg-[#0d0c0b] text-white">
          {/* Unsplash Background Image - Luxury Fragrance Flacon Atelier */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=2400&q=85"
              alt="Atelier Concierge Background"
              className="w-full h-full object-cover scale-105"
            />
            {/* Deep Contrast Overlay for optimal text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/90 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#86efac] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>ATELIER CONCIERGE &amp; INQUIRIES</span>
            </div>
            <h1 className="reveal-on-scroll reveal-delay-100 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
              Let&rsquo;s Talk
              <br />
              <em className="text-[#86efac] font-serif italic">Scent</em>
            </h1>
            <p className="reveal-on-scroll reveal-delay-200 mt-4 text-sm sm:text-base text-[#e0deda] font-light max-w-2xl leading-relaxed">
              A bespoke fragrance commission, volume wholesale procurement, or a new botanical
              possibility. Our team in Navi Mumbai is here to guide you.
            </p>
            <div className="reveal-on-scroll reveal-delay-300 mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#86efac] tracking-wide font-medium">
              <span>✧ Navi Mumbai Atelier</span>
              <span>✧ Instant WhatsApp Support</span>
              <span>✧ Bespoke Olfactory Consultations</span>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact details */}
            <div className="lg:col-span-5 reveal-on-scroll">
              <div className="eyebrow text-[#1b5e3f] font-semibold mb-2">ARTISAN SCENT · CONCIERGE</div>
              <h2 className="font-display text-3xl text-[#1a1a1a] mb-6">Every connection begins somewhere.</h2>

              <div className="space-y-6 text-sm">
                <a href={`mailto:${EMAIL}`} className="flex items-start gap-4 group">
                  <span className="w-10 h-10 rounded-full bg-[#1b5e3f]/10 border border-[#1b5e3f]/25 flex items-center justify-center text-[#1b5e3f] shrink-0">
                    <Mail size={18} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-widest text-[#777777] font-semibold">
                      Email
                    </span>
                    <span className="text-[#222222] font-medium group-hover:text-[#1b5e3f] transition-colors">
                      {EMAIL}
                    </span>
                  </span>
                </a>

                <a href={`tel:+${WHATSAPP}`} className="flex items-start gap-4 group">
                  <span className="w-10 h-10 rounded-full bg-[#1b5e3f]/10 border border-[#1b5e3f]/25 flex items-center justify-center text-[#1b5e3f] shrink-0">
                    <Phone size={18} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-widest text-[#777777] font-semibold">
                      Call
                    </span>
                    <span className="text-[#222222] font-medium group-hover:text-[#1b5e3f] transition-colors">
                      {PHONE}
                    </span>
                  </span>
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <span className="w-10 h-10 rounded-full bg-[#1b5e3f]/10 border border-[#1b5e3f]/25 flex items-center justify-center text-[#1b5e3f] shrink-0">
                    <MessageCircle size={18} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-widest text-[#777777] font-semibold">
                      WhatsApp
                    </span>
                    <span className="text-[#222222] font-medium group-hover:text-[#1b5e3f] transition-colors">
                      {PHONE}
                    </span>
                  </span>
                </a>

                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-full bg-[#1b5e3f]/10 border border-[#1b5e3f]/25 flex items-center justify-center text-[#1b5e3f] shrink-0">
                    <MapPin size={18} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-widest text-[#777777] font-semibold">
                      Visit us
                    </span>
                    <span className="text-[#333333] leading-relaxed block">{ADDRESS}</span>
                    <a
                      href={MAP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-[#1b5e3f] font-medium text-xs hover:gap-2 transition-all"
                    >
                      Find us on the map <ArrowRight size={13} />
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Enquiry form with high readability */}
            <div className="lg:col-span-7 reveal-on-scroll reveal-delay-150">
              <div className="rounded-2xl border border-[#e8e2d8] bg-white p-5 sm:p-9 shadow-xl">
                <div className="eyebrow text-[#1b5e3f] font-semibold mb-1">ATELIER CONCIERGE &amp; INQUIRIES</div>
                <h2 className="font-display text-2xl text-[#1a1a1a] mb-6">Let&rsquo;s find your signature.</h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#555555] font-semibold mb-2">
                      Your name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full bg-[#fcfbf9] border border-[#dcd6cb] rounded-xl px-4 py-3 text-sm text-[#222222] placeholder:text-[#999999] outline-none focus:border-[#1b5e3f] focus:ring-1 focus:ring-[#1b5e3f] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#555555] font-semibold mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-[#fcfbf9] border border-[#dcd6cb] rounded-xl px-4 py-3 text-sm text-[#222222] placeholder:text-[#999999] outline-none focus:border-[#1b5e3f] focus:ring-1 focus:ring-[#1b5e3f] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#555555] font-semibold mb-2">
                      I&rsquo;m interested in
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full bg-[#fcfbf9] border border-[#dcd6cb] rounded-xl px-4 py-3 text-sm text-[#222222] outline-none focus:border-[#1b5e3f] focus:ring-1 focus:ring-[#1b5e3f] transition-all cursor-pointer"
                    >
                      {interests.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#555555] font-semibold mb-2">
                      Your message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Tell us what you have in mind…"
                      className="w-full bg-[#fcfbf9] border border-[#dcd6cb] rounded-xl px-4 py-3 text-sm text-[#222222] placeholder:text-[#999999] outline-none focus:border-[#1b5e3f] focus:ring-1 focus:ring-[#1b5e3f] transition-all resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={mailtoHref}
                      className="h-12 px-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#1b5e3f] hover:bg-[#164a31] text-white border border-[#1b5e3f]/30 text-sm font-medium tracking-wide shadow-md transition-all w-full sm:w-auto"
                    >
                      Compose email <ArrowRight size={15} className="text-[#86efac]" />
                    </a>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="h-12 px-7 inline-flex items-center justify-center gap-2 rounded-full border border-[#e8e2d8] hover:border-[#1b5e3f]/50 bg-white hover:bg-[#fbfaf8] text-[#222222] text-sm font-medium tracking-wide shadow-sm transition-all w-full sm:w-auto"
                    >
                      <MessageCircle size={15} className="text-[#1b5e3f]" /> Send via WhatsApp
                    </a>
                  </div>

                  <p className="text-[11px] text-[#777777] leading-relaxed pt-1">
                    Your enquiry opens in your email app. We do not collect or store this form on the
                    website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer tagline="Every connection begins somewhere." />
    </>
  );
}





