import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  Minus,
  Pause,
  Play,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Lock,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, money, type Product } from "@/lib/products";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import { EntranceLoader } from "@/components/EntranceLoader";
import { Header } from "@/components/Header";

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
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [heroTab, setHeroTab] = useState<"video" | "photo">("photo");
  const [isMuted, setIsMuted] = useState(true);
  const video = useRef<HTMLVideoElement>(null);
  const close = () => {
    setPanel(null);
    setSelected(undefined);
    setCheckout(false);
  };
  const totalItems = Object.values(bag).reduce((a, b) => a + b, 0);
  const total = products.reduce((sum, p) => sum + p.price * (bag[p.id] || 0), 0);
  useEffect(() => {
    setMounted(true);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.current?.pause();
      setPaused(true);
    }
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
        <section className="relative overflow-hidden text-white bg-[#061912] border-b border-[#c5a880]/20">
          {/* Ambient Video Background Scrim */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
            <video
              src="/videos/aurel-hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter blur-[3px] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061912] via-[#061912]/80 to-[#061912]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#194c3a]/50 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-12 lg:pt-20 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Headline & Action */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium mb-4">
                  <span className="w-6 h-[1px] bg-[#d4af37]" />
                  <span>LUXURY PERFUMES</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-normal leading-[1.08] tracking-tight text-[#f4ede4]">
                  Timeless
                  <br />
                  Elegance in
                  <br />
                  <em className="text-[#d4af37] italic font-serif">every Drop</em>
                </h1>

                <p className="mt-5 text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-lg">
                  Luxury perfumes crafted for those who appreciate the extraordinary. Handcrafted
                  botanical compositions and rare essences born from artisanal dedication.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    className="h-12 px-7 bg-[#0d3324] hover:bg-[#144733] text-white border border-[#c5a880]/40 rounded-full font-medium tracking-wide shadow-lg transition-all"
                  >
                    <a href="/perfumes" className="flex items-center gap-2">
                      Explore Collection <ArrowRight size={16} className="text-[#d4af37]" />
                    </a>
                  </Button>

                  <button
                    onClick={() => {
                      setHeroTab((t) => (t === "video" ? "photo" : "video"));
                      if (video.current) {
                        if (heroTab === "photo") {
                          video.current.play();
                          setPaused(false);
                        }
                      }
                    }}
                    className="h-12 px-6 rounded-full border border-white/20 hover:border-[#c5a880]/60 bg-white/5 hover:bg-white/10 text-white/90 text-sm flex items-center gap-2.5 transition-all"
                  >
                    {heroTab === "photo" ? (
                      <>
                        <Play size={14} className="text-[#d4af37] fill-[#d4af37]" /> Watch Film
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} className="text-[#d4af37]" /> View Flacon
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Visual Showcase (Video & Photo Switcher) */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden border border-[#c5a880]/30 shadow-2xl bg-[#092219]/70 backdrop-blur-md p-2 sm:p-3">
                  {/* Mode Selector Tabs */}
                  <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/15">
                    <button
                      onClick={() => setHeroTab("photo")}
                      className={`px-3 py-1 text-xs rounded-full transition-all ${heroTab === "photo" ? "bg-[#144733] text-[#f4ede4] border border-[#c5a880]/50" : "text-white/60 hover:text-white"}`}
                    >
                      Still Life
                    </button>
                    <button
                      onClick={() => {
                        setHeroTab("video");
                        video.current?.play();
                        setPaused(false);
                      }}
                      className={`px-3 py-1 text-xs rounded-full transition-all ${heroTab === "video" ? "bg-[#144733] text-[#f4ede4] border border-[#c5a880]/50" : "text-white/60 hover:text-white"}`}
                    >
                      Film
                    </button>
                  </div>

                  {/* Main Media Window */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#04120d]">
                    {heroTab === "photo" ? (
                      <div className="w-full h-full relative group">
                        <img
                          src="/src/assets/images/hero_emerald_perfume_1791888469120.jpg"
                          alt="Artisan Scents Emerald Flacon with Jasmine on Moss Rock"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80">
                          <span className="font-serif italic text-[#d4af37]">
                            Veridian Jasmine · Eau de Parfum
                          </span>
                          <span className="uppercase tracking-widest text-[10px] text-white/60">
                            Limited Edition
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full relative">
                        <video
                          ref={video}
                          src="/videos/aurel-hero.mp4"
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        {/* Video Controls Bar */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 text-xs">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                if (video.current) {
                                  if (paused) {
                                    video.current.play();
                                    setPaused(false);
                                  } else {
                                    video.current.pause();
                                    setPaused(true);
                                  }
                                }
                              }}
                              className="text-white hover:text-[#d4af37] transition"
                              aria-label={paused ? "Play" : "Pause"}
                            >
                              {paused ? <Play size={14} /> : <Pause size={14} />}
                            </button>
                            <span className="text-white/80 font-mono text-[11px]">
                              Aurel Scent Film
                            </span>
                          </div>
                          <button
                            onClick={() => setIsMuted((m) => !m)}
                            className="text-white hover:text-[#d4af37] transition"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                          >
                            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges Strip (matching image.png) */}
            <div className="mt-14 pt-8 border-t border-[#c5a880]/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-[#0d3324] border border-[#c5a880]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#f4ede4]">
                    Premium Quality
                  </div>
                  <div className="text-[11px] text-white/60">100% Authentic Guaranteed</div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-[#0d3324] border border-[#c5a880]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#f4ede4]">
                    Long Lasting
                  </div>
                  <div className="text-[11px] text-white/60">High Extrait Concentration</div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-[#0d3324] border border-[#c5a880]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                  <Truck size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#f4ede4]">
                    Free Shipping
                  </div>
                  <div className="text-[11px] text-white/60">On Orders Above ₹999</div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-[#0d3324] border border-[#c5a880]/30 flex items-center justify-center text-[#d4af37] shrink-0">
                  <Lock size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#f4ede4]">
                    Secure Payment
                  </div>
                  <div className="text-[11px] text-white/60">Safe & Encrypted Checkout</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="collection" className="section">
          <div className="section-heading">
            <div>
              <div className="eyebrow text-muted-foreground">OUR COLLECTION</div>
              <h2 className="section-title">Five Categories of Luxury</h2>
            </div>
            <Button
              variant="editorial"
              onClick={() => {
                setFilter("All Products");
              }}
            >
              View all <ArrowRight />
            </Button>
          </div>

          <div className="collection-tabs" role="tablist" aria-label="Product category">
            {["All Products", "Perfumes", "Oils", "Car Perfumes", "Agarbatti"].map((f) => (
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
            {filtered.slice(0, 6).map((p) => (
              <article key={p.id}>
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
            ))}
          </div>
        </section>

        <section className="ritual-strip">
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
        <section className="section bg-[#051710] text-[#f4ede4] border-y border-[#c5a880]/15 py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium mb-3">
                <span className="w-5 h-[1px] bg-[#d4af37]" />
                <span>ARTISANAL PORTFOLIO</span>
                <span className="w-5 h-[1px] bg-[#d4af37]" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#f4ede4]">
                Our Product Categories
              </h2>
              <p className="text-white/70 text-sm mt-3 font-light leading-relaxed">
                Explore our distinct scent worlds, each formulated with rare botanical essences and
                presented in curated luxury green palettes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Category 1: Perfumes - Royal Emerald */}
              <a
                href="/perfumes"
                className="group relative rounded-2xl overflow-hidden border border-[#c5a880]/25 bg-gradient-to-b from-[#09261c] to-[#04140d] p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a880]/70 hover:shadow-2xl hover:shadow-[#09261c]"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#04150e]/80 border border-white/5 p-4 flex items-center justify-center mb-4">
                  <img
                    src="/assets/perfumes/Luxury Perfume Collection in Gold and Glass.png"
                    alt="Luxury Perfumes"
                    className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 text-[9px] uppercase tracking-widest text-[#d4af37] bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Extrait
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#f4ede4] group-hover:text-[#d4af37] transition-colors">
                    Perfumes
                  </h3>
                  <p className="text-xs text-white/60 mt-1 font-light">Luxury compositions</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#d4af37] font-medium pt-3 border-t border-white/10">
                    <span>Explore</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </a>

              {/* Category 2: Essence Oils - Botanical Sage & Eucalyptus Green */}
              <a
                href="/essence-oils"
                className="group relative rounded-2xl overflow-hidden border border-[#c5a880]/25 bg-gradient-to-b from-[#0e3123] to-[#061811] p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a880]/70 hover:shadow-2xl hover:shadow-[#0e3123]"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#061911]/80 border border-white/5 p-4 flex items-center justify-center mb-4">
                  <img
                    src="/assets/essence oil/Amber Rosemary Oil Bottle.png"
                    alt="Essence Oils"
                    className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 text-[9px] uppercase tracking-widest text-[#d4af37] bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    100% Pure
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#f4ede4] group-hover:text-[#d4af37] transition-colors">
                    Essence Oils
                  </h3>
                  <p className="text-xs text-white/60 mt-1 font-light">Pure botanical extracts</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#d4af37] font-medium pt-3 border-t border-white/10">
                    <span>Explore</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </a>

              {/* Category 3: Car Perfumes - Jade Cypress Green */}
              <a
                href="/car-perfumes"
                className="group relative rounded-2xl overflow-hidden border border-[#c5a880]/25 bg-gradient-to-b from-[#133729] to-[#081c15] p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a880]/70 hover:shadow-2xl hover:shadow-[#133729]"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#081d16]/80 border border-white/5 p-4 flex items-center justify-center mb-4">
                  <img
                    src="/assets/car perfume/Minimalist Hanging Green Diffuser Bottle.png"
                    alt="Car Perfumes"
                    className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 text-[9px] uppercase tracking-widest text-[#d4af37] bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Wood Cap
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#f4ede4] group-hover:text-[#d4af37] transition-colors">
                    Car Perfumes
                  </h3>
                  <p className="text-xs text-white/60 mt-1 font-light">Stylish hanging diffusers</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#d4af37] font-medium pt-3 border-t border-white/10">
                    <span>Explore</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </a>

              {/* Category 4: Agarbatti & Dhoop - Sacred Cypress & Amber Green */}
              <a
                href="/agarbatti"
                className="group relative rounded-2xl overflow-hidden border border-[#c5a880]/25 bg-gradient-to-b from-[#183d2d] to-[#0a1e16] p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a880]/70 hover:shadow-2xl hover:shadow-[#183d2d]"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#091f16]/80 border border-white/5 p-4 flex items-center justify-center mb-4">
                  <img
                    src="/assets/agarbatti/Pyramid of Premium Dhoop Sticks.png"
                    alt="Agarbatti and Dhoop"
                    className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 text-[9px] uppercase tracking-widest text-[#d4af37] bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Sacred
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#f4ede4] group-hover:text-[#d4af37] transition-colors">
                    Agarbatti
                  </h3>
                  <p className="text-xs text-white/60 mt-1 font-light">
                    Sacred handcrafted incense
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#d4af37] font-medium pt-3 border-t border-white/10">
                    <span>Explore</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </a>

              {/* Category 5: About - Heritage Velvet Forest Green */}
              <a
                href="/about"
                className="group relative rounded-2xl overflow-hidden border border-[#c5a880]/25 bg-gradient-to-b from-[#0b241a] to-[#04120d] p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a880]/70 hover:shadow-2xl hover:shadow-[#0b241a]"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#05140d]/80 border border-white/5 p-4 flex items-center justify-center mb-4">
                  <img
                    src="/src/assets/images/perfume_story_editorial_1791888489737.jpg"
                    alt="Artisan Scents Heritage & KEOMC"
                    className="w-full h-full object-cover rounded-lg filter drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 text-[9px] uppercase tracking-widest text-[#d4af37] bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Heritage
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#f4ede4] group-hover:text-[#d4af37] transition-colors">
                    Our Story
                  </h3>
                  <p className="text-xs text-white/60 mt-1 font-light">Artisan craft & KEOMC</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[#d4af37] font-medium pt-3 border-t border-white/10">
                    <span>Discover</span>
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

        {/* Editorial Story Spotlight (matching image.png bottom-left) */}
        <section className="section py-16 bg-[#071b13] text-white border-b border-[#c5a880]/15">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="relative rounded-2xl overflow-hidden border border-[#c5a880]/30 shadow-2xl bg-gradient-to-r from-[#04140d] via-[#092419] to-[#04140d]">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 z-10">
                  <div className="eyebrow text-[#d4af37] mb-3">OUR PHILOSOPHY</div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4ede4] leading-tight">
                    More Than a Fragrance
                  </h2>
                  <p className="text-[#d4af37] font-serif italic text-lg sm:text-xl mt-2 mb-4">
                    It's a feeling. A memory. A part of you.
                  </p>
                  <p className="text-white/70 text-sm sm:text-base font-light max-w-lg mb-8 leading-relaxed">
                    Every drop is formulated to resonate with emotion and presence. We blend
                    centuries-old Indian perfume traditions with modern organic distillation to
                    create perfumes that linger like poetry.
                  </p>
                  <Button
                    asChild
                    className="h-11 px-7 rounded-full bg-[#0d3324] hover:bg-[#144733] border border-[#c5a880]/50 text-[#f4ede4] font-medium tracking-wide shadow-md"
                  >
                    <a href="/about" className="inline-flex items-center gap-2">
                      Discover Our Story <ArrowRight size={15} className="text-[#d4af37]" />
                    </a>
                  </Button>
                </div>
                <div className="lg:col-span-5 h-72 lg:h-full relative overflow-hidden">
                  <img
                    src="/src/assets/images/perfume_story_editorial_1791888489737.jpg"
                    alt="Artisan Scents editorial portrait"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#092419] via-transparent to-transparent opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="maison" className="maison">
          <div className="maison-canvas">
            {mounted && (
              <Suspense fallback={null}>
                <ScentSculpture />
              </Suspense>
            )}
          </div>
          <div className="maison-copy">
            <div className="eyebrow text-gold">THE ARTISAN SCENTS MISSION</div>
            <h2 className="section-title">
              More than a fragrance.
              <br />
              <em>A way of life.</em>
            </h2>
            <p>
              At Artisan Scents, we believe that fragrance is an invisible signature—an intimate
              expression of who you are. We work with KEOMC's botanical expertise to source the
              finest aromatic plants and essential oils, crafting products that turn fleeting
              moments into lasting memories.
            </p>
            <Button variant="luxury" asChild>
              <a href="/about">
                Discover our story <ArrowRight />
              </a>
            </Button>
          </div>
          <span className="maison-caption">HANDCRAFTED SINCE INCEPTION · 100% NATURAL</span>
        </section>

        <section id="journal" className="section journal">
          <img
            src={products[0]?.image}
            alt="Premium fragrance collection"
            width={1024}
            height={1024}
            loading="lazy"
            style={{ objectFit: "contain" }}
          />
          <div>
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
      </main>
      <footer className="footer">
        <div className="footer-top">
          <div>
            <a href="#" className="wordmark">
              ARTISAN<span className="text-gold">SCENTS</span>
            </a>
            <p className="text-[11px] text-muted-foreground mt-2">
              Premium fragrances. Botanical expertise. Artisanal excellence.
            </p>
          </div>
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
        </div>
        <div className="footer-bottom">
          <span>© 2026 Artisan Scents. All rights reserved.</span>
          <span>FRAGRANCE IS PERSONAL. MAKE IT YOURS.</span>
          <span>
            <a href="/about">About</a> · <a href="#">Privacy</a>
          </span>
        </div>
      </footer>
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
