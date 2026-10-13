import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "The Journal | Artisan Scents" },
      {
        name: "description",
        content:
          "Notes on scent, craft, and ritual from Artisan Scents — botanical sourcing, distillation, layering, and the art of wearing fragrance.",
      },
    ],
  }),
  component: JournalPage,
});

type Entry = {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
};

const featured: Entry = {
  title: "The Anatomy of a Signature Scent",
  category: "Perfumery",
  date: "March 2026",
  excerpt:
    "Top, heart, and base — how a fragrance unfolds across the hours, and why the dry-down matters more than the first impression. We break down the architecture behind every Artisan Scents composition.",
  image: "/assets/perfumes/Luxury Perfume Collection in Gold and Glass.png",
};

const entries: Entry[] = [
  {
    title: "Steam, Copper & Patience: How Essence Oils Are Born",
    category: "Craft",
    date: "February 2026",
    excerpt:
      "Inside KEOMC's botanical labs, low-temperature copper stills safeguard fragile aromatic molecules through traditional steam distillation.",
    image: "/assets/essence oil/Vetiver Oil Amber Bottle Mockup.png",
  },
  {
    title: "The Art of Layering Fragrance",
    category: "Ritual",
    date: "February 2026",
    excerpt:
      "Anchor with vetiver or patchouli, then veil a floral mist over fabric. A guide to building sillage that is entirely your own.",
    image: "/assets/perfumes/Ruby Perfume Bottle with Gold Cap.png",
  },
  {
    title: "A Field Guide to Sacred Incense",
    category: "Tradition",
    date: "January 2026",
    excerpt:
      "From bamboo-core agarbatti to charcoal-free dhoop, the Vedic roots of everyday aromatic rituals and how to choose for a space.",
    image: "/assets/agarbatti/Pyramid of Premium Dhoop Sticks.png",
  },
  {
    title: "Fragrance for the Driver's Seat",
    category: "Lifestyle",
    date: "January 2026",
    excerpt:
      "Why inverted wooden car diffusers outperform aerosols, and how to keep a cabin scented without overwhelm on long journeys.",
    image: "/assets/car perfume/Hanging Wooden Amber Diffuser.png",
  },
  {
    title: "Sourcing Botanicals, Sustainably",
    category: "Sourcing",
    date: "December 2025",
    excerpt:
      "Geranium, citronella, palmarosa — meeting the growers and distillation partners who make our raw materials possible.",
    image: "/assets/essence oil/Premium Lavender Essential Oil Bottle.png",
  },
  {
    title: "A Botanical Soap Ritual",
    category: "Personal Care",
    date: "December 2025",
    excerpt:
      "Cold-process bars, plant butters, and pure oils — turning an everyday cleanse into a considered moment of self-care.",
    image: "/assets/soaps/Varad Aromatics Soap Ring.png",
  },
];

function EntryCard({ entry, delay }: { entry: Entry; delay: string }) {
  return (
    <article
      className={`reveal-on-scroll ${delay} group rounded-2xl overflow-hidden border border-[#c5a880]/25 bg-gradient-to-b from-[#211e1b] to-[#12100f] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a880]/70`}
    >
      <div className="relative aspect-[4/3] w-full p-6 flex items-center justify-center bg-[#171513] border-b border-white/5">
        <img
          src={entry.image}
          alt={entry.title}
          loading="lazy"
          className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest text-[#d4af37] bg-black/60 px-2.5 py-0.5 rounded-full border border-[#d4af37]/30 backdrop-blur-sm">
          {entry.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[10px] uppercase tracking-wider text-white/40">{entry.date}</div>
        <h3 className="font-display text-lg text-[#f4ede4] group-hover:text-[#d4af37] transition-colors mt-1.5">
          {entry.title}
        </h3>
        <p className="text-xs text-white/60 font-light leading-relaxed mt-2 flex-1">
          {entry.excerpt}
        </p>
        <span className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-[#d4af37] font-medium">
          Read the note <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

function JournalPage() {
  return (
    <>
      <div className="announcement">
        The Journal · Notes on Scent, Craft &amp; Ritual <span className="ml-3">✦</span>
      </div>
      <Header currentPage="Journal" />

      <main className="bg-[#161412] text-[#f4ede4] min-h-screen">
        <section className="relative overflow-hidden border-b border-[#c5a880]/20 py-16 px-6 sm:px-12 bg-gradient-to-b from-[#211e1b] via-[#26221e] to-[#161412]">
          <div className="max-w-7xl mx-auto">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>THE JOURNAL</span>
            </div>
            <h1 className="reveal-on-scroll reveal-delay-100 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#f4ede4]">
              Notes on Scent,
              <br />
              <em className="text-[#d4af37] font-serif italic">Craft &amp; Ritual</em>
            </h1>
            <p className="reveal-on-scroll reveal-delay-200 mt-4 text-sm sm:text-base text-white/70 font-light max-w-2xl leading-relaxed">
              Field notes from the atelier — botanical sourcing, distillation, layering rituals, and
              the quiet discipline of wearing fragrance well.
            </p>
          </div>
        </section>

        {/* Featured */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-14">
          <article className="reveal-on-scroll reveal-slow grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border border-[#c5a880]/30 bg-gradient-to-r from-[#12100f] via-[#1e1b18] to-[#12100f]">
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center">
              <div className="eyebrow text-[#d4af37] mb-2">
                {featured.category} · Featured
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#f4ede4] leading-tight">
                {featured.title}
              </h2>
              <p className="text-white/70 text-sm font-light mt-4 leading-relaxed max-w-md">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3 text-xs text-white/50">
                <span className="uppercase tracking-widest">{featured.date}</span>
                <span className="h-[1px] w-8 bg-[#c5a880]/40" />
                <span className="text-[#d4af37] flex items-center gap-1">
                  Read the note <ArrowRight size={13} />
                </span>
              </div>
            </div>
            <div className="lg:col-span-7 h-64 lg:h-full relative overflow-hidden bg-[#171513]">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-contain p-10"
                loading="lazy"
              />
            </div>
          </article>
        </section>

        {/* Entries */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-14">
          <div className="reveal-on-scroll mb-8">
            <div className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium mb-1">
              LATEST ENTRIES
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#f4ede4]">From the Atelier</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {entries.map((e, idx) => (
              <EntryCard
                key={e.title}
                entry={e}
                delay={`reveal-delay-${((idx % 3) + 1) * 100}`}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer tagline="Notes on scent, craft, and ritual." />
    </>
  );
}
