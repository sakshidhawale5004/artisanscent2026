import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Heart, Plus, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, money, type Product } from "@/lib/products";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/car-perfumes")({
  head: () => ({
    meta: [
      { title: "Car Perfumes & Diffusers | Artisan Scents" },
      {
        name: "description",
        content:
          "Elevate your driving experience with stylish car perfumes and diffusers. Fresh, woody, and sophisticated fragrances.",
      },
    ],
  }),
  component: CarPerfumesPage,
});

function CarPerfumesPage() {
  const [selected, setSelected] = useState<Product>();
  const [bag, setBag] = useState<Record<string, number>>({});
  const [panel, setPanel] = useState<"bag" | "search" | null>(null);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  const carPerfumes = products.filter((p) => p.category === "car-perfumes");
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
        Premium Automotive Fragrance · Stylish Design · Lasting Aroma{" "}
        <span className="ml-3">✦</span>
      </div>
      <Header
        currentPage="Shop"
        onSearchClick={() => setPanel("search")}
        onBagClick={() => setPanel("bag")}
        totalItems={totalItems}
      />

      <main className="bg-[#081e17] text-[#f4ede4] min-h-screen">
        {/* Category Hero Banner - Modern Jade & Cypress Velvet Green */}
        <section className="relative overflow-hidden border-b border-[#c5a880]/20 py-16 px-6 sm:px-12 bg-gradient-to-b from-[#0e3124] via-[#123d2d] to-[#081e17]">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>AUTOMOTIVE COLLECTION</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#f4ede4]">
              Elevate Your
              <br />
              <em className="text-[#8cd1b0] font-serif italic">Driving Atmosphere</em>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/70 font-light max-w-xl leading-relaxed">
              Refined car diffusers and wooden bottle flacons designed to transform your vehicle's
              interior into a calm botanical sanctuary.
            </p>
          </div>
        </section>

        {/* Product Grid - Modern Jade Green Cards */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {carPerfumes.map((p) => (
              <article
                key={p.id}
                className="group rounded-2xl overflow-hidden border border-[#c5a880]/25 bg-gradient-to-b from-[#11382a] to-[#071912] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#8cd1b0]/70 hover:shadow-2xl hover:shadow-[#11382a]"
              >
                <div className="relative aspect-square w-full p-8 flex items-center justify-center bg-[#09221a]/90 border-b border-white/5">
                  <a
                    href={`/products/${p.id}`}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      width={600}
                      height={600}
                      loading="lazy"
                      className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </a>
                  <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest text-[#8cd1b0] bg-black/60 px-2.5 py-0.5 rounded-full border border-[#8cd1b0]/30 backdrop-blur-sm">
                    {p.badge}
                  </span>
                  <button
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 border border-white/15 flex items-center justify-center text-white/80 hover:text-[#8cd1b0] transition"
                    aria-label={`${saved.includes(p.id) ? "Unsave" : "Save"} ${p.name}`}
                    onClick={() => toggleSaved(p.id)}
                  >
                    <Heart
                      size={15}
                      fill={saved.includes(p.id) ? "#8cd1b0" : "none"}
                      className={saved.includes(p.id) ? "text-[#8cd1b0]" : ""}
                    />
                  </button>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[#d4af37] text-xs mb-1.5">
                      {"★★★★★"}
                      <span className="text-[11px] text-white/50 ml-1 font-light">(82)</span>
                    </div>
                    <a
                      href={`/products/${p.id}`}
                      className="font-display text-lg text-[#f4ede4] group-hover:text-[#8cd1b0] transition-colors block"
                    >
                      {p.name}
                    </a>
                    <p className="text-xs text-white/60 line-clamp-1 mt-1 font-light">{p.notes}</p>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                      {p.size || "Hanging Wooden Cap"} · 60-Day Scent
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-base font-semibold text-[#f4ede4]">
                      {money(p.price)}
                    </span>
                    <Button
                      size="sm"
                      className="h-9 px-4 rounded-full bg-[#144733] hover:bg-[#1a573f] text-[#f4ede4] border border-[#8cd1b0]/40 text-xs font-medium"
                      onClick={() => add(p)}
                    >
                      Add to Cart <Plus size={13} className="ml-1 text-[#8cd1b0]" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section bg-blue-50">
          <h2 className="section-title mb-8">Why Choose Artisan Car Perfumes?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-blue-200">
              <h3 className="font-display text-lg mb-2">🎨 Stylish Design</h3>
              <p className="text-sm text-muted-foreground">
                Compact and beautiful diffuser formats that complement any vehicle interior
                aesthetic.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-blue-200">
              <h3 className="font-display text-lg mb-2">⏱️ Long-Lasting</h3>
              <p className="text-sm text-muted-foreground">
                Premium fragrance formulations provide continuous aroma for weeks of driving
                pleasure.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-blue-200">
              <h3 className="font-display text-lg mb-2">🌿 Natural Ingredients</h3>
              <p className="text-sm text-muted-foreground">
                Crafted from natural aromatic essences and botanical extracts.
              </p>
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
            <p className="text-[11px] text-muted-foreground mt-2">Premium automotive fragrances.</p>
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
                {selected ? selected.name : panel === "bag" ? `Your bag (${totalItems})` : "Search"}
              </h2>
              <Button variant="ghost" size="icon" autoFocus onClick={close}>
                <X />
              </Button>
            </div>

            {selected && (
              <div className="detail-grid">
                <img src={selected.image} alt={selected.name} style={{ objectFit: "contain" }} />
                <div>
                  <div className="eyebrow text-muted-foreground">Automotive · {selected.size}</div>
                  <h3 className="section-title">{selected.name}</h3>
                  <p className="text-sm leading-7 my-5">{selected.description}</p>
                  <p className="product-notes">{selected.notes}</p>
                  <p className="text-sm my-5">{money(selected.price)}</p>
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
                  placeholder="Search by product name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="search-results">
                  {carPerfumes
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
                          <h3 className="font-display text-lg">{p.name}</h3>
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
