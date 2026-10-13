import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/keomc")({
  head: () => ({
    meta: [
      { title: "KEOMC - Kulswami Essence Oil Manufacturing | Artisan Scents" },
      {
        name: "description",
        content:
          "KEOMC - Kulswami Essence Oil Manufacturing Company. Processing aromatic and medicinal plants with expertise in essential oils, perfumes, soaps, and agarbatti manufacturing.",
      },
    ],
  }),
  component: KEOMCPage,
});

function KEOMCPage() {
  return (
    <>
      <div className="announcement">
        Botanical Excellence · Artisanal Expertise · KEOMC Legacy <span className="ml-3">✦</span>
      </div>
      <Header currentPage="KEOMC" />

      <main className="bg-[#fafaf8] text-[#333333] min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-[#1b5e3f]/15 py-20 px-6 sm:px-12 bg-[#0d0c0b] text-white">
          {/* Unsplash Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2400&q=85"
              alt="KEOMC Botanical Harvest Background"
              className="w-full h-full object-cover scale-105"
            />
            {/* Deep Contrast Overlay for optimal text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/90 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#86efac] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>HERITAGE PARTNER</span>
            </div>
            <h1 className="reveal-on-scroll reveal-delay-100 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
              KEOMC
              <br />
              <em className="text-[#86efac] font-serif italic">Botanical Excellence</em>
            </h1>
            <p className="reveal-on-scroll reveal-delay-200 mt-4 text-sm sm:text-base text-[#e0deda] font-light max-w-xl leading-relaxed">
              Kulswami Essence Oil Manufacturing Company — Processing aromatic and medicinal plants
              with expertise in essential oil extraction and botanical stewardship.
            </p>
          </div>
        </section>

        {/* About KEOMC */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
          <div className="reveal-on-scroll max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>ABOUT KEOMC</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-[#333333] mb-6">
              Kulswami Essence Oil
              <br />
              Manufacturing Company
            </h2>
            <p className="text-base leading-relaxed text-[#666666] mb-6 font-light">
              Kulswami Essence Oil Manufacturing Company (KEOMC) is a dedicated processor of aromatic
              and medicinal plants, specializing in the recovery of essence oils and botanical
              expertise. We work with premium botanical sources including Geranium, Citronella,
              Lemongrass, Vetiver, Patchouli, and many other rare plants.
            </p>
            <p className="text-base leading-relaxed text-[#666666] mb-8 font-light">
              Essential oils are extracted using the traditional and scientific steam distillation
              method, ensuring the highest quality and purity in every batch. Our commitment to
              botanical excellence and traditional methods ensures that every product meets the
              highest standards of quality and authenticity.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-[#f5f5f0] py-16 border-y border-[#1b5e3f]/12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-3">
                <span className="w-5 h-[1px] bg-[#d4af37]" />
                <span>KEY SERVICES</span>
                <span className="w-5 h-[1px] bg-[#d4af37]" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#333333]">
                KEOMC Expertise
              </h2>
              <p className="text-[#666666] text-sm mt-3 font-light leading-relaxed">
                Comprehensive services in design, manufacturing, skill development, and botanical
                consultancy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Service 1 */}
              <div className="reveal-on-scroll reveal-delay-100 rounded-2xl border border-[#1b5e3f]/15 bg-white p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/60 hover:shadow-lg">
                <h3 className="font-display text-lg text-[#333333] mb-3">Manufacturing</h3>
                <ul className="text-sm text-[#666666] font-light space-y-2 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1b5e3f] mt-1">✦</span>
                    <span>Soap Manufacturing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1b5e3f] mt-1">✦</span>
                    <span>Perfume Manufacturing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1b5e3f] mt-1">✦</span>
                    <span>Car Perfume & Agarbatti Production</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1b5e3f] mt-1">✦</span>
                    <span>Essential Oil Production & Sale</span>
                  </li>
                </ul>
              </div>

              {/* Service 2 */}
              <div className="reveal-on-scroll reveal-delay-200 rounded-2xl border border-[#1b5e3f]/15 bg-white p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/60 hover:shadow-lg">
                <h3 className="font-display text-lg text-[#333333] mb-3">Agro & Consultancy</h3>
                <ul className="text-sm text-[#666666] font-light space-y-2 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1b5e3f] mt-1">✦</span>
                    <span>Agro Technology Services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1b5e3f] mt-1">✦</span>
                    <span>Technical Know-how for Cultivation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1b5e3f] mt-1">✦</span>
                    <span>On-site Farmer Consultancy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1b5e3f] mt-1">✦</span>
                    <span>Feasibility Report Preparation</span>
                  </li>
                </ul>
              </div>

              {/* Service 3 */}
              <div className="reveal-on-scroll reveal-delay-300 rounded-2xl border border-[#1b5e3f]/15 bg-white p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/60 hover:shadow-lg">
                <h3 className="font-display text-lg text-[#333333] mb-3">Supply & Services</h3>
                <ul className="text-sm text-[#666666] font-light space-y-2 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1b5e3f] mt-1">✦</span>
                    <span>Seeds & Planting Material Supply</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1b5e3f] mt-1">✦</span>
                    <span>Field Distillation Unit (FDU) Services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1b5e3f] mt-1">✦</span>
                    <span>Training Programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1b5e3f] mt-1">✦</span>
                    <span>Herbal & Aromatic Garden Setup</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Botanical Expertise */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
          <div className="reveal-on-scroll">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>PLANT EXPERTISE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#333333] mb-8">
              Aromatic &amp; Medicinal Plants
            </h2>
            <p className="text-base leading-relaxed text-[#666666] mb-8 font-light max-w-3xl">
              KEOMC specializes in processing a diverse portfolio of premium aromatic and medicinal
              plants through traditional steam distillation methods. Each plant is carefully selected
              and processed to recover the finest essence oils suitable for fragrance, therapeutic,
              and industrial applications.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Geranium",
                "Citronella",
                "Lemongrass",
                "Vetiver",
                "Patchouli",
                "Lavender",
                "Rosemary",
                "Palmarosa",
              ].map((plant) => (
                <div
                  key={plant}
                  className="reveal-on-scroll rounded-xl border border-[#1b5e3f]/15 bg-white p-4 text-center hover:border-[#1b5e3f]/40 transition-all duration-300"
                >
                  <p className="font-light text-[#333333]">{plant}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connection Section */}
        <section className="bg-gradient-to-b from-[#fafaf8] to-[#f5f5f0] py-16 border-t border-[#1b5e3f]/12">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center reveal-on-scroll">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>PARTNERSHIP</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#333333] mb-4">
              KEOMC & Artisan Scents
            </h2>
            <p className="text-base leading-relaxed text-[#666666] mb-8 font-light">
              Artisan Scents operates as a trusted partner and customer of KEOMC, sourcing premium
              essence oils and botanical expertise to create distinctive fragrances. This partnership
              ensures that every Artisan Scents product is crafted with botanical excellence and
              artisanal dedication.
            </p>
            <a href="/about">
              <Button className="h-12 px-8 bg-[#1b5e3f] hover:bg-[#164a31] text-white border border-[#1b5e3f]/30 rounded-full font-medium tracking-wide shadow-lg transition-all">
                Learn More About Artisan Scents <ArrowRight size={16} className="ml-2" />
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer tagline="KEOMC - Botanical Excellence & Artisanal Expertise" />
    </>
  );
}
