import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/exhibitions")({
  head: () => ({
    meta: [
      { title: "Exhibitions | Artisan Scents" },
      {
        name: "description",
        content:
          "Artisan Scents exhibitions — where our scent worlds, botanical craft, and artisanal incense meet the public.",
      },
    ],
  }),
  component: ExhibitionsPage,
});

const gallery = [
  "(1)",
  "(2)",
  "(3)",
  "(5)",
  "(6)",
  "(7)",
  "(8)",
  "(9)",
  "(10)",
  "(11)",
  "(12)",
].map((n) => `/assets/exibition/artisan scent ${n}.webp`);

function ExhibitionsPage() {
  return (
    <>
      <div className="announcement">
        Exhibitions · Scent Meets the Public <span className="ml-3">✦</span>
      </div>
      <Header currentPage="Exhibitions" />

      <main className="bg-[#f5f5f0] text-[#333333] min-h-screen">
        <section className="relative overflow-hidden border-b border-[#1b5e3f]/12 py-16 px-6 sm:px-12 bg-gradient-to-b from-[#e0ddd8] via-[#d5d1ca] to-[#f5f5f0]">
          <div className="max-w-7xl mx-auto">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>EXHIBITIONS</span>
            </div>
            <h1 className="reveal-on-scroll reveal-delay-100 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#333333]">
              Where Scent
              <br />
              <em className="text-[#1b5e3f] font-serif italic">Meets the Public</em>
            </h1>
            <p className="reveal-on-scroll reveal-delay-200 mt-4 text-sm sm:text-base text-[#666666] font-light max-w-2xl leading-relaxed">
              Snapshots from craft fairs, trade showcases, and botanical exhibitions where we share
              our perfumes, oils, incense, and the stories behind them.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-14">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {gallery.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt={`Artisan Scents exhibition ${idx + 1}`}
                loading="lazy"
                className={`reveal-on-scroll reveal-delay-${((idx % 3) + 1) * 100} mb-5 w-full rounded-xl border border-[#1b5e3f]/12 object-cover`}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer tagline="Scent, craft, and community in the open air." />
    </>
  );
}





