import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Heart, Plus, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, money, type Product } from "@/lib/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/agarbatti")({
  head: () => ({
    meta: [
      { title: "Premium Agarbatti & Incense Sticks | Artisan Scents" },
      {
        name: "description",
        content:
          "Discover our collection of handcrafted agarbatti and incense sticks inspired by Indian traditions. Perfect for prayer and meditation.",
      },
    ],
  }),
  component: AgarbattiPage,
});

function AgarbattiPage() {
  const [selected, setSelected] = useState<Product>();
  const [bag, setBag] = useState<Record<string, number>>({});
  const [panel, setPanel] = useState<"bag" | "search" | null>(null);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  const agarbatti = products.filter((p) => p.category === "agarbatti");
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
        Handcrafted Incense · Traditional Rituals · Sacred Ambience <span className="ml-3">✦</span>
      </div>
      <Header
        currentPage="Shop"
        onSearchClick={() => setPanel("search")}
        onBagClick={() => setPanel("bag")}
        totalItems={totalItems}
      />

      <main className="bg-[#f8f6f3] text-[#333333] min-h-screen">
        {/* Category Hero Banner - Sacred Cypress & Amber Earth Green */}
        <section className="relative overflow-hidden border-b border-[#1b5e3f]/12 py-20 px-6 sm:px-12 bg-[#f8f6f3]">
          {/* Unsplash Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=2400&q=85"
              alt="Incense & Agarbatti Background"
              className="w-full h-full object-cover scale-105"
            />
            {/* Dark Overlay for text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f8f6f3]/95 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>SACRED COLLECTION</span>
            </div>
            <h1 className="reveal-on-scroll reveal-delay-100 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#333333]">
              Sacred Aromas &
              <br />
              <em className="text-[#1b5e3f] font-serif italic">Temple Incense</em>
            </h1>
            <p className="reveal-on-scroll reveal-delay-200 mt-4 text-sm sm:text-base text-[#666666] font-light max-w-xl leading-relaxed">
              Handcrafted agarbatti and pyramid dhoop sticks steeped in Vedic botanical
              formulations. Pure bamboo-core and charcoal-free natural incense for prayer,
              meditation, and tranquility.
            </p>
          </div>
        </section>

        {/* Product Grid - Sacred Cypress Green Cards */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {agarbatti.map((p, idx) => {
              const delayClass =
                idx % 3 === 0
                  ? "reveal-delay-50"
                  : idx % 3 === 1
                    ? "reveal-delay-150"
                    : "reveal-delay-250";
              return (
                <article
                  key={p.id}
                  className={`reveal-on-scroll ${delayClass} group rounded-2xl overflow-hidden border border-[#1b5e3f]/15 bg-gradient-to-b from-[#baafa4] to-[#f9f8f6] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/70 hover:shadow-2xl hover:shadow-[#ddd]`}
                >
                  <div className="relative aspect-square w-full p-8 flex items-center justify-center bg-[#1c1a17]/90 border-b border-[#e0e0e0]">
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
                    <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest text-[#1b5e3f] bg-black/60 px-2.5 py-0.5 rounded-full border border-[#d4af37]/30 backdrop-blur-sm">
                      {p.badge}
                    </span>
                    <button
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 border border-white/15 flex items-center justify-center text-[#444444] hover:text-[#1b5e3f] transition"
                      aria-label={`${saved.includes(p.id) ? "Unsave" : "Save"} ${p.name}`}
                      onClick={() => toggleSaved(p.id)}
                    >
                      <Heart
                        size={15}
                        fill={saved.includes(p.id) ? "#d4af37" : "none"}
                        className={saved.includes(p.id) ? "text-[#1b5e3f]" : ""}
                      />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[#1b5e3f] text-xs mb-1.5">
                        {"★★★★★"}
                        <span className="text-[11px] text-white/50 ml-1 font-light">(116)</span>
                      </div>
                      <a
                        href={`/products/${p.id}`}
                        className="font-display text-lg text-[#333333] group-hover:text-[#1b5e3f] transition-colors block"
                      >
                        {p.name}
                      </a>
                      <p className="text-xs text-[#777777] line-clamp-1 mt-1 font-light">
                        {p.notes}
                      </p>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                        {p.size || "100 Sticks"} · Charcoal-Free
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-base font-semibold text-[#333333]">
                        {money(p.price)}
                      </span>
                      <Button
                        size="sm"
                        className="h-9 px-4 rounded-full bg-[#1b5e3f] hover:bg-[#164a31] text-[#333333] border border-[#d4af37]/40 text-xs font-medium"
                        onClick={() => add(p)}
                      >
                        Add to Cart <Plus size={13} className="ml-1 text-[#1b5e3f]" />
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title mb-8 reveal-on-scroll">How to Use Agarbatti</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="reveal-on-scroll reveal-delay-100 bg-white/5 p-6 rounded-lg border border-[#1b5e3f]/12">
              <h3 className="font-display text-lg mb-2 text-[#333333]">🙏 Spiritual Rituals</h3>
              <p className="text-sm text-[#666666]">
                Ideal for prayer spaces and meditation rooms. Light before your spiritual practice.
              </p>
            </div>
            <div className="reveal-on-scroll reveal-delay-200 bg-white/5 p-6 rounded-lg border border-[#1b5e3f]/12">
              <h3 className="font-display text-lg mb-2 text-[#333333]">🏠 Home Ambience</h3>
              <p className="text-sm text-[#666666]">
                Create a welcoming atmosphere in any room. Perfect for creating a peaceful
                sanctuary.
              </p>
            </div>
            <div className="reveal-on-scroll reveal-delay-300 bg-white/5 p-6 rounded-lg border border-[#1b5e3f]/12">
              <h3 className="font-display text-lg mb-2 text-[#333333]">🌿 Natural & Pure</h3>
              <p className="text-sm text-[#666666]">
                Handcrafted from natural ingredients. No synthetic fragrances or harmful chemicals.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer tagline="Sacred incense and agarbatti." />

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
                  <div className="eyebrow text-muted-foreground">Handcrafted · {selected.size}</div>
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
                  {agarbatti
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





