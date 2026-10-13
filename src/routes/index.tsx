import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Lock,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, money, type Product } from "@/lib/products";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import { EntranceLoader } from "@/components/EntranceLoader";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import perfumeStory from "@/assets/images/perfume_story_editorial_1791888489737.jpg";

const ScentSculpture = lazy(() => import("@/components/ScentSculpture"));
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Artisan Scents — Premium Fragrances & Essential Oils" },
      {
        name: "description",
        content:
          "Discover Artisan Scents: luxury perfumes, pure essential oils, car diffusers, and handcrafted agarbatti. Crafted with botanical expertise.",
      },
      { property: "og:title", content: "Artisan Scents — Premium Fragrances" },
      {
        property: "og:description",
        content: "Premium fragrances. Botanical expertise. Artisanal excellence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState("All Products");
  const [selected, setSelected] = useState<Product>();
  const [bag, setBag] = useState<Record<string, number>>({});
  const [panel, setPanel] = useState<"bag" | "search" | "menu" | "story" | null>(null);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const close = () => {
    setPanel(null);
    setSelected(undefined);
    setCheckout(false);
  };
  const totalItems = Object.values(bag).reduce((a, b) => a + b, 0);
  const total = products.reduce((sum, p) => sum + p.price * (bag[p.id] || 0), 0);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!panel && !selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const listener = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", listener);
    };
  }, [panel, selected]);
  const add = (p: Product) => {
    setBag((old) => ({ ...old, [p.id]: (old[p.id] || 0) + 1 }));
    setSelected(undefined);
    setPanel("bag");
    setCheckout(false);
  };
  const update = (id: string, amount: number) =>
    setBag((old) => ({ ...old, [id]: Math.max(0, (old[id] || 0) + amount) }));
  const toggleSaved = (id: string) =>
    setSaved((old) => (old.includes(id) ? old.filter((x) => x !== id) : [...old, id]));
  const filtered = products.filter((p) => {
    if (filter === "All Products") return true;
    if (filter === "Perfumes") return p.category === "perfumes";
    if (filter === "Oils") return p.category === "essence-oils";
    if (filter === "Car Perfumes") return p.category === "car-perfumes";
    if (filter === "Agarbatti") return p.category === "agarbatti";
    if (filter === "Soaps") return p.category === "soaps";
    return true;
  });
  const signatureIcons = ["gold-collection", "midnight-mystery", "car-wooden", "vetiver-oil"]
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <>
      <EntranceLoader />
      <div className="announcement">
        Luxury Fragrances. Botanical Excellence. Artisanal Craftsmanship.{" "}
        <span className="ml-3">✦</span>
      </div>
      <Header
        currentPage="Home"
        onSearchClick={() => setPanel("search")}
        onBagClick={() => setPanel("bag")}
        totalItems={totalItems}
      />
      <main>
        {/* Luxury Hero Section */}
        <section className="relative overflow-hidden text-white bg-[#0a0908] border-b border-[#2d8659]/20">
          {/* Video Background */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <video
              src="/videos/aurel-hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105"
            />
            {/* Light Overlays for optimal text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-14 lg:pt-24 lg:pb-20">
            <div className="max-w-4xl flex flex-col items-start">
              <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#86efac] font-medium mb-4">
                <span className="w-6 h-[1px] bg-[#d4af37]" />
                <span>LUXURY PERFUMES &amp; BOTANICAL ESSENCES</span>
              </div>

              <h1 className="reveal-on-scroll reveal-delay-100 font-display text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight text-white max-w-3xl">
                Timeless Elegance in
                <br />
                <em className="text-[#86efac] italic font-serif">every Drop</em>
              </h1>

              <p className="reveal-on-scroll reveal-delay-200 mt-6 text-base sm:text-lg text-[#e0deda] font-light leading-relaxed max-w-2xl">
                Luxury perfumes crafted for those who appreciate the extraordinary. Handcrafted
                botanical compositions and rare essences born from artisanal dedication.
              </p>

              <div className="reveal-on-scroll reveal-delay-300 mt-8 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  className="h-12 px-8 bg-[#1b5e3f] hover:bg-[#23734e] text-white border border-[#2d8659]/50 rounded-full font-medium tracking-wide shadow-xl transition-all"
                >
                  <a href="/perfumes" className="flex items-center gap-2">
                    Explore Collection <ArrowRight size={16} className="text-[#86efac]" />
                  </a>
                </Button>

                <Button
                  asChild
                  className="h-12 px-7 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white text-sm font-medium tracking-wide backdrop-blur-md transition-all"
                >
                  <a href="/about" className="flex items-center gap-2.5">
                    <Sparkles size={14} className="text-[#d4af37]" /> Our Story
                  </a>
                </Button>
              </div>
            </div>

            {/* Trust Badges Strip with High Contrast Text */}
            <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left reveal-on-scroll">
              <div className="flex items-center gap-3 justify-center md:justify-start reveal-on-scroll reveal-delay-50">
                <div className="w-10 h-10 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/50 flex items-center justify-center text-[#86efac] shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white">
                    Premium Quality
                  </div>
                  <div className="text-[11px] text-[#b0aaa0]">100% Authentic Guaranteed</div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start reveal-on-scroll reveal-delay-150">
                <div className="w-10 h-10 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/50 flex items-center justify-center text-[#86efac] shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white">
                    Long Lasting
                  </div>
                  <div className="text-[11px] text-[#b0aaa0]">High Extrait Concentration</div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start reveal-on-scroll reveal-delay-250">
                <div className="w-10 h-10 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/50 flex items-center justify-center text-[#86efac] shrink-0">
                  <Truck size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white">
                    Free Shipping
                  </div>
                  <div className="text-[11px] text-[#b0aaa0]">On Orders Above ₹999</div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start reveal-on-scroll reveal-delay-350">
                <div className="w-10 h-10 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/50 flex items-center justify-center text-[#86efac] shrink-0">
                  <Lock size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white">
                    Secure Payment
                  </div>
                  <div className="text-[11px] text-[#b0aaa0]">Safe & Encrypted Checkout</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="collection" className="section">
          <div className="section-heading reveal-on-scroll">
            <div>
              <div className="eyebrow text-muted-foreground">OUR COLLECTION</div>
              <h2 className="section-title">Our Categories of Luxury</h2>
            </div>
            <a
              href={
                filter === "Perfumes" ? "/perfumes"
                : filter === "Oils" ? "/essence-oils"
                : filter === "Car Perfumes" ? "/car-perfumes"
                : filter === "Agarbatti" ? "/agarbatti"
                : filter === "Soaps" ? "/soaps"
                : "/perfumes"
              }
              className="inline-flex items-center gap-2 text-sm font-medium text-[#1b5e3f] hover:text-[#164a31] transition-colors"
            >
              View all {filter !== "All Products" ? filter : "products"} <ArrowRight size={15} />
            </a>
          </div>

          <div
            className="collection-tabs reveal-fade reveal-delay-100"
            role="tablist"
            aria-label="Product category"
          >
            {["All Products", "Perfumes", "Oils", "Car Perfumes"].map((f) => (
              <Button
                key={f}
                variant="tab"
                role="tab"
                aria-selected={filter === f}
                data-active={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>

          <div className="product-grid">
            {filtered.slice(0, 3).map((p, idx) => {
              const delayClass =
                idx % 3 === 0
                  ? "reveal-delay-100"
                  : idx % 3 === 1
                    ? "reveal-delay-200"
                    : "reveal-delay-300";
              return (
                <article key={p.id} className={`reveal-on-scroll ${delayClass}`}>
                  <div
                    className="product-image"
                    style={{
                      backgroundColor:
                        p.category === "essence-oils"
                          ? "#faf5f0"
                          : p.category === "car-perfumes"
                            ? "#f0f0f0"
                            : p.category === "agarbatti"
                              ? "#fef3c7"
                              : "#f5e6d3",
                    }}
                  >
                    <a href={`/products/${p.id}`}>
                      <img
                        src={p.image}
                        alt={`${p.name}`}
                        width={1024}
                        height={1024}
                        loading="lazy"
                        style={{ objectFit: "contain", padding: "20px" }}
                      />
                    </a>
                    <span className="product-badge">{p.badge}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      aria-label={`${saved.includes(p.id) ? "Unsave" : "Save"} ${p.name}`}
                      aria-pressed={saved.includes(p.id)}
                      onClick={() => toggleSaved(p.id)}
                    >
                      <Heart className={saved.includes(p.id) ? "fill-foreground" : ""} />
                    </Button>
                  </div>
                  <div className="product-info">
                    <div>
                      <a href={`/products/${p.id}`} className="product-name">
                        {p.name}
                      </a>
                      <p className="product-notes">{p.notes}</p>
                      <div className="text-[9px] text-muted-foreground capitalize">
                        {p.category.replace("-", " ")}
                      </div>
                    </div>
                    <span className="product-price">{money(p.price)}</span>
                  </div>
                  <Button variant="editorial" className="mt-3 w-full" onClick={() => add(p)}>
                    Add to bag <Plus size={14} />
                  </Button>
                </article>
              );
            })}
          </div>

          {/* View All Category Link */}
          <div className="flex justify-center mt-10 reveal-on-scroll">
            <a
              href={
                filter === "Perfumes" ? "/perfumes"
                : filter === "Oils" ? "/essence-oils"
                : filter === "Car Perfumes" ? "/car-perfumes"
                : filter === "Agarbatti" ? "/agarbatti"
                : filter === "Soaps" ? "/soaps"
                : "/perfumes"
              }
              className="inline-flex items-center gap-3 h-12 px-8 rounded-full border border-[#1b5e3f]/40 bg-white hover:bg-[#1b5e3f] hover:text-white text-[#1b5e3f] text-sm font-medium tracking-wide transition-all duration-300 shadow-sm hover:shadow-md"
            >
              See all {filter !== "All Products" ? filter : "Perfumes"} <ArrowRight size={15} />
            </a>
          </div>
        </section>

        <section className="ritual-strip reveal-fade">
          <span>
            <Sparkles size={16} strokeWidth={1} /> Handcrafted with Care
          </span>
          <span>
            <ShoppingBag size={16} strokeWidth={1} /> Premium Quality
          </span>
          <span>
            <Heart size={16} strokeWidth={1} /> Botanical Excellence
          </span>
        </section>

        {/* Our Product Categories Section - Bespoke Shades of Luxury Green */}
        <section className="section bg-[#fafaf8] text-[#333333] border-y border-[#2d8659]/15 py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-3">
                <span className="w-5 h-[1px] bg-[#d4af37]" />
                <span>ARTISANAL PORTFOLIO</span>
                <span className="w-5 h-[1px] bg-[#d4af37]" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#333333]">
                Our Product Categories
              </h2>
              <p className="text-[#666666] text-sm mt-3 font-light leading-relaxed">
                Explore our distinct scent worlds, each formulated with rare botanical essences and
                presented in curated luxury green palettes.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {/* Category 1: Perfumes */}
              <a
                href="/perfumes"
                className="reveal-on-scroll reveal-delay-100 group relative rounded-2xl overflow-hidden border border-[#e8e2d8] bg-white p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-xl hover:shadow-[#1b5e3f]/5"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#fcfbf9] border border-[#e8e2d8] p-4 flex items-center justify-center mb-4">
                  <img
                    src="/assets/perfumes/Luxury Perfume Collection in Gold and Glass.png"
                    alt="Luxury Perfumes"
                    className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 text-[10px] uppercase tracking-widest text-[#1b5e3f] bg-white/95 border border-[#1b5e3f]/25 font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                    Extrait
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#1a1a1a] group-hover:text-[#1b5e3f] transition-colors">
                    Perfumes
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 font-light">Luxury compositions</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#1b5e3f] font-medium pt-3 border-t border-[#1b5e3f]/15">
                    <span>Explore</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </a>

              {/* Category 2: Essence Oils */}
              <a
                href="/essence-oils"
                className="reveal-on-scroll reveal-delay-200 group relative rounded-2xl overflow-hidden border border-[#e8e2d8] bg-white p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-xl hover:shadow-[#1b5e3f]/5"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#fcfbf9] border border-[#e8e2d8] p-4 flex items-center justify-center mb-4">
                  <img
                    src="/assets/essence oil/Amber Rosemary Oil Bottle.png"
                    alt="Essence Oils"
                    className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 text-[10px] uppercase tracking-widest text-[#1b5e3f] bg-white/95 border border-[#e8e2d8] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                    100% Pure
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#1a1a1a] group-hover:text-[#1b5e3f] transition-colors">
                    Essence Oils
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 font-light">Pure botanical extracts</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#1b5e3f] font-medium pt-3 border-t border-[#e8e2d8]">
                    <span>Explore</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </a>

              {/* Category 3: Car Perfumes */}
              <a
                href="/car-perfumes"
                className="reveal-on-scroll reveal-delay-300 group relative rounded-2xl overflow-hidden border border-[#e8e2d8] bg-white p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-xl hover:shadow-[#1b5e3f]/5"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#fcfbf9] border border-[#e8e2d8] p-4 flex items-center justify-center mb-4">
                  <img
                    src="/assets/car perfume/Minimalist Hanging Green Diffuser Bottle.png"
                    alt="Car Perfumes"
                    className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 text-[10px] uppercase tracking-widest text-[#1b5e3f] bg-white/95 border border-[#e8e2d8] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                    Wood Cap
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#1a1a1a] group-hover:text-[#1b5e3f] transition-colors">
                    Car Perfumes
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 font-light">Stylish hanging diffusers</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#1b5e3f] font-medium pt-3 border-t border-[#e8e2d8]">
                    <span>Explore</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </a>

              {/* Category 4: Agarbatti & Dhoop */}
              <a
                href="/agarbatti"
                className="reveal-on-scroll reveal-delay-400 group relative rounded-2xl overflow-hidden border border-[#e8e2d8] bg-white p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-xl hover:shadow-[#1b5e3f]/5"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#fcfbf9] border border-[#e8e2d8] p-4 flex items-center justify-center mb-4">
                  <img
                    src="/assets/agarbatti/Pyramid of Premium Dhoop Sticks.png"
                    alt="Agarbatti and Dhoop"
                    className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 text-[10px] uppercase tracking-widest text-[#1b5e3f] bg-white/95 border border-[#e8e2d8] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                    Sacred
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#1a1a1a] group-hover:text-[#1b5e3f] transition-colors">
                    Agarbatti
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 font-light">
                    Sacred handcrafted incense
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#1b5e3f] font-medium pt-3 border-t border-[#e8e2d8]">
                    <span>Explore</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </a>

              {/* Category 5: Soaps */}
              <a
                href="/soaps"
                className="reveal-on-scroll reveal-delay-500 group relative rounded-2xl overflow-hidden border border-[#e8e2d8] bg-white p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-xl hover:shadow-[#1b5e3f]/5"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#fcfbf9] border border-[#e8e2d8] p-4 flex items-center justify-center mb-4">
                  <img
                    src="/assets/soaps/soap.png"
                    alt="Handcrafted Soaps"
                    className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 text-[10px] uppercase tracking-widest text-[#1b5e3f] bg-white/95 border border-[#e8e2d8] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                    Handcrafted
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#1a1a1a] group-hover:text-[#1b5e3f] transition-colors">
                    Soaps
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 font-light">Artisan bathing bars</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#1b5e3f] font-medium pt-3 border-t border-[#e8e2d8]">
                    <span>Explore</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Curated Masterpieces */}
        <section className="section bg-[#fafaf8] text-[#333333] border-b border-[#2d8659]/15">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-3">
                <span className="w-5 h-[1px] bg-[#d4af37]" />
                <span>CURATED MASTERPIECES</span>
                <span className="w-5 h-[1px] bg-[#d4af37]" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1a1a1a]">
                The Signature Icons
              </h2>
              <p className="text-[#666666] text-sm mt-3 font-light leading-relaxed">
                Four formulations that define the house — composed in small batches and pursued for
                their depth, distinction, and enduring sillage.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {signatureIcons.map((p, idx) => (
                <a
                  key={p.id}
                  href={`/products/${p.id}`}
                  className={`reveal-on-scroll reveal-delay-${(idx + 1) * 100} group rounded-2xl overflow-hidden border border-[#e8e2d8] bg-white p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-xl`}
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#fcfbf9] border border-[#e8e2d8] p-5 flex items-center justify-center mb-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 text-[9px] uppercase tracking-widest text-[#1b5e3f] bg-white/95 border border-[#e8e2d8] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                      {p.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-[#1a1a1a] group-hover:text-[#1b5e3f] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-[#666666] mt-1 font-light">{p.notes}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-[#1b5e3f] font-medium pt-3 border-t border-[#e8e2d8]">
                      <span>{money(p.price)}</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Connoisseur Advice */}
        <section className="section bg-[#fafaf8] text-[#333333] border-b border-[#2d8659]/15">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-3">
                <span className="w-5 h-[1px] bg-[#d4af37]" />
                <span>CONNOISSEUR ADVICE</span>
                <span className="w-5 h-[1px] bg-[#d4af37]" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1a1a1a]">
                The Art of Scenting
              </h2>
              <p className="text-[#666666] text-sm mt-3 font-light leading-relaxed">
                Fragrance is an invisible garment. Discover three rituals to elevate longevity,
                projection, and personal presence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {[
                {
                  n: "01",
                  title: "Pulse Point Resonance",
                  body: "Apply pure oils or perfume to inner wrists, behind ears, and along the collarbones. Natural blood flow radiates gentle heat that slowly unfurls subtle middle notes.",
                },
                {
                  n: "02",
                  title: "Bespoke Olfactory Layering",
                  body: "Lay a deep grounding anchor using Vetiver or Patchouli oil on damp skin, then mist Midnight Eau de Parfum or a floral touch over fabric for a signature sillage.",
                },
                {
                  n: "03",
                  title: "Ambient & Cabin Sanctuary",
                  body: "Inverted wooden car diffusers and slow-burning agarbatti sticks purify interior spaces without harsh aerosol propellants, cultivating mindful tranquility.",
                },
              ].map((r, idx) => (
                <div
                  key={r.n}
                  className={`reveal-on-scroll reveal-delay-${(idx + 1) * 100} rounded-2xl border border-[#1b5e3f]/20 bg-white p-7 shadow-sm transition hover:shadow-md hover:border-[#1b5e3f]/40`}
                >
                  <div className="font-display text-4xl text-[#1b5e3f] mb-3">{r.n}</div>
                  <h3 className="font-display text-xl text-[#1a1a1a] mb-2">{r.title}</h3>
                  <p className="text-sm text-[#555555] font-light leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Story Spotlight */}
        <section className="section py-16 bg-[#f7f6f2] text-[#333333] border-b border-[#2d8659]/15">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="reveal-on-scroll reveal-slow relative rounded-2xl overflow-hidden border border-[#1b5e3f]/20 shadow-xl bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 z-10 reveal-left reveal-delay-100">
                  <div className="eyebrow text-[#1b5e3f] font-semibold tracking-[0.25em] text-xs uppercase mb-3">
                    OUR PHILOSOPHY
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1a1a1a] leading-tight">
                    More Than a Fragrance
                  </h2>
                  <p className="text-[#1b5e3f] font-serif italic text-lg sm:text-xl mt-2 mb-4">
                    It's a feeling. A memory. A part of you.
                  </p>
                  <p className="text-[#555555] text-sm sm:text-base font-light max-w-lg mb-8 leading-relaxed">
                    Every drop is formulated to resonate with emotion and presence. We blend
                    centuries-old Indian perfume traditions with modern organic distillation to
                    create perfumes that linger like poetry.
                  </p>
                  <Button
                    asChild
                    className="h-11 px-7 rounded-full bg-[#1b5e3f] hover:bg-[#164a31] border border-[#1b5e3f]/40 text-white font-medium tracking-wide shadow-md"
                  >
                    <a href="/about" className="inline-flex items-center gap-2">
                      Discover Our Story <ArrowRight size={15} />
                    </a>
                  </Button>
                </div>
                <div className="lg:col-span-5 h-72 lg:h-full relative overflow-hidden reveal-right reveal-delay-200">
                  <img
                    src={perfumeStory}
                    alt="Artisan Scents editorial portrait"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white/20 via-transparent to-transparent opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="maison" className="maison reveal-on-scroll">
          <div className="maison-canvas">
            {mounted && (
              <Suspense fallback={null}>
                <ScentSculpture />
              </Suspense>
            )}
          </div>
          <div className="maison-copy reveal-on-scroll reveal-delay-150">
            <div className="eyebrow text-[#d4af37] tracking-[0.25em] text-xs font-semibold">
              THE ARTISAN SCENTS MISSION
            </div>
            <h2 className="section-title text-[#faf8f5] mt-2">
              More than a fragrance.
              <br />
              <em className="text-[#86efac] italic font-serif">A way of life.</em>
            </h2>
            <p className="text-[#e2ded7] font-light leading-relaxed">
              At Artisan Scents, we believe that fragrance is an invisible signature—an intimate
              expression of who you are. We work with KEOMC's botanical expertise to source the
              finest aromatic plants and essential oils, crafting products that turn fleeting
              moments into lasting memories.
            </p>
            <Button
              asChild
              className="mt-3 h-11 px-7 rounded-full bg-[#d4af37] hover:bg-[#c5a028] text-[#071c12] font-semibold tracking-wide shadow-lg border border-[#f3e5ab]/40 transition-all pointer-events-auto"
            >
              <a href="/about" className="inline-flex items-center gap-2">
                Discover our story <ArrowRight size={15} />
              </a>
            </Button>
          </div>
          <span className="maison-caption text-[#d4af37] font-mono tracking-widest text-[10px]">
            HANDCRAFTED SINCE INCEPTION · 100% NATURAL
          </span>
        </section>

        <section id="journal" className="section journal">
          <img
            src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=85"
            alt="Premium fragrance collection"
            width={1200}
            height={900}
            loading="lazy"
            className="reveal-scale"
            style={{ objectFit: "cover", borderRadius: "12px" }}
          />
          <div className="reveal-on-scroll reveal-delay-150">
            <div className="eyebrow text-muted-foreground">THE ARTISAN DIFFERENCE</div>
            <h2 className="section-title">
              Crafted with
              <br />
              <em>intention.</em>
            </h2>
            <p>
              Every Artisan Scents product is carefully formulated using natural botanical extracts
              and essential oils. From our luxury perfumes to our pure essence oils, each item
              reflects our commitment to quality, sustainability, and artisanal excellence.
            </p>
            <Button variant="editorial" onClick={() => setPanel("story")}>
              Learn more <ArrowRight />
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section bg-[#fafaf8] text-[#333333] border-b border-[#2d8659]/15 py-20">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <div className="text-center mb-14 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-3">
                <span className="w-5 h-[1px] bg-[#d4af37]" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
                <span className="w-5 h-[1px] bg-[#d4af37]" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1a1a1a]">
                Everything You Need to Know
              </h2>
              <p className="text-[#666666] text-sm mt-3 font-light leading-relaxed max-w-xl mx-auto">
                Have questions about our fragrances, ingredients, or orders? We've answered the most common ones below.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "What makes Artisan Scent fragrances different from regular perfumes?",
                  a: "Our fragrances are crafted in small batches using high-concentration botanical essences sourced from KEOMC's aromatic plant labs. We use traditional extraction methods — steam distillation and cold-press — to preserve the authentic character of each ingredient. Every product is free from synthetic fillers and harmful chemicals."
                },
                {
                  q: "Are your products 100% natural and chemical-free?",
                  a: "Yes. We are committed to using only pure botanical extracts, essential oils, plant-derived butters, and natural bamboo or glass packaging materials. Our agarbatti sticks are charcoal-free; our soaps contain no SLS or parabens; and our essence oils are unadulterated single-origin distillates."
                },
                {
                  q: "How long do the perfumes and essence oils last?",
                  a: "Our luxury perfumes have a high extrait concentration of 30–40% pure essence and typically last 8–12 hours on the skin. Essence oils, when applied to pulse points, can last 6–10 hours. Car perfumes provide continuous fragrance for up to 60 days."
                },
                {
                  q: "Do you offer bulk or wholesale pricing?",
                  a: "Yes! We supply essence oils in bulk quantities (500ml, 1L, and custom larger quantities) for perfumers, spas, and wellness businesses. We also offer agarbatti in wholesale packs. Please contact us through the Contact page for pricing and MOQ details."
                },
                {
                  q: "What is your shipping policy?",
                  a: "We offer free shipping on all orders above ₹999 within India. Standard delivery takes 3–5 business days. Express delivery is available at checkout for faster dispatch. All orders are carefully packed to prevent breakage during transit."
                },
                {
                  q: "Can I return or exchange a product?",
                  a: "We accept returns within 7 days of delivery for unopened, unused products in original packaging. For damaged or incorrect items, please contact us within 48 hours of delivery with a photo, and we'll arrange an immediate replacement at no cost."
                },
                {
                  q: "Are Artisan Scent products suitable as gifts?",
                  a: "Absolutely. Our luxury perfumes, essence oil kits, and handcrafted soap sets make beautiful gifts for any occasion. We offer gift-ready packaging on select products. For corporate gifting or bulk gift orders, please reach out to us directly."
                },
                {
                  q: "Where are Artisan Scent products manufactured?",
                  a: "All our products are made in India, leveraging the rich tradition of Indian perfumery and botanical expertise. We work closely with KEOMC's aromatic plant cultivation and distillation facilities to ensure traceable, ethical sourcing from farm to bottle."
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
                  className={`reveal-on-scroll reveal-delay-${(idx % 4) * 100 + 50} group rounded-2xl border border-[#e8e2d8] bg-white overflow-hidden transition-all duration-300 hover:border-[#1b5e3f]/30 hover:shadow-md`}
                >
                  <summary className="flex items-center justify-between px-7 py-5 cursor-pointer list-none select-none">
                    <span className="font-display text-base sm:text-lg text-[#1a1a1a] pr-4">{faq.q}</span>
                    <span className="shrink-0 w-6 h-6 rounded-full border border-[#1b5e3f]/30 flex items-center justify-center text-[#1b5e3f] group-open:rotate-45 transition-transform duration-300">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </span>
                  </summary>
                  <div className="px-7 pb-6 text-sm text-[#555555] font-light leading-relaxed border-t border-[#e8e2d8] pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer newsletter />
      {(selected || panel) && (
        <div className={`overlay ${panel === "bag" ? "bag-overlay" : ""}`} onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={
              selected?.name ||
              (panel === "bag"
                ? "Your shopping bag"
                : panel === "search"
                  ? "Search products"
                  : panel === "story"
                    ? "Artisan Scents Story"
                    : "Navigation")
            }
            className={`dialog ${panel === "bag" ? "bag-panel" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dialog-header">
              <h2 className="font-display text-3xl">
                {selected
                  ? selected.name
                  : panel === "bag"
                    ? `Your bag (${totalItems})`
                    : panel === "search"
                      ? "Find your fragrance"
                      : panel === "menu"
                        ? "ARTISAN SCENTS"
                        : "Our Commitment to Quality"}
              </h2>
              <Button variant="ghost" size="icon" aria-label="Close" autoFocus onClick={close}>
                <X />
              </Button>
            </div>
            {selected && (
              <div className="detail-grid">
                <img src={selected.image} alt={selected.name} style={{ objectFit: "contain" }} />
                <div>
                  <div className="eyebrow text-muted-foreground">
                    {selected.family} · {selected.category}
                  </div>
                  <h3 className="section-title">{selected.name}</h3>
                  <p className="text-sm leading-7 my-5">{selected.description}</p>
                  <p className="product-notes">{selected.notes}</p>
                  {selected.botanicalName && (
                    <p className="text-xs my-2 text-muted-foreground">{selected.botanicalName}</p>
                  )}
                  <p className="text-sm my-5">
                    {selected.size || "100 ml"} · {money(selected.price)}
                  </p>
                  <Button className="w-full" onClick={() => add(selected)}>
                    Add to bag <Plus />
                  </Button>
                </div>
              </div>
            )}
            {panel === "bag" && (
              <>
                <div className="bag-list">
                  {totalItems === 0 ? (
                    <div className="py-16 text-center">
                      <ShoppingBag className="mx-auto mb-5 text-muted-foreground" />
                      <h3 className="font-display text-3xl">A fragrance awaits.</h3>
                      <p className="status-note my-4">Your bag is currently empty.</p>
                      <Button variant="editorial" onClick={close}>
                        Explore the collection <ArrowRight />
                      </Button>
                    </div>
                  ) : (
                    products
                      .filter((p) => (bag[p.id] || 0) > 0)
                      .map((p) => (
                        <div className="bag-item" key={p.id}>
                          <img src={p.image} alt={p.name} style={{ objectFit: "contain" }} />
                          <div>
                            <div className="flex justify-between">
                              <h3 className="font-display text-xl">{p.name}</h3>
                              <span className="text-xs">{money(p.price * (bag[p.id] || 0))}</span>
                            </div>
                            <p className="product-notes capitalize">
                              {p.category.replace("-", " ")}
                            </p>
                            <div className="quantity">
                              <Button
                                variant="outline"
                                size="icon"
                                aria-label={`Remove one ${p.name}`}
                                onClick={() => update(p.id, -1)}
                              >
                                <Minus />
                              </Button>
                              <span className="text-xs">{bag[p.id]}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                aria-label={`Add one ${p.name}`}
                                onClick={() => update(p.id, 1)}
                              >
                                <Plus />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
                {totalItems > 0 && (
                  <div className="pt-6">
                    <div className="flex justify-between text-sm mb-4">
                      <span>Subtotal</span>
                      <span>{money(total)}</span>
                    </div>
                    <Button className="w-full h-12" onClick={() => setCheckout(true)}>
                      Continue to checkout <ArrowRight />
                    </Button>
                    <p className="status-note mt-3">
                      {checkout
                        ? "This is a preview store. Payments and order processing are not connected; no charge has been made."
                        : "Shipping and taxes calculated at checkout."}
                    </p>
                  </div>
                )}
              </>
            )}
            {panel === "search" && (
              <>
                <input
                  className="search-input"
                  aria-label="Search by product name or note"
                  placeholder="Search a fragrance, an oil, a scent…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="search-results">
                  {products
                    .filter((p) =>
                      `${p.name} ${p.notes} ${p.category}`
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                    )
                    .map((p) => (
                      <a
                        href={`#${p.id}`}
                        key={p.id}
                        className="bag-item"
                        onClick={(e) => {
                          e.preventDefault();
                          setPanel(null);
                          setSelected(p);
                        }}
                      >
                        <img src={p.image} alt={p.name} style={{ objectFit: "contain" }} />
                        <div>
                          <h3 className="font-display text-2xl">{p.name}</h3>
                          <p className="product-notes">{p.notes}</p>
                          <span className="text-xs">{money(p.price)}</span>
                        </div>
                      </a>
                    ))}
                  {!products.some((p) =>
                    `${p.name} ${p.notes} ${p.category}`
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                  ) && (
                    <p className="status-note py-8">
                      No fragrances found. Try lavender, oud, or rose.
                    </p>
                  )}
                </div>
              </>
            )}
            {panel === "menu" && (
              <nav className="flex flex-col gap-6 font-display text-3xl">
                {[
                  ["Perfumes", "/perfumes"],
                  ["Oils", "/essence-oils"],
                  ["Car Perfumes", "/car-perfumes"],
                  ["Agarbatti", "/agarbatti"],
                  ["About", "/about"],
                ].map(([label, id]) => (
                  <a key={id} href={id} onClick={close} className="flex justify-between">
                    {label}
                    <ChevronRight />
                  </a>
                ))}
              </nav>
            )}
            {panel === "story" && (
              <div className="max-w-lg mx-auto py-5">
                <div className="eyebrow text-muted-foreground mb-5">Artisan Scents</div>
                <p className="text-sm leading-8">
                  We believe fragrance is more than a scent—it's a story, a memory, a moment. Each
                  Artisan Scents product is meticulously crafted using natural botanical extracts
                  and essential oils sourced through partnerships with KEOMC.
                </p>
                <p className="text-sm leading-8 mt-5">
                  From our luxury perfumes to our pure essence oils, every product reflects our
                  commitment to quality, sustainability, and artisanal excellence. We work with
                  aromatic plants from around the world, using traditional distillation methods to
                  preserve their natural essence.
                </p>
                <p className="font-display text-3xl my-6">Fragrance is personal. Make it yours.</p>
                <Button
                  variant="editorial"
                  onClick={() => {
                    close();
                    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore our collection <ArrowRight />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}





