import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Heart, Plus, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, money, type Product } from "@/lib/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/soaps")({
  head: () => ({
    meta: [
      { title: "Handcrafted Soaps | Artisan Scents" },
      {
        name: "description",
        content:
          "Discover Artisan Scents handcrafted soaps. Botanical bathing bars enriched with pure essential oils for a soft, fragrant cleanse.",
      },
    ],
  }),
  component: SoapsPage,
});

function SoapsPage() {
  const [selected, setSelected] = useState<Product>();
  const [bag, setBag] = useState<Record<string, number>>({});
  const [panel, setPanel] = useState<"bag" | "search" | null>(null);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  const soaps = products.filter((p) => p.category === "soaps");
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
        Botanical Bathing Bars · Cold-Processed · Pure Essential Oils{" "}
        <span className="ml-3">✦</span>
      </div>
      <Header
        currentPage="Shop"
        onSearchClick={() => setPanel("search")}
        onBagClick={() => setPanel("bag")}
        totalItems={totalItems}
      />

      <main className="bg-[#171513] text-[#f4ede4] min-h-screen">
        {/* Category Hero Banner */}
        <section className="relative overflow-hidden border-b border-[#2d8659]/20 py-16 px-6 sm:px-12 bg-gradient-to-b from-[#211e1b] via-[#26221e] to-[#171513]">
          <div className="max-w-7xl mx-auto">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c4f0db] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>PERSONAL CARE</span>
            </div>
            <h1 className="reveal-on-scroll reveal-delay-100 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#f4ede4]">
              Handcrafted
              <br />
              <em className="text-[#c4f0db] font-serif italic">Artisan Soaps</em>
            </h1>
            <p className="reveal-on-scroll reveal-delay-200 mt-4 text-sm sm:text-base text-white/70 font-light max-w-xl leading-relaxed">
              Cold-processed bathing bars enriched with pure botanical essential oils. Gentle on the
              skin, generous in lather, and quietly luxurious in fragrance.
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {soaps.map((p, idx) => {
              const delayClass =
                idx % 3 === 0
                  ? "reveal-delay-50"
                  : idx % 3 === 1
                    ? "reveal-delay-150"
                    : "reveal-delay-250";
              return (
                <article
                  key={p.id}
                  className={`reveal-on-scroll ${delayClass} group rounded-2xl overflow-hidden border border-[#2d8659]/25 bg-gradient-to-b from-[#242019] to-[#131110] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#2d8659]/70 hover:shadow-2xl hover:shadow-[#242019]`}
                >
                  <div className="relative aspect-square w-full p-8 flex items-center justify-center bg-[#1a1816]/90 border-b border-white/5">
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
                    <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest text-[#c4f0db] bg-black/60 px-2.5 py-0.5 rounded-full border border-[#d4af37]/30 backdrop-blur-sm">
                      {p.badge}
                    </span>
                    <button
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 border border-white/15 flex items-center justify-center text-white/80 hover:text-[#c4f0db] transition"
                      aria-label={`${saved.includes(p.id) ? "Unsave" : "Save"} ${p.name}`}
                      onClick={() => toggleSaved(p.id)}
                    >
                      <Heart
                        size={15}
                        fill={saved.includes(p.id) ? "#d4af37" : "none"}
                        className={saved.includes(p.id) ? "text-[#c4f0db]" : ""}
                      />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[#c4f0db] text-xs mb-1.5">
                        {"★★★★★"}
                        <span className="text-[11px] text-white/50 ml-1 font-light">(87)</span>
                      </div>
                      <a
                        href={`/products/${p.id}`}
                        className="font-display text-lg text-[#f4ede4] group-hover:text-[#c4f0db] transition-colors block"
                      >
                        {p.name}
                      </a>
                      <p className="text-xs text-white/60 line-clamp-1 mt-1 font-light">
                        {p.notes}
                      </p>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                        {p.size || "100 g"} · Cold Process
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-base font-semibold text-[#f4ede4]">
                        {money(p.price)}
                      </span>
                      <Button
                        size="sm"
                        className="h-9 px-4 rounded-full bg-[#1b5e3f] hover:bg-[#164a31] text-[#f4ede4] border border-[#d4af37]/40 text-xs font-medium"
                        onClick={() => add(p)}
                      >
                        Add to Cart <Plus size={13} className="ml-1 text-[#c4f0db]" />
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title mb-8 reveal-on-scroll">The Craft of Cold-Process</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="reveal-on-scroll reveal-delay-100 bg-white/5 p-6 rounded-lg border border-[#2d8659]/20">
              <h3 className="font-display text-lg mb-2 text-[#f4ede4]">🌿 Pure Botanicals</h3>
              <p className="text-sm text-white/70">
                Formulated with plant-derived butters and pure essential oils — no harsh synthetic
                lathering agents.
              </p>
            </div>
            <div className="reveal-on-scroll reveal-delay-200 bg-white/5 p-6 rounded-lg border border-[#2d8659]/20">
              <h3 className="font-display text-lg mb-2 text-[#f4ede4]">🤲 Hand-Poured</h3>
              <p className="text-sm text-white/70">
                Each bar is cured slowly in small batches, preserving the integrity of every
                fragrance note.
              </p>
            </div>
            <div className="reveal-on-scroll reveal-delay-300 bg-white/5 p-6 rounded-lg border border-[#2d8659]/20">
              <h3 className="font-display text-lg mb-2 text-[#f4ede4]">✦ Skin Kind</h3>
              <p className="text-sm text-white/70">
                Creamy, balanced lather that cleanses gently and leaves a soft, lingering scent.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer tagline="Handcrafted botanical soaps." />

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
                  <div className="eyebrow text-muted-foreground">
                    Personal Care · {selected.size}
                  </div>
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
                  {soaps
                    .filter((p) => `${p.name} ${p.notes}`.toLowerCase().includes(query.toLowerCase()))
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

