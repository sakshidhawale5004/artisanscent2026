import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowRight, Heart, Plus, Search, ShoppingBag, X, SlidersHorizontal, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts, money, type Product } from "@/lib/products";
import { useWishlist, useShoppingBag } from "@/lib/store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "All Collections & Products | Artisan Scents" },
      {
        name: "description",
        content:
          "Explore the complete catalogue of Artisan Scents: luxury extrait perfumes, therapeutic essence oils, hanging car diffusers, sacred agarbatti, and handcrafted botanical soaps.",
      },
    ],
  }),
  component: AllProductsPage,
});

const categoryLabels: Record<string, string> = {
  all: "All Collections",
  perfumes: "Luxury Perfumes",
  "essence-oils": "Essence Oils",
  "car-perfumes": "Car Diffusers",
  agarbatti: "Sacred Agarbatti",
  soaps: "Handcrafted Soaps",
};

export function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  const [panel, setPanel] = useState<"bag" | "search" | null>(null);
  const [addedFlashId, setAddedFlashId] = useState<string | null>(null);

  // Live Products catalog synced with CRM
  const allProductsList = useProducts();

  // Shared Wishlist & Shopping Bag
  const { saved, toggleSaved, isSaved, wishlistCount } = useWishlist();
  const { bag, addToBag, updateQty: update, totalItems } = useShoppingBag();

  const total = allProductsList.reduce((sum, p) => sum + p.price * (bag[p.id] || 0), 0);

  const close = () => setPanel(null);

  const add = (p: Product) => {
    addToBag(p.id, 1);
    setAddedFlashId(p.id);
    setTimeout(() => setAddedFlashId(null), 1200);
    setPanel("bag");
  };

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let list = allProductsList.filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      // Family filter
      if (selectedFamily !== "all") {
        const queryF = selectedFamily.toLowerCase();
        if (
          !p.family.toLowerCase().includes(queryF) &&
          !p.notes.toLowerCase().includes(queryF)
        ) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchNotes = p.notes.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        if (!matchName && !matchNotes && !matchDesc && !matchCat) return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [allProductsList, selectedCategory, selectedFamily, searchQuery, sortBy]);

  return (
    <>
      <div className="announcement">
        Complimentary Pan-India Delivery on Orders ₹999+ <span className="ml-3">✦</span> Botanical Haute Parfumerie
      </div>
      <Header
        currentPage="Shop"
        onSearchClick={() => setPanel("search")}
        onBagClick={() => setPanel("bag")}
        totalItems={totalItems}
        wishlistCount={wishlistCount}
      />

      <main className="bg-[#fafaf8] text-[#333333] min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-[#1b5e3f]/15 py-16 sm:py-24 px-4 sm:px-12 bg-[#05170e] text-white">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="/assets/shopimages/perfume sectionimage.png"
              alt="Artisan Scent Complete Portfolio"
              className="w-full h-full object-cover scale-105 opacity-40 blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04150c] via-[#04150c]/85 to-[#04150c]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05170e] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#86efac] font-medium mb-3">
              <span className="w-6 h-[1px] bg-[#d4af37]" />
              <span>THE COMPLETE MAISON CATALOGUE</span>
              <span className="w-6 h-[1px] bg-[#d4af37]" />
            </div>
            <h1 className="reveal-on-scroll reveal-delay-100 font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12]">
              All Creations &amp;
              <br />
              <em className="text-[#86efac] font-serif italic">Sensory Formulations</em>
            </h1>
            <p className="reveal-on-scroll reveal-delay-200 mt-4 text-sm sm:text-base text-[#c4d6cb] font-light max-w-2xl leading-relaxed">
              Explore our master collection spanning luxury extrait perfumes, pure steam-distilled essence oils, hanging ambient car diffusers, sacred temple agarbatti, and hand-milled botanical soaps.
            </p>

            <div className="reveal-on-scroll reveal-delay-300 mt-6 flex flex-wrap items-center gap-3 text-xs text-[#86efac]">
              <span className="px-3 py-1 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/50">
                ✦ 28+ Artisanal Formulations
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/50">
                ✦ KEOMC Botanical Lab Extractions
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/50">
                ✦ 100% Authentic Indian Terroir
              </span>
            </div>
          </div>
        </section>

        {/* Category Navigation Pills */}
        <section className="bg-white border-b border-[#e8e2d8] sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {Object.entries(categoryLabels).map(([catKey, label]) => {
              const count =
                catKey === "all"
                  ? allProductsList.length
                  : allProductsList.filter((p) => p.category === catKey).length;
              const isActive = selectedCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#1b5e3f] text-white shadow-md shadow-[#1b5e3f]/20 border border-[#1b5e3f]"
                      : "bg-[#f5f4f0] text-[#555555] hover:bg-[#e9e6df] hover:text-[#111111] border border-transparent"
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? "bg-white/20 text-white" : "bg-black/5 text-[#777777]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Search, Filter & Sort Controls */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e8e2d8]">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by note, name, botanical..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#dcd6cb] rounded-full text-xs text-[#222222] placeholder:text-[#888888] focus:outline-none focus:border-[#1b5e3f] focus:ring-1 focus:ring-[#1b5e3f] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#222222]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Olfactory Family Pills & Sorting */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-[11px] text-[#777777] uppercase tracking-wider font-semibold mr-1 flex items-center gap-1">
                  <SlidersHorizontal size={12} /> Notes:
                </span>
                {["all", "Floral", "Woody", "Amber", "Oriental", "Fresh", "Herbal"].map((fam) => (
                  <button
                    key={fam}
                    onClick={() => setSelectedFamily(fam)}
                    className={`px-3 py-1 text-[11px] rounded-full transition-colors ${
                      selectedFamily === fam
                        ? "bg-[#1b5e3f]/10 text-[#1b5e3f] border border-[#1b5e3f] font-semibold"
                        : "bg-white text-[#666666] border border-[#dcd6cb] hover:border-[#1b5e3f]/40"
                    }`}
                  >
                    {fam === "all" ? "All" : fam}
                  </button>
                ))}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#777777] uppercase tracking-wider font-semibold">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#dcd6cb] rounded-lg px-3 py-1.5 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f] cursor-pointer"
                >
                  <option value="featured">Featured Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Alphabetical (A–Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Result Count and Active Filters */}
          <div className="flex items-center justify-between py-4 text-xs text-[#666666]">
            <div>
              Showing <span className="font-semibold text-[#1b5e3f]">{filteredProducts.length}</span> of{" "}
              {allProductsList.length} creations
              {selectedCategory !== "all" && ` in ${categoryLabels[selectedCategory]}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </div>

            {(selectedCategory !== "all" || selectedFamily !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedFamily("all");
                  setSearchQuery("");
                }}
                className="text-xs text-[#1b5e3f] hover:underline font-medium"
              >
                Reset all filters
              </button>
            )}
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-[#e8e2d8] p-8 max-w-md mx-auto my-8">
              <ShoppingBag size={40} className="mx-auto text-[#1b5e3f]/40 mb-4" />
              <h3 className="font-display text-2xl text-[#1a1a1a]">No creations found</h3>
              <p className="text-xs text-[#666666] mt-2 mb-6 font-light">
                We couldn&apos;t find any fragrance matching your selected filters. Try searching for different notes or reset your selection.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedFamily("all");
                  setSearchQuery("");
                }}
                className="rounded-full border-[#1b5e3f] text-[#1b5e3f]"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {filteredProducts.map((p) => {
                const isSaved = saved.includes(p.id);
                const isFlashAdded = addedFlashId === p.id;
                return (
                  <article
                    key={p.id}
                    className="group rounded-2xl overflow-hidden border border-[#e8e2d8] bg-white flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1b5e3f]/40 hover:shadow-xl hover:shadow-[#1b5e3f]/8"
                  >
                    {/* Bottle Display Area */}
                    <div className="relative aspect-square w-full p-6 flex items-center justify-center bg-gradient-to-b from-[#faf9f6] via-[#f5f3ee] to-[#faf9f6] border-b border-[#e8e2d8]/80">
                      <Link
                        to="/products/$productId"
                        params={{ productId: p.id }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          width={500}
                          height={500}
                          loading="lazy"
                          className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Badge */}
                      <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest text-[#1b5e3f] bg-white/95 border border-[#1b5e3f]/20 font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                        {p.badge || categoryLabels[p.category] || "Artisanal"}
                      </span>

                      {/* Wishlist Heart */}
                      <button
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-[#e8e2d8] flex items-center justify-center text-[#666666] hover:text-[#1b5e3f] hover:border-[#1b5e3f]/40 transition shadow-xs"
                        aria-label={`Save ${p.name}`}
                        onClick={() => toggleSaved(p.id)}
                      >
                        <Heart
                          size={15}
                          fill={isSaved ? "#d4af37" : "none"}
                          className={isSaved ? "text-[#d4af37]" : ""}
                        />
                      </button>
                    </div>

                    {/* Product Meta */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
                      <div>
                        {/* Rating */}
                        <div className="flex items-center gap-1 text-[#d4af37] text-xs mb-1">
                          {"★★★★★"}
                          <span className="text-[10px] text-[#888888] font-light ml-1">(4.9)</span>
                          <span className="text-[10px] text-[#aaaaaa] mx-1">·</span>
                          <span className="text-[10px] uppercase tracking-wider text-[#1b5e3f] font-medium">
                            {p.category.replace("-", " ")}
                          </span>
                        </div>

                        {/* Name */}
                        <Link
                          to="/products/$productId"
                          params={{ productId: p.id }}
                          className="font-display text-lg text-[#1a1a1a] group-hover:text-[#1b5e3f] transition-colors block font-medium leading-snug line-clamp-1"
                        >
                          {p.name}
                        </Link>

                        {/* Notes */}
                        <p className="text-xs text-[#666666] line-clamp-1 mt-1 font-light">{p.notes}</p>
                      </div>

                      {/* Price & Action Bottom Strip */}
                      <div className="mt-4 pt-3.5 border-t border-[#e8e2d8] flex items-center justify-between gap-2">
                        <div>
                          <div className="font-mono text-base font-semibold text-[#1a1a1a]">
                            {money(p.price)}
                          </div>
                          <div className="text-[9px] text-[#888888]">
                            {p.size || "Standard flacon"}
                          </div>
                        </div>

                        <Button
                          size="sm"
                          onClick={() => add(p)}
                          className={`h-9 px-3.5 rounded-full text-xs font-medium transition-all ${
                            isFlashAdded
                              ? "bg-[#1b5e3f] text-white"
                              : "bg-[#1b5e3f] hover:bg-[#164a31] text-white shadow-sm"
                          }`}
                        >
                          {isFlashAdded ? (
                            <span className="flex items-center gap-1 text-[#86efac]">
                              <Check size={12} /> Added
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              Add <ShoppingBag size={12} />
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Shopping Bag & Search Slide-overs */}
      {panel && (
        <div className="overlay bag-overlay" onClick={close}>
          <div className="bag-panel" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl">{panel === "bag" ? "Shopping Bag" : "Search Catalogue"}</h2>
              <Button variant="ghost" size="icon" onClick={close}>
                <X size={18} />
              </Button>
            </div>

            {panel === "bag" && (
              <>
                <div className="bag-items">
                  {totalItems === 0 ? (
                    <div className="py-16 text-center">
                      <ShoppingBag className="mx-auto mb-5 text-muted-foreground" />
                      <h3 className="font-display text-3xl">Your bag is empty</h3>
                      <p className="status-note my-4">Start curating your personal reserve</p>
                      <Button variant="editorial" onClick={close}>
                        Continue shopping <ArrowRight size={14} />
                      </Button>
                    </div>
                  ) : (
                    allProductsList
                      .filter((p) => (bag[p.id] || 0) > 0)
                      .map((p) => (
                        <div className="bag-item" key={p.id}>
                          <img src={p.image} alt={p.name} style={{ objectFit: "contain" }} />
                          <div>
                            <div className="flex justify-between">
                              <h3 className="font-display text-xl">{p.name}</h3>
                              <span className="text-xs font-mono font-semibold">
                                {money(p.price * (bag[p.id] || 0))}
                              </span>
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
                  <div className="pt-6 border-t border-[#e8e2d8]">
                    <div className="flex justify-between text-sm mb-4">
                      <span>Subtotal</span>
                      <span className="font-mono font-semibold">{money(total)}</span>
                    </div>
                    <Button asChild className="w-full h-12 bg-[#1b5e3f] hover:bg-[#164a31] text-white rounded-full">
                      <a href="/cart" className="flex items-center justify-center gap-2">
                        View Shopping Cart &amp; Checkout <ArrowRight size={16} />
                      </a>
                    </Button>
                  </div>
                )}
              </>
            )}

            {panel === "search" && (
              <>
                <input
                  className="search-input"
                  placeholder="Type fragrance notes, names, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <div className="search-results">
                  {filteredProducts.slice(0, 8).map((p) => (
                    <Link
                      to="/products/$productId"
                      params={{ productId: p.id }}
                      key={p.id}
                      className="bag-item"
                      onClick={close}
                    >
                      <img src={p.image} alt={p.name} style={{ objectFit: "contain" }} />
                      <div>
                        <h3 className="font-display text-xl">{p.name}</h3>
                        <p className="product-notes">{p.notes}</p>
                        <span className="text-xs font-mono">{money(p.price)}</span>
                      </div>
                    </Link>
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
