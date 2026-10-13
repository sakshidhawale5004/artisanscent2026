import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Heart, Plus, Search, ShoppingBag, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, money, type Product } from "@/lib/products";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/perfumes")({
  head: () => ({
    meta: [
      { title: "Luxury Perfumes | Artisan Scents" },
      {
        name: "description",
        content:
          "Discover our collection of luxury perfumes. Sophisticated compositions crafted for special occasions and personal wear.",
      },
    ],
  }),
  component: PerfumesPage,
});

function PerfumesPage() {
  const [selected, setSelected] = useState<Product>();
  const [bag, setBag] = useState<Record<string, number>>({});
  const [panel, setPanel] = useState<"bag" | "search" | null>(null);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  const perfumes = products.filter((p) => p.category === "perfumes");
  const close = () => {
    setPanel(null);
    setSelected(undefined);
  };
  const totalItems = Object.values(bag).reduce((a, b) => a + b, 0);
  const total = products.reduce((sum, p) => sum + p.price * (bag[p.id] || 0), 0);

  const add = (p: Product) => {
    setBag((old) => ({ ...old, [p.id]: (old[p.id] || 0) + 1 }));
    setSelected(undefined);
    setPanel("bag");
  };
  const update = (id: string, amount: number) =>
    setBag((old) => ({ ...old, [id]: Math.max(0, (old[id] || 0) + amount) }));
  const toggleSaved = (id: string) =>
    setSaved((old) => (old.includes(id) ? old.filter((x) => x !== id) : [...old, id]));

  return (
    <>
      <div className="announcement">
        Luxury Fragrances. Premium Expressions. <span className="ml-3">✦</span>
      </div>
      <Header
        currentPage="Shop"
        onSearchClick={() => setPanel("search")}
        onBagClick={() => setPanel("bag")}
        totalItems={totalItems}
      />

      <main className="bg-[#061710] text-[#f4ede4] min-h-screen">
        {/* Category Hero Banner */}
        <section className="relative overflow-hidden border-b border-[#c5a880]/20 py-16 px-6 sm:px-12 bg-gradient-to-b from-[#082016] via-[#0b291d] to-[#061710]">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>SHOP</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#f4ede4]">
              Discover Your
              <br />
              <em className="text-[#d4af37] font-serif italic">Signature Scent</em>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/70 font-light max-w-xl leading-relaxed">
              Explore our curated collection of luxury perfumes, crafted for every mood, every
              moment. Hand-blended with high-concentration essential essences.
            </p>
          </div>
        </section>

        {/* Filter Bar & Controls */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Floral", "Woody", "Amber", "Oriental"].map((mood) => (
              <button
                key={mood}
                onClick={() => setQuery(mood === "All" ? "" : mood)}
                className={`px-4 py-1.5 text-xs rounded-full border transition-all ${
                  (mood === "All" && !query) || query === mood
                    ? "bg-[#144733] border-[#c5a880]/60 text-[#f4ede4] shadow-md"
                    : "border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-white/30"
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
          <div className="text-xs text-white/60 font-light">
            Showing <span className="text-[#d4af37] font-medium">{perfumes.length}</span> luxury
            fragrances
          </div>
        </div>

        {/* Product Grid - Deep Royal Emerald Palette */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {perfumes
              .filter((p) =>
                query
                  ? p.notes.toLowerCase().includes(query.toLowerCase()) ||
                    p.family.toLowerCase().includes(query.toLowerCase())
                  : true,
              )
              .map((p) => (
                <article
                  key={p.id}
                  className="group rounded-2xl overflow-hidden border border-[#c5a880]/25 bg-gradient-to-b from-[#09261c] to-[#04140d] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a880]/70 hover:shadow-2xl hover:shadow-[#09261c]"
                >
                  <div className="relative aspect-square w-full p-6 flex items-center justify-center bg-[#05160f]/90 border-b border-white/5">
                    <a
                      href={`/products/${p.id}`}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={p.image}
                        alt={`${p.name} perfume bottle`}
                        width={600}
                        height={600}
                        loading="lazy"
                        className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                      />
                    </a>
                    <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest text-[#d4af37] bg-black/60 px-2.5 py-0.5 rounded-full border border-[#c5a880]/30 backdrop-blur-sm">
                      {p.badge}
                    </span>
                    <button
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 border border-white/15 flex items-center justify-center text-white/80 hover:text-[#d4af37] transition"
                      aria-label={`${saved.includes(p.id) ? "Unsave" : "Save"} ${p.name}`}
                      onClick={() => toggleSaved(p.id)}
                    >
                      <Heart
                        size={15}
                        fill={saved.includes(p.id) ? "#d4af37" : "none"}
                        className={saved.includes(p.id) ? "text-[#d4af37]" : ""}
                      />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[#d4af37] text-xs mb-1.5">
                        {"★★★★★"}
                        <span className="text-[11px] text-white/50 ml-1 font-light">(124)</span>
                      </div>
                      <a
                        href={`/products/${p.id}`}
                        className="font-display text-lg text-[#f4ede4] group-hover:text-[#d4af37] transition-colors block"
                      >
                        {p.name}
                      </a>
                      <p className="text-xs text-white/60 line-clamp-1 mt-1 font-light">
                        {p.notes}
                      </p>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                        Eau de Parfum · 50ml
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-base font-semibold text-[#f4ede4]">
                        {money(p.price)}
                      </span>
                      <Button
                        size="sm"
                        className="h-9 px-4 rounded-full bg-[#144733] hover:bg-[#1a573f] text-[#f4ede4] border border-[#c5a880]/40 text-xs font-medium"
                        onClick={() => add(p)}
                      >
                        Add to Cart <Plus size={13} className="ml-1 text-[#d4af37]" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
          </div>

          {/* Exclusive Collection Banner (matching image.png middle pane bottom) */}
          <div className="mt-16 rounded-2xl overflow-hidden border border-[#c5a880]/30 shadow-2xl bg-gradient-to-r from-[#04140d] via-[#09291e] to-[#04140d]">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="md:col-span-7 p-8 sm:p-12">
                <div className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium mb-2">
                  LIMITED BATCH
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-[#f4ede4]">
                  Exclusive Collection
                </h3>
                <p className="text-white/70 text-sm font-light mt-2 max-w-md">
                  Rare single-harvest oud, Mysore sandalwood, and Damask rose essences reserved for
                  discerning connoisseurs.
                </p>
                <div className="mt-6">
                  <Button
                    asChild
                    className="h-10 px-6 rounded-full bg-[#0d3324] hover:bg-[#144733] text-white border border-[#c5a880]/50 text-xs"
                  >
                    <a href="/products/gold-faceted">Shop Exclusive →</a>
                  </Button>
                </div>
              </div>
              <div className="md:col-span-5 h-60 md:h-full relative overflow-hidden">
                <img
                  src="/src/assets/images/exclusive_fragrance_card_1791888515789.jpg"
                  alt="Exclusive Perfume Bottle"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Shop by Mood (matching image.png middle pane) */}
          <div className="mt-16">
            <div className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium mb-1">
              CURATED EXPERIENCES
            </div>
            <h3 className="font-display text-2xl text-[#f4ede4] mb-6">Shop by Mood</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Romantic & Sensual",
                  notes: "Rose & Amber",
                  bg: "from-[#1b2b22] to-[#091b13]",
                },
                {
                  title: "Fresh & Energetic",
                  notes: "Bergamot & Mint",
                  bg: "from-[#153427] to-[#082016]",
                },
                {
                  title: "Calm & Relaxed",
                  notes: "Lavender & Woods",
                  bg: "from-[#193b2d] to-[#0a2419]",
                },
                {
                  title: "Bold & Confident",
                  notes: "Smoky Oud & Leather",
                  bg: "from-[#1a2e23] to-[#081811]",
                },
              ].map((mood) => (
                <button
                  key={mood.title}
                  onClick={() => setQuery(mood.notes.split(" ")[0] || "")}
                  className={`p-5 rounded-xl border border-[#c5a880]/20 bg-gradient-to-br ${mood.bg} text-left transition hover:border-[#c5a880]/60 hover:-translate-y-1`}
                >
                  <div className="font-display text-base text-[#f4ede4] font-medium">
                    {mood.title}
                  </div>
                  <div className="text-xs text-[#d4af37] mt-1 font-light">{mood.notes}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" style={{ marginTop: "70px" }}>
        <div className="footer-top">
          <div>
            <a href="/" className="wordmark">
              ARTISAN<span className="text-gold">SCENTS</span>
            </a>
            <p className="text-[11px] text-muted-foreground mt-2">
              Luxury fragrances. Premium expressions.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Artisan Scents. All rights reserved.</span>
        </div>
      </footer>

      {(selected || panel) && (
        <div className={`overlay ${panel === "bag" ? "bag-overlay" : ""}`} onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            className={`dialog ${panel === "bag" ? "bag-panel" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dialog-header">
              <h2 className="font-display text-3xl">
                {selected
                  ? selected.name
                  : panel === "bag"
                    ? `Your bag (${totalItems})`
                    : "Search fragrances"}
              </h2>
              <Button variant="ghost" size="icon" aria-label="Close" autoFocus onClick={close}>
                <X />
              </Button>
            </div>

            {selected && (
              <div className="detail-grid">
                <img src={selected.image} alt={selected.name} style={{ objectFit: "contain" }} />
                <div>
                  <div className="eyebrow text-muted-foreground">Luxury · Eau de parfum</div>
                  <h3 className="section-title">{selected.name}</h3>
                  <p className="text-sm leading-7 my-5">{selected.description}</p>
                  <p className="product-notes">{selected.notes}</p>
                  <p className="text-sm my-5">100 ml · {money(selected.price)}</p>
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
                      <h3 className="font-display text-3xl">Your bag is empty</h3>
                      <p className="status-note my-4">Start building your collection</p>
                      <Button variant="editorial" onClick={close}>
                        Continue shopping <ArrowRight />
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
                            <p className="product-notes">{p.category}</p>
                            <div className="quantity">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => update(p.id, -1)}
                              >
                                <Plus size={14} className="rotate-45" />
                              </Button>
                              <span className="text-xs">{bag[p.id]}</span>
                              <Button variant="outline" size="icon" onClick={() => update(p.id, 1)}>
                                <Plus size={14} />
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
                    <Button className="w-full h-12">
                      Continue to checkout <ArrowRight />
                    </Button>
                  </div>
                )}
              </>
            )}

            {panel === "search" && (
              <>
                <input
                  className="search-input"
                  placeholder="Search by fragrance name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="search-results">
                  {perfumes
                    .filter((p) =>
                      `${p.name} ${p.notes}`.toLowerCase().includes(query.toLowerCase()),
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
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
