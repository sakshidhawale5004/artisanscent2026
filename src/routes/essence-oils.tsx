import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Heart, Plus, Search, ShoppingBag, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts, money, type Product } from "@/lib/products";
import { useWishlist, useShoppingBag } from "@/lib/store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
  const allProducts = useProducts();
  const { saved, toggleSaved, isSaved, wishlistCount } = useWishlist();
  const { bag, addToBag, updateQty: update, totalItems } = useShoppingBag();

  const [selected, setSelected] = useState<Product>();
  const [panel, setPanel] = useState<"bag" | "search" | null>(null);
  const [query, setQuery] = useState("");

  const essenceOils = allProducts.filter((p) => p.category === "essence-oils");
  const close = () => {
    setPanel(null);
    setSelected(undefined);
  };
  const total = allProducts.reduce((sum, p) => sum + p.price * (bag[p.id] || 0), 0);

  const add = (p: Product) => {
    addToBag(p.id, 1);
    setSelected(undefined);
    setPanel("bag");
  };

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
        wishlistCount={wishlistCount}
      />

      <main className="bg-[#fafaf8] text-[#333333] min-h-screen">
        {/* Category Hero Banner - Botanical Eucalyptus & Sage Green */}
        <section className="relative overflow-hidden border-b border-[#1b5e3f]/15 py-20 px-6 sm:px-12 bg-[#0d0c0b] text-white">
          {/* Unsplash Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=2400&q=85"
              alt="Essential Oils Background"
              className="w-full h-full object-cover scale-105"
            />
            {/* Deep Contrast Overlay for optimal text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/90 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#86efac] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>BOTANICAL COLLECTION</span>
            </div>
            <h1 className="reveal-on-scroll reveal-delay-100 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
              Pure Essential
              <br />
              <em className="text-[#86efac] font-serif italic">Oils &amp; Essences</em>
            </h1>
            <p className="reveal-on-scroll reveal-delay-200 mt-4 text-sm sm:text-base text-[#e0deda] font-light max-w-xl leading-relaxed">
              Pure aromatic extracts from the world's finest medicinal flora. Sourced with botanical
              stewardship, steam-distilled traditionally, and bottled unadulterated.
            </p>
          </div>
        </section>

        {/* Botanical Highlights Pill Bar */}
        <div className="reveal-fade max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#e8e2d8]">
          <div className="flex flex-wrap items-center gap-2">
            {["All Essences", "Lavender", "Rosemary", "Patchouli", "Lemongrass", "Mint"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag === "All Essences" ? "" : tag)}
                  className={`px-4 py-1.5 text-xs rounded-full border transition-all ${
                    (tag === "All Essences" && !query) || query === tag
                      ? "bg-[#1b5e3f] border-[#1b5e3f] text-white shadow-md font-medium"
                      : "border-[#e8e2d8] bg-white text-[#666666] hover:text-[#1b5e3f] hover:border-[#1b5e3f]/40"
                  }`}
                >
                  {tag}
                </button>
              ),
            )}
          </div>
          <div className="text-xs text-[#777777] font-light">
            Therapeutic Grade ·{" "}
            <span className="text-[#1b5e3f] font-medium">100% Pure Distillates</span>
          </div>
        </div>

        {/* Page Info Section - Image Left, Info Right */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Left */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/assets/shopimages/essenceoil section image.png"
                alt="Artisan Essence Oils Collection"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            {/* Info Right */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-4">
                <span className="w-5 h-[1px] bg-[#d4af37]" />
                <span>PURE ESSENCE OILS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-[#1a1a1a] mb-4">
                Botanical Purity<br />
                <em className="text-[#1b5e3f] font-serif italic">From Nature's Heart</em>
              </h2>
              <p className="text-[#555555] text-sm sm:text-base font-light leading-relaxed mb-4">
                Our essence oils are sourced from the world's finest medicinal flora, harvested with botanical stewardship and steam-distilled using traditional copper stills at low thermal thresholds. Each drop preserves the full aromatic complexity of the plant — unadulterated, unblended, and therapeutically potent.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  '✦ 100% Pure & Unadulterated Extracts',
                  '✦ Traditional steam & cold-press distillation',
                  '✦ Therapeutic & aromatherapy grade',
                  '✦ Available in 10ml, 100ml, 500ml & 1L',
                  '✦ Sourced from KEOMC Botanical Labs',
                ].map((item) => (
                  <li key={item} className="text-sm text-[#444444] font-light flex items-start gap-2">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[#e8e2d8]" />
                <span className="text-[10px] uppercase tracking-widest text-[#1b5e3f] font-semibold">Therapeutic Grade · 100% Pure</span>
                <div className="h-px flex-1 bg-[#e8e2d8]" />
              </div>
            </div>
          </div>
        </section>

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
                    className={`reveal-on-scroll ${delayClass} group rounded-2xl overflow-hidden border border-[#e8e2d8] bg-white flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#1b5e3f]/50 hover:shadow-xl hover:shadow-[#1b5e3f]/5`}
                  >
                    <div className="relative aspect-square w-full p-6 flex items-center justify-center bg-[#fcfbf9] border-b border-[#e8e2d8]">
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
                          className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                        />
                      </a>
                      <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest text-[#1b5e3f] bg-white/95 border border-[#e8e2d8] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                        {p.badge}
                      </span>
                      <button
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-[#e8e2d8] flex items-center justify-center text-[#666666] hover:text-[#1b5e3f] hover:border-[#1b5e3f]/30 transition shadow-sm"
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

                    <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                      <div>
                        <div className="flex items-center gap-1 text-[#d4af37] text-xs mb-1.5">
                          {"★★★★★"}
                          <span className="text-[11px] text-[#888888] ml-1 font-light">(98)</span>
                        </div>
                        <a
                          href={`/products/${p.id}`}
                          className="font-display text-lg text-[#1a1a1a] group-hover:text-[#1b5e3f] transition-colors block font-medium"
                        >
                          {p.name}
                        </a>
                        {p.botanicalName && (
                          <p className="text-[11px] text-[#1b5e3f] italic mt-0.5 font-serif">
                            {p.botanicalName}
                          </p>
                        )}
                        <p className="text-xs text-[#666666] line-clamp-1 mt-1 font-light">
                          {p.notes}
                        </p>
                        <div className="text-[10px] text-[#888888] uppercase tracking-wider mt-1">
                          {p.size || "100 ml"} · Pure Extract
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-[#e8e2d8] flex items-center justify-between">
                        <span className="font-mono text-base font-semibold text-[#1a1a1a]">
                          {money(p.price)}
                        </span>
                        <Button
                          size="sm"
                          className="h-9 px-4 rounded-full bg-[#1b5e3f] hover:bg-[#164a31] text-white border border-[#1b5e3f]/30 text-xs font-medium"
                          onClick={() => add(p)}
                        >
                          Add to Cart <Plus size={13} className="ml-1 text-[#86efac]" />
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
          </div>

          {/* Educational Distillation Banner */}
          <div className="reveal-on-scroll reveal-slow mt-16 rounded-2xl overflow-hidden border border-[#2d8659]/30 shadow-2xl bg-gradient-to-r from-[#181614] via-[#312d28] to-[#181614] p-8 sm:p-12">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-2">
                KEOMC BOTANICAL LABS
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#333333]">
                Steam Distillation Craft
              </h3>
              <p className="text-[#666666] text-sm font-light mt-2 leading-relaxed">
                Extracted in small copper stills at low thermal thresholds to safeguard fragile
                monoterpenes and volatile aromatic rings. Available in 10ml amber bottles, 100ml,
                500ml, and bulk 1L quantities.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title mb-8 reveal-on-scroll">Sample Pack Options</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="reveal-on-scroll reveal-delay-100 bg-white/5 p-6 rounded-lg border border-[#1b5e3f]/12">
              <h3 className="font-display text-xl mb-2 text-[#333333]">Starter Sample Kit</h3>
              <p className="text-sm mb-3 text-[#666666]">5 Oils × 5 ml each</p>
              <p className="text-2xl font-bold text-[#1b5e3f]">₹999</p>
            </div>
            <div className="reveal-on-scroll reveal-delay-200 bg-white/5 p-6 rounded-lg border border-[#1b5e3f]/12">
              <h3 className="font-display text-xl mb-2 text-[#333333]">Professional Sample Kit</h3>
              <p className="text-sm mb-3 text-[#666666]">10 Oils × 5 ml each</p>
              <p className="text-2xl font-bold text-[#1b5e3f]">₹1,799</p>
            </div>
            <div className="reveal-on-scroll reveal-delay-300 bg-white/5 p-6 rounded-lg border border-[#1b5e3f]/12">
              <h3 className="font-display text-xl mb-2 text-[#333333]">Premium Perfumery Kit</h3>
              <p className="text-sm mb-3 text-[#666666]">5 Premium Oils</p>
              <p className="text-2xl font-bold text-[#1b5e3f]">₹2,499</p>
            </div>
          </div>
        </section>
      </main>

      <Footer tagline="Pure natural therapeutic oils." />

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
                    allProducts
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
                    <Button
                      className="w-full h-12 bg-[#1b5e3f] hover:bg-[#164a31] text-white rounded-full font-semibold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 mb-2"
                      onClick={() => {
                        window.location.href = "/cart";
                      }}
                    >
                      <MessageCircle size={16} className="text-[#86efac]" />
                      <span>Proceed to WhatsApp Checkout</span>
                      <ArrowRight size={15} />
                    </Button>
                    <p className="status-note mt-2 text-center text-xs">
                      Complimentary Pan-India delivery on orders above ₹999.
                    </p>
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





