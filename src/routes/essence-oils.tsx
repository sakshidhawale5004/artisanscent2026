import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Heart, Plus, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, money, type Product } from "@/lib/products";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/essence-oils")({
  head: () => ({
    meta: [
      { title: "Premium Essence Oils | Artisan Scents" },
      {
        name: "description",
        content:
          "Discover our collection of pure essence oils. Sourced from aromatic plants using traditional steam distillation methods.",
      },
    ],
  }),
  component: EssenceOilsPage,
});

function EssenceOilsPage() {
  const [selected, setSelected] = useState<Product>();
  const [bag, setBag] = useState<Record<string, number>>({});
  const [panel, setPanel] = useState<"bag" | "search" | null>(null);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  const essenceOils = products.filter((p) => p.category === "essence-oils");
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
        Pure · Natural · Therapeutic Grade Essential Oils <span className="ml-3">✦</span>
      </div>
      <Header
        currentPage="Shop"
        onSearchClick={() => setPanel("search")}
        onBagClick={() => setPanel("bag")}
        totalItems={totalItems}
      />

      <main className="bg-[#071d15] text-[#f4ede4] min-h-screen">
        {/* Category Hero Banner - Botanical Eucalyptus & Sage Green */}
        <section className="relative overflow-hidden border-b border-[#c5a880]/20 py-16 px-6 sm:px-12 bg-gradient-to-b from-[#0c2e21] via-[#103a2a] to-[#071d15]">
          <div className="max-w-7xl mx-auto">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>BOTANICAL COLLECTION</span>
            </div>
            <h1 className="reveal-on-scroll reveal-delay-100 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#f4ede4]">
              Pure Essential
              <br />
              <em className="text-[#a4d4b4] font-serif italic">Oils & Essences</em>
            </h1>
            <p className="reveal-on-scroll reveal-delay-200 mt-4 text-sm sm:text-base text-white/70 font-light max-w-xl leading-relaxed">
              Pure aromatic extracts from the world's finest medicinal flora. Sourced with KEOMC
              botanical stewardship, steam-distilled traditionally, and bottled unadulterated.
            </p>
          </div>
        </section>

        {/* Botanical Highlights Pill Bar */}
        <div className="reveal-fade max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            {["All Essences", "Lavender", "Rosemary", "Patchouli", "Lemongrass", "Mint"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag === "All Essences" ? "" : tag)}
                  className={`px-4 py-1.5 text-xs rounded-full border transition-all ${
                    (tag === "All Essences" && !query) || query === tag
                      ? "bg-[#144733] border-[#a4d4b4]/60 text-[#f4ede4] shadow-md"
                      : "border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-white/30"
                  }`}
                >
                  {tag}
                </button>
              ),
            )}
          </div>
          <div className="text-xs text-white/60 font-light">
            Therapeutic Grade ·{" "}
            <span className="text-[#a4d4b4] font-medium">100% Pure Distillates</span>
          </div>
        </div>

        {/* Product Grid - Botanical Herbal Green Cards */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {essenceOils
              .filter((p) =>
                query
                  ? p.name.toLowerCase().includes(query.toLowerCase()) ||
                    p.notes.toLowerCase().includes(query.toLowerCase())
                  : true,
              )
              .map((p, idx) => {
                const delayClass =
                  idx % 4 === 0
                    ? "reveal-delay-50"
                    : idx % 4 === 1
                      ? "reveal-delay-150"
                      : idx % 4 === 2
                        ? "reveal-delay-250"
                        : "reveal-delay-350";
                return (
                  <article
                    key={p.id}
                    className={`reveal-on-scroll ${delayClass} group rounded-2xl overflow-hidden border border-[#c5a880]/25 bg-gradient-to-b from-[#0e3123] to-[#061811] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#a4d4b4]/70 hover:shadow-2xl hover:shadow-[#0e3123]`}
                  >
                    <div className="relative aspect-square w-full p-6 flex items-center justify-center bg-[#071d15]/90 border-b border-white/5">
                      <a
                        href={`/products/${p.id}`}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <img
                          src={p.image}
                          alt={`${p.name} bottle`}
                          width={600}
                          height={600}
                          loading="lazy"
                          className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                        />
                      </a>
                      <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest text-[#a4d4b4] bg-black/60 px-2.5 py-0.5 rounded-full border border-[#a4d4b4]/30 backdrop-blur-sm">
                        {p.badge}
                      </span>
                      <button
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 border border-white/15 flex items-center justify-center text-white/80 hover:text-[#a4d4b4] transition"
                        aria-label={`${saved.includes(p.id) ? "Unsave" : "Save"} ${p.name}`}
                        onClick={() => toggleSaved(p.id)}
                      >
                        <Heart
                          size={15}
                          fill={saved.includes(p.id) ? "#a4d4b4" : "none"}
                          className={saved.includes(p.id) ? "text-[#a4d4b4]" : ""}
                        />
                      </button>
                    </div>

                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-[#d4af37] text-xs mb-1.5">
                          {"★★★★★"}
                          <span className="text-[11px] text-white/50 ml-1 font-light">(98)</span>
                        </div>
                        <a
                          href={`/products/${p.id}`}
                          className="font-display text-lg text-[#f4ede4] group-hover:text-[#a4d4b4] transition-colors block"
                        >
                          {p.name}
                        </a>
                        {p.botanicalName && (
                          <p className="text-[11px] text-[#a4d4b4] italic mt-0.5 font-serif">
                            {p.botanicalName}
                          </p>
                        )}
                        <p className="text-xs text-white/60 line-clamp-1 mt-1 font-light">
                          {p.notes}
                        </p>
                        <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                          {p.size || "100 ml"} · Pure Extract
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="font-mono text-base font-semibold text-[#f4ede4]">
                          {money(p.price)}
                        </span>
                        <Button
                          size="sm"
                          className="h-9 px-4 rounded-full bg-[#144733] hover:bg-[#1a573f] text-[#f4ede4] border border-[#a4d4b4]/40 text-xs font-medium"
                          onClick={() => add(p)}
                        >
                          Add to Cart <Plus size={13} className="ml-1 text-[#a4d4b4]" />
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
          </div>

          {/* Educational Distillation Banner */}
          <div className="reveal-on-scroll reveal-slow mt-16 rounded-2xl overflow-hidden border border-[#c5a880]/30 shadow-2xl bg-gradient-to-r from-[#061c14] via-[#0f382a] to-[#061c14] p-8 sm:p-12">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium mb-2">
                KEOMC BOTANICAL LABS
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#f4ede4]">
                Steam Distillation Craft
              </h3>
              <p className="text-white/70 text-sm font-light mt-2 leading-relaxed">
                Extracted in small copper stills at low thermal thresholds to safeguard fragile
                monoterpenes and volatile aromatic rings. Available in 10ml amber bottles, 100ml,
                500ml, and bulk 1L quantities.
              </p>
            </div>
          </div>
        </section>

        <section className="section bg-green-50">
          <h2 className="section-title mb-8 reveal-on-scroll">Sample Pack Options</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="reveal-on-scroll reveal-delay-100 bg-white p-6 rounded-lg border border-green-200">
              <h3 className="font-display text-xl mb-2">Starter Sample Kit</h3>
              <p className="text-sm mb-3">5 Oils × 5 ml each</p>
              <p className="text-2xl font-bold text-green-700">₹999</p>
            </div>
            <div className="reveal-on-scroll reveal-delay-200 bg-white p-6 rounded-lg border border-green-200">
              <h3 className="font-display text-xl mb-2">Professional Sample Kit</h3>
              <p className="text-sm mb-3">10 Oils × 5 ml each</p>
              <p className="text-2xl font-bold text-green-700">₹1,799</p>
            </div>
            <div className="reveal-on-scroll reveal-delay-300 bg-white p-6 rounded-lg border border-green-200">
              <h3 className="font-display text-xl mb-2">Premium Perfumery Kit</h3>
              <p className="text-sm mb-3">5 Premium Oils</p>
              <p className="text-2xl font-bold text-green-700">₹2,499</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" style={{ marginTop: "70px" }}>
        <div className="footer-top reveal-on-scroll">
          <div>
            <a href="/" className="wordmark">
              ARTISAN<span className="text-gold">SCENTS</span>
            </a>
            <p className="text-[11px] text-muted-foreground mt-2">Pure natural therapeutic oils.</p>
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
                    : "Search oils"}
              </h2>
              <Button variant="ghost" size="icon" autoFocus onClick={close}>
                <X />
              </Button>
            </div>

            {selected && (
              <div className="detail-grid">
                <img src={selected.image} alt={selected.name} style={{ objectFit: "contain" }} />
                <div>
                  <div className="eyebrow text-muted-foreground">{selected.botanicalName}</div>
                  <h3 className="section-title">{selected.name}</h3>
                  <p className="text-sm leading-7 my-5">{selected.description}</p>
                  <p className="product-notes">{selected.notes}</p>
                  <p className="text-sm my-5">
                    {selected.size || "10 ml"} · {money(selected.price)}
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
                      <h3 className="font-display text-3xl">Your bag is empty</h3>
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
                              <h3 className="font-display text-lg">{p.name}</h3>
                              <span className="text-xs">{money(p.price * (bag[p.id] || 0))}</span>
                            </div>
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
                  placeholder="Search by oil name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="search-results">
                  {essenceOils
                    .filter((p) =>
                      `${p.name} ${p.botanicalName}`.toLowerCase().includes(query.toLowerCase()),
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
                          <h3 className="font-display text-lg">{p.name}</h3>
                          <p className="product-notes text-xs">{p.botanicalName}</p>
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
