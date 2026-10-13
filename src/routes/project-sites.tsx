import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/project-sites")({
  head: () => ({
    meta: [
      { title: "Project Sites | Artisan Scents" },
      {
        name: "description",
        content:
          "Artisan Scents project sites — botanical gardens, distillation fields, and installations across our sourcing and manufacturing network.",
      },
    ],
  }),
  component: ProjectSitesPage,
});

const numbers = [
  "(13)",
  "(14)",
  "(16)",
  "(17)",
  "(18)",
  "(19)",
  "(20)",
  "(21)",
  "(22)",
  "(23)",
  "(24)",
  "(25)",
  "(26)",
  "(27)",
  "(28)",
  "(29)",
  "(30)",
  "(31)",
  "(32)",
  "(33)",
  "(34)",
  "(37)",
  "(38)",
];

const gallery = numbers.map((n) => `/assets/project site/artisan scent ${n}.webp`);

function ProjectSitesPage() {
  return (
    <>
      <div className="announcement">
        Project Sites · Gardens, Fields &amp; Installations <span className="ml-3">✦</span>
      </div>
      <Header currentPage="Project Sites" />

      <main className="bg-[#161412] text-[#f4ede4] min-h-screen">
        <section className="relative overflow-hidden border-b border-[#c5a880]/20 py-16 px-6 sm:px-12 bg-gradient-to-b from-[#211e1b] via-[#26221e] to-[#161412]">
          <div className="max-w-7xl mx-auto">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>PROJECT SITES</span>
            </div>
            <h1 className="reveal-on-scroll reveal-delay-100 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#f4ede4]">
              From Garden
              <br />
              <em className="text-[#d4af37] font-serif italic">to Flacon</em>
            </h1>
            <p className="reveal-on-scroll reveal-delay-200 mt-4 text-sm sm:text-base text-white/70 font-light max-w-2xl leading-relaxed">
              A look at the botanical gardens, distillation fields, and installations that form the
              backbone of our sourcing and manufacturing network with KEOMC.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-14">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {gallery.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt={`Artisan Scents project site ${idx + 1}`}
                loading="lazy"
                className={`reveal-on-scroll reveal-delay-${((idx % 3) + 1) * 100} mb-5 w-full rounded-xl border border-[#c5a880]/20 object-cover`}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer tagline="Botanical sourcing, cultivation, and craft." />
    </>
  );
}
