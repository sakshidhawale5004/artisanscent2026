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

      <main className="bg-[#f5f5f0] text-[#333333] min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#1b5e3f]/12 py-20 px-6 sm:px-12 bg-[#f5f5f0]">
          {/* Unsplash Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=85"
              alt="Contact Us Background"
              className="w-full h-full object-cover scale-105"
            />
            {/* Dark Overlay for text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f0]/95 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>ATELIER COMMISSIONS</span>
            </div>
            <h1 className="reveal-on-scroll reveal-delay-100 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#333333]">
              Let&rsquo;s Talk
              <br />
              <em className="text-[#1b5e3f] font-serif italic">Scent</em>
            </h1>
            <p className="reveal-on-scroll reveal-delay-200 mt-4 text-sm sm:text-base text-[#666666] font-light max-w-2xl leading-relaxed">
              A bespoke fragrance commission, volume wholesale procurement, or a new botanical
              possibility. Our team in Navi Mumbai is here to guide you.
            </p>
            <div className="reveal-on-scroll reveal-delay-300 mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#1b5e3f] tracking-wide">
              <span>✧ Navi Mumbai Atelier</span>
              <span>✧ Instant WhatsApp Support</span>
              <span>✧ Bespoke Olfactory Consultations</span>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact details */}
            <div className="lg:col-span-5 reveal-on-scroll">
              <div className="eyebrow text-[#1b5e3f] mb-2">ARTISAN SCENT · KEOMC</div>
              <h2 className="font-display text-3xl text-[#333333] mb-6">Every connection begins somewhere.</h2>

              <div className="space-y-6 text-sm">
                <a href={`mailto:${EMAIL}`} className="flex items-start gap-4 group">
                  <span className="w-10 h-10 rounded-full bg-white/5 border border-[#2d8659]/30 flex items-center justify-center text-[#1b5e3f] shrink-0">
                    <Mail size={18} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-widest text-white/50">
                      Email
                    </span>
                    <span className="text-[#333333] group-hover:text-[#1b5e3f] transition-colors">
                      {EMAIL}
                    </span>
                  </span>
                </a>

                <a href={`tel:+${WHATSAPP}`} className="flex items-start gap-4 group">
                  <span className="w-10 h-10 rounded-full bg-white/5 border border-[#2d8659]/30 flex items-center justify-center text-[#1b5e3f] shrink-0">
                    <Phone size={18} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-widest text-white/50">
                      Call
                    </span>
                    <span className="text-[#333333] group-hover:text-[#1b5e3f] transition-colors">
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
                  <span className="w-10 h-10 rounded-full bg-white/5 border border-[#2d8659]/30 flex items-center justify-center text-[#1b5e3f] shrink-0">
                    <MessageCircle size={18} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-widest text-white/50">
                      WhatsApp
                    </span>
                    <span className="text-[#333333] group-hover:text-[#1b5e3f] transition-colors">
                      {PHONE}
                    </span>
                  </span>
                </a>

                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-full bg-white/5 border border-[#2d8659]/30 flex items-center justify-center text-[#1b5e3f] shrink-0">
                    <MapPin size={18} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-widest text-white/50">
                      Visit us
                    </span>
                    <span className="text-[#333333] leading-relaxed">{ADDRESS}</span>
                    <a
                      href={MAP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-[#1b5e3f] text-xs hover:gap-2 transition-all"
                    >
                      Find us on the map <ArrowRight size={13} />
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Enquiry form */}
            <div className="lg:col-span-7 reveal-on-scroll reveal-delay-150">
              <div className="rounded-2xl border border-[#1b5e3f]/15 bg-white/5 p-7 sm:p-9">
                <div className="eyebrow text-[#1b5e3f] mb-1">ATELIER CONCIERGE &amp; INQUIRIES</div>
                <h2 className="font-display text-2xl text-[#333333] mb-6">Let&rsquo;s find your signature.</h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5">
                      Your name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-2.5 text-sm text-[#333333] placeholder:text-white/30 outline-none focus:border-[#1b5e3f]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-2.5 text-sm text-[#333333] placeholder:text-white/30 outline-none focus:border-[#1b5e3f]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5">
                      I&rsquo;m interested in
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full bg-[#e6e3de] border border-white/15 rounded-lg px-4 py-2.5 text-sm text-[#333333] outline-none focus:border-[#1b5e3f]/50 transition-colors"
                    >
                      {interests.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1.5">
                      Your message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Tell us what you have in mind…"
                      className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-2.5 text-sm text-[#333333] placeholder:text-white/30 outline-none focus:border-[#1b5e3f]/50 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href={mailtoHref}
                      className="h-12 px-7 inline-flex items-center gap-2 rounded-full bg-[#1b5e3f] hover:bg-[#164a31] text-white border border-[#1b5e3f]/30 text-sm font-medium tracking-wide transition-all"
                    >
                      Compose email <ArrowRight size={15} className="text-[#1b5e3f]" />
                    </a>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="h-12 px-7 inline-flex items-center gap-2 rounded-full border border-white/20 hover:border-[#1b5e3f]/50 bg-white/5 hover:bg-white/10 text-[#333333] text-sm font-medium tracking-wide transition-all"
                    >
                      <MessageCircle size={15} className="text-[#1b5e3f]" /> Send via WhatsApp
                    </a>
                  </div>

                  <p className="text-[11px] text-white/40 leading-relaxed pt-1">
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





