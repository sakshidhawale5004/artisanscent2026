import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Layers, PackageCheck, Truck, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Corporate & Marketing Presentation | Artisan Scents" },
      {
        name: "description",
        content:
          "Artisan Scents corporate and marketing presentation by Vaishali Chavan. Discover our diverse fragrance portfolio spanning luxury perfumes, essence oils, handcrafted soaps, agarbatti, and car diffusers.",
      },
    ],
  }),
  component: AboutPage,
});

export default function AboutPage() {
  return (
    <>
      <div className="announcement">
        S C E N T S · A R T I S A N <span className="ml-3">✦</span> Corporate &amp; Marketing Presentation
      </div>
      <Header currentPage="About" />

      <main className="bg-[#fafaf8] text-[#333333] min-h-screen">
        {/* Hero Section with High-Contrast Typography and Topic-Matched Unsplash Image */}
        <section className="relative overflow-hidden border-b border-[#1b5e3f]/15 py-24 px-6 sm:px-12 bg-[#0d0c0b] text-white">
          {/* Unsplash Background Image - Editorial Luxury Fragrance Flacon */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=2400&q=85"
              alt="Artisan Scents Corporate Presentation"
              className="w-full h-full object-cover scale-105"
            />
            {/* Deep Contrast Overlay for guaranteed text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/90 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#86efac] font-medium mb-4">
              <span className="w-6 h-[1px] bg-[#d4af37]" />
              <span>S C E N T S &nbsp;✦&nbsp; A R T I S A N</span>
            </div>

            <h1 className="reveal-on-scroll reveal-delay-100 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08]">
              Corporate &amp;
              <br />
              <em className="text-[#86efac] font-serif italic">Marketing Presentation</em>
            </h1>

            <div className="reveal-on-scroll reveal-delay-200 mt-6 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-[#d4af37] tracking-widest font-semibold uppercase">
                Presenter: VAISHALI CHAVAN
              </div>
              <div className="text-xs text-[#86efac] font-medium tracking-wide">
                ✦ Artisan Scents Official Brand Deck
              </div>
            </div>

            <p className="reveal-on-scroll reveal-delay-300 mt-5 text-sm sm:text-base text-[#e0deda] font-light max-w-2xl leading-relaxed">
              Operating across a diverse portfolio of fragrance products and related solutions in the
              fragrance and flavours sector. Building meaningful connections through the world of scent.
            </p>
          </div>
        </section>

        {/* About Company Section */}
        <section className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <div className="reveal-on-scroll">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-semibold mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>ABOUT COMPANY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1a1a1a] mb-8">
              Artisan Scents
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 space-y-6 text-base sm:text-lg leading-relaxed text-[#444444] font-light">
                <p className="bg-white p-7 sm:p-9 rounded-2xl border border-[#e8e2d8] shadow-sm leading-relaxed text-[#2a2a2a]">
                  <strong className="text-[#1b5e3f] font-semibold block text-xl mb-3 font-display">
                    A Multi-Category Fragrance Brand
                  </strong>
                  Artisan Scents is a fragrance brand operating across a diverse portfolio of fragrance
                  products and related solutions. With a focus on the fragrance and flavours sector, the
                  brand brings together products such as essential oils, essence oils, perfumes, car
                  perfumes, soaps, and agarbatti.
                </p>

                <p className="bg-white p-7 sm:p-9 rounded-2xl border border-[#e8e2d8] shadow-sm leading-relaxed text-[#2a2a2a]">
                  <strong className="text-[#1b5e3f] font-semibold block text-xl mb-3 font-display">
                    Our Strategic Approach
                  </strong>
                  Our approach centres on understanding fragrance preferences, exploring product
                  possibilities, and delivering solutions aligned with evolving customer and business
                  requirements. From everyday fragrance experiences to specialised fragrance and
                  flavour applications, Artisan Scents aims to build meaningful connections through
                  the world of scent.
                </p>
              </div>

              <div className="lg:col-span-4 bg-[#fcfbf9] rounded-2xl border border-[#e8e2d8] p-7 shadow-sm space-y-6">
                <div className="text-xs uppercase tracking-widest text-[#1b5e3f] font-bold">
                  Presentation Overview
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#1b5e3f]/10 text-[#1b5e3f] flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-[#1a1a1a]">Diverse Portfolio</div>
                      <div className="text-xs text-[#666666] mt-0.5">
                        Essential oils, essence oils, luxury perfumes, soaps, car diffusers &amp; agarbatti.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#1b5e3f]/10 text-[#1b5e3f] flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-[#1a1a1a]">Tailored Solutions</div>
                      <div className="text-xs text-[#666666] mt-0.5">
                        Aligned with evolving individual and commercial scent preferences.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#1b5e3f]/10 text-[#1b5e3f] flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-[#1a1a1a]">Presentation Lead</div>
                      <div className="text-xs text-[#666666] mt-0.5">Vaishali Chavan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section: 5 Detailed Product Categories */}
        <section className="bg-white py-20 border-y border-[#e8e2d8]">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-semibold mb-3">
                <span className="w-5 h-[1px] bg-[#d4af37]" />
                <span>PRODUCT PORTFOLIO</span>
                <span className="w-5 h-[1px] bg-[#d4af37]" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1a1a1a]">
                Five Core Categories
              </h2>
              <p className="text-[#666666] text-sm mt-3 font-light leading-relaxed">
                From everyday wellness rituals to opulent extrait perfumes, explore our five core
                product divisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {/* 01. ESSENCE OILS */}
              <div className="reveal-on-scroll group rounded-2xl border border-[#e8e2d8] bg-[#fcfbf9] p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-semibold text-[#1b5e3f]">01.</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#1b5e3f] bg-white border border-[#e8e2d8] px-3 py-1 rounded-full font-semibold">
                      Aromatics
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-[#1a1a1a] mb-3 group-hover:text-[#1b5e3f] transition-colors">
                    ESSENCE OILS
                  </h3>
                  <p className="text-sm text-[#555555] font-light leading-relaxed mb-5">
                    Artisan Scents offers essence oils designed for fragrance applications across a
                    variety of suitable products and environments. With a focus on fragrance
                    character and versatility, these oils serve as an option for businesses and
                    customers seeking distinctive aromatic profiles for their specific requirements.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#e8e2d8] space-y-1.5">
                  <div className="text-xs font-semibold text-[#1b5e3f] uppercase tracking-wider">
                    Diverse fragrance profiles
                  </div>
                  <div className="text-xs text-[#666666]">
                    Floral, woody, fresh and oriental-inspired notes
                  </div>
                </div>
              </div>

              {/* 02. HANDCRAFTED SOAPS */}
              <div className="reveal-on-scroll reveal-delay-100 group rounded-2xl border border-[#e8e2d8] bg-[#fcfbf9] p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-semibold text-[#1b5e3f]">02.</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#1b5e3f] bg-white border border-[#e8e2d8] px-3 py-1 rounded-full font-semibold">
                      Personal Care
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-[#1a1a1a] mb-3 group-hover:text-[#1b5e3f] transition-colors">
                    HANDCRAFTED SOAPS
                  </h3>
                  <p className="text-sm text-[#555555] font-light leading-relaxed mb-5">
                    Discover soaps that combine everyday cleansing with an appealing fragrance
                    experience. Designed to complement daily personal-care routines, our soap
                    category brings together fragrance, presentation, and everyday usability.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#e8e2d8] flex items-center gap-2 flex-wrap">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#e8e2d8] text-[#1b5e3f] font-medium">
                    Refreshing
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#e8e2d8] text-[#1b5e3f] font-medium">
                    Sensory
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#e8e2d8] text-[#1b5e3f] font-medium">
                    Everyday care
                  </span>
                </div>
              </div>

              {/* 03. SCENTED AGARBATTI */}
              <div className="reveal-on-scroll reveal-delay-200 group rounded-2xl border border-[#e8e2d8] bg-[#fcfbf9] p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-semibold text-[#1b5e3f]">03.</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#1b5e3f] bg-white border border-[#e8e2d8] px-3 py-1 rounded-full font-semibold">
                      Rituals
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-[#1a1a1a] mb-3 group-hover:text-[#1b5e3f] transition-colors">
                    SCENTED AGARBATTI
                  </h3>
                  <p className="text-sm text-[#555555] font-light leading-relaxed mb-5">
                    Artisan Scents brings fragrance to traditional rituals and everyday moments
                    through its agarbatti range. Suitable for prayer spaces, meditation settings, and
                    home ambience, these incense products help create an atmosphere of calm and
                    familiarity.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#e8e2d8] space-y-1.5">
                  <div className="text-xs font-semibold text-[#1b5e3f] uppercase tracking-wider">
                    Fragrances inspired by Indian traditions
                  </div>
                  <div className="text-xs text-[#666666]">
                    Floral, woody and soothing scent profiles
                  </div>
                </div>
              </div>

              {/* 04. CAR PERFUME */}
              <div className="reveal-on-scroll reveal-delay-100 group rounded-2xl border border-[#e8e2d8] bg-[#fcfbf9] p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-semibold text-[#1b5e3f]">04.</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#1b5e3f] bg-white border border-[#e8e2d8] px-3 py-1 rounded-full font-semibold">
                      Automotive
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-[#1a1a1a] mb-3 group-hover:text-[#1b5e3f] transition-colors">
                    CAR PERFUME
                  </h3>
                  <p className="text-sm text-[#555555] font-light leading-relaxed mb-5">
                    Enhance your driving environment with car perfumes designed to bring a pleasant
                    fragrance to vehicle interiors. Combining compact designs with an everyday
                    lifestyle appeal, this category offers a simple way to personalise the in-car
                    experience.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#e8e2d8] space-y-1">
                  <div className="text-xs text-[#1b5e3f] font-semibold">
                    • Designed for automotive fragrance use
                  </div>
                  <div className="text-xs text-[#555555]">• Compact and stylish diffuser formats</div>
                  <div className="text-xs text-[#555555]">
                    • Fresh, woody and sophisticated fragrance options
                  </div>
                </div>
              </div>

              {/* 05. LUXURY PERFUMES */}
              <div className="reveal-on-scroll reveal-delay-200 group rounded-2xl border border-[#e8e2d8] bg-[#fcfbf9] p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-xl md:col-span-2 lg:col-span-2">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-semibold text-[#1b5e3f]">05.</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#1b5e3f] bg-white border border-[#e8e2d8] px-3 py-1 rounded-full font-semibold">
                      Haute Parfumerie
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-[#1a1a1a] mb-3 group-hover:text-[#1b5e3f] transition-colors">
                    LUXURY PERFUMES
                  </h3>
                  <p className="text-sm text-[#555555] font-light leading-relaxed mb-5">
                    Artisan Scents' luxury perfume category celebrates fragrance as an expression of
                    personality, style, and individuality. With an emphasis on sophisticated
                    presentation and distinctive scent experiences, these perfumes are suited to
                    personal wear, special occasions, and thoughtful gifting.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#e8e2d8] flex items-center gap-6 flex-wrap">
                  <div className="text-xs font-semibold text-[#1b5e3f] uppercase tracking-wider">
                    Distinctive fragrance compositions
                  </div>
                  <div className="text-xs text-[#666666]">Sophisticated scent profiles</div>
                  <a
                    href="/perfumes"
                    className="ml-auto text-xs text-[#1b5e3f] font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Perfume Collection <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality, Standards & Production Pillars */}
        <section className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <div className="reveal-on-scroll mb-14 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-semibold mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>QUALITY ARCHITECTURE</span>
              <span className="w-5 h-[1px] bg-[#d4af37]" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1a1a1a]">
              EVERY DETAIL SHAPES THE EXPERIENCE
            </h2>
            <p className="text-[#555555] text-sm sm:text-base mt-4 font-light leading-relaxed">
              Artisan Scents' luxury perfume category celebrates fragrance as an expression of
              personality, style, and individuality. With an emphasis on sophisticated presentation
              and distinctive scent experiences, these perfumes are suited to personal wear,
              special occasions, and thoughtful gifting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {/* Pillar 1 */}
            <div className="reveal-on-scroll group bg-white rounded-2xl border border-[#e8e2d8] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#1b5e3f]/10 text-[#1b5e3f] flex items-center justify-center mb-5">
                <Sparkles size={22} />
              </div>
              <h3 className="font-display text-lg text-[#1a1a1a] mb-3 group-hover:text-[#1b5e3f] transition-colors">
                FRAGRANCE AND INGREDIENT SPECIFICATIONS
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed font-light">
                Artisan Scents' luxury perfume category celebrates fragrance as an expression of
                personality, style, and individuality. With an emphasis on sophisticated
                presentation and distinctive scent experiences, these perfumes are suited to
                personal wear, special occasions, and thoughtful gifting.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="reveal-on-scroll reveal-delay-100 group bg-white rounded-2xl border border-[#e8e2d8] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#1b5e3f]/10 text-[#1b5e3f] flex items-center justify-center mb-5">
                <ShieldCheck size={22} />
              </div>
              <h3 className="font-display text-lg text-[#1a1a1a] mb-3 group-hover:text-[#1b5e3f] transition-colors">
                MATERIAL VERIFICATION
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed font-light">
                Artisan Scents' luxury perfume category celebrates fragrance as an expression of
                personality, style, and individuality. With an emphasis on sophisticated
                presentation and distinctive scent experiences, these perfumes are suited to
                personal wear, special occasions, and thoughtful gifting.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="reveal-on-scroll reveal-delay-200 group bg-white rounded-2xl border border-[#e8e2d8] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#1b5e3f]/10 text-[#1b5e3f] flex items-center justify-center mb-5">
                <PackageCheck size={22} />
              </div>
              <h3 className="font-display text-lg text-[#1a1a1a] mb-3 group-hover:text-[#1b5e3f] transition-colors">
                PRODUCT AND PACKAGING CHECKS
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed font-light">
                Artisan Scents' luxury perfume category celebrates fragrance as an expression of
                personality, style, and individuality. With an emphasis on sophisticated
                presentation and distinctive scent experiences, these perfumes are suited to
                personal wear, special occasions, and thoughtful gifting.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="reveal-on-scroll group bg-white rounded-2xl border border-[#e8e2d8] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#1b5e3f]/10 text-[#1b5e3f] flex items-center justify-center mb-5">
                <Truck size={22} />
              </div>
              <h3 className="font-display text-lg text-[#1a1a1a] mb-3 group-hover:text-[#1b5e3f] transition-colors">
                SOURCING &amp; PROCUREMENT
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed font-light">
                Artisan Scents' luxury perfume category celebrates fragrance as an expression of
                personality, style, and individuality. With an emphasis on sophisticated
                presentation and distinctive scent experiences, these perfumes are suited to
                personal wear, special occasions, and thoughtful gifting.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="reveal-on-scroll reveal-delay-100 group bg-white rounded-2xl border border-[#e8e2d8] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-lg md:col-span-2 lg:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-[#1b5e3f]/10 text-[#1b5e3f] flex items-center justify-center mb-5">
                <Factory size={22} />
              </div>
              <h3 className="font-display text-lg text-[#1a1a1a] mb-3 group-hover:text-[#1b5e3f] transition-colors">
                PRODUCTION AND ASSEMBLY
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed font-light">
                Artisan Scents' luxury perfume category celebrates fragrance as an expression of
                personality, style, and individuality. With an emphasis on sophisticated
                presentation and distinctive scent experiences, these perfumes are suited to
                personal wear, special occasions, and thoughtful gifting.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Collaboration */}
        <section className="bg-gradient-to-r from-[#181614] via-[#100e0d] to-[#0a0908] text-white py-16 border-t border-[#1b5e3f]/20">
          <div className="max-w-3xl mx-auto px-6 text-center reveal-on-scroll">
            <div className="text-xs uppercase tracking-[0.25em] text-[#86efac] font-medium mb-3">
              BEGIN A CONVERSATION
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">
              Explore the World of Artisan Scents
            </h2>
            <p className="text-[#c4c0b8] text-sm sm:text-base font-light mb-8 max-w-xl mx-auto leading-relaxed">
              Whether you are looking for personal signature scents, curated retail lines, or bespoke
              fragrance solutions, our atelier welcomes you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                className="h-12 px-7 rounded-full bg-[#1b5e3f] hover:bg-[#23734e] text-white border border-[#2d8659]/50 font-medium tracking-wide shadow-xl transition-all"
              >
                <a href="/perfumes" className="flex items-center gap-2">
                  Explore Products <ArrowRight size={15} className="text-[#86efac]" />
                </a>
              </Button>
              <Button
                asChild
                className="h-12 px-7 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white text-sm font-medium tracking-wide backdrop-blur-md transition-all"
              >
                <a href="/contact">Contact Atelier</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
