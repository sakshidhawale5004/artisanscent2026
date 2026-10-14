import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, useProducts, getStoredProducts, money, type Product } from "@/lib/products";
import { useWishlist, useShoppingBag } from "@/lib/store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const list = getStoredProducts();
    const product = list.find((p) => p.id === params.productId) || products.find((p) => p.id === params.productId);
    return {
      meta: [
        { title: product ? `${product.name} | Artisan Scents` : "Product | Artisan Scents" },
        { name: "description", content: product?.description ?? "Premium artisan fragrance." },
      ],
    };
  },
  component: ProductDetailPage,
});

const categoryBreadcrumb: Record<string, { label: string; href: string }> = {
  perfumes: { label: "Perfumes", href: "/perfumes" },
  "essence-oils": { label: "Essence Oils", href: "/essence-oils" },
  "car-perfumes": { label: "Car Perfumes", href: "/car-perfumes" },
  agarbatti: { label: "Agarbatti", href: "/agarbatti" },
  soaps: { label: "Soaps", href: "/soaps" },
};

const categoryBg: Record<string, string> = {
  perfumes: "#f5f5f0",
  "essence-oils": "#f8f6f3",
  "car-perfumes": "#f6f4f1",
  agarbatti: "#f7f5f2",
  soaps: "#f9f7f4",
};

function StarRating({ rating = 4.5, count = 124 }: { rating?: number; count?: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="product-detail-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < full ? "star-filled" : half && i === full ? "star-half" : "star-empty"}
          fill={i < full ? "currentColor" : "none"}
        />
      ))}
      <span className="product-detail-rating-count">({count} reviews)</span>
    </div>
  );
}

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const allProducts = useProducts();
  const { saved, toggleSaved, isSaved, wishlistCount } = useWishlist();
  const { bag, addToBag: storeAddToBag, updateQty, totalItems } = useShoppingBag();

  const [panel, setPanel] = useState<"bag" | null>(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [addedFlash, setAddedFlash] = useState(false);

  const product = allProducts.find((p) => p.id === productId);
  const related = allProducts
    .filter((p) => p.category === product?.category && p.id !== productId)
    .slice(0, 4);
  const total = allProducts.reduce((sum, p) => sum + p.price * (bag[p.id] || 0), 0);

  const closeBag = () => setPanel(null);

  const addToBag = (p: Product, quantity = 1) => {
    storeAddToBag(p.id, quantity);
    setAddedFlash(true);
    setPanel("bag");
    setTimeout(() => setAddedFlash(false), 1500);
  };

  const update = (id: string, amount: number) => updateQty(id, amount);

  if (!product) {
    return (
      <>
        <Header totalItems={totalItems} wishlistCount={wishlistCount} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
          <h1 className="font-display text-5xl mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild variant="editorial">
            <a href="/">
              Return Home <ArrowRight />
            </a>
          </Button>
        </div>
      </>
    );
  }

  const crumb = categoryBreadcrumb[product.category];
  const bgColor = categoryBg[product.category] || "#f5f5f5";

  // Mock multiple images (same image shown differently for demo)
  const images = [product.image, product.image, product.image];

  return (
    <>
      <div className="announcement">
        Free Shipping on Orders Above ₹999 <span className="ml-3">✦</span> 7-Day Returns
      </div>
      <Header
        currentPage="Shop"
        onBagClick={() => setPanel("bag")}
        totalItems={totalItems}
        wishlistCount={wishlistCount}
      />

      <main className="min-h-screen bg-[#ffffff] text-[#333333] pb-16">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-6 pb-4">
          <nav className="flex items-center gap-2 text-xs text-[#666666]" aria-label="Breadcrumb">
            <a href="/" className="hover:text-[#1b5e3f] transition-colors">
              Home
            </a>
            <span className="text-[#aaaaaa]">›</span>
            {crumb && (
              <>
                <a href={crumb.href} className="hover:text-[#1b5e3f] transition-colors">
                  {crumb.label}
                </a>
                <span className="text-[#aaaaaa]">›</span>
              </>
            )}
            <span className="text-[#1b5e3f] font-medium">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail Layout Grid */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Gallery & Main Showcase */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 reveal-scale">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border p-2 bg-[#f0ede8]/95 transition-all ${
                      activeImg === i
                        ? "border-[#d4af37] shadow-lg ring-1 ring-[#d4af37]/40"
                        : "border-white/10 opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className="w-full h-full object-contain filter drop-shadow"
                    />
                  </button>
                ))}
              </div>

              {/* Main Showcase Container (Bespoke Shade of Green) */}
              <div
                className="relative flex-1 aspect-square rounded-2xl overflow-hidden border border-[#2d8659]/30 p-8 flex items-center justify-center shadow-2xl"
                style={{ backgroundColor: bgColor }}
              >
                <img
                  src={images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                />
                <button
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-[#444444] hover:text-[#1b5e3f] transition ${
                    saved.includes(product.id) ? "text-[#1b5e3f]" : ""
                  }`}
                  aria-label={
                    saved.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"
                  }
                  onClick={() => toggleSaved(product.id)}
                >
                  <Heart size={18} fill={saved.includes(product.id) ? "#d4af37" : "none"} />
                </button>
                <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest text-[#1b5e3f] bg-black/60 px-3 py-1 rounded-full border border-[#1b5e3f]/12">
                  {product.badge}
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="lg:col-span-5 flex flex-col justify-start reveal-on-scroll reveal-delay-100">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium mb-2">
                <span>{product.family}</span>
                <span>·</span>
                <span>{product.category.replace("-", " ").toUpperCase()}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#333333] tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mt-2">
                <StarRating />
              </div>

              <div className="font-mono text-3xl font-semibold text-[#333333] mt-4">
                {money(product.price)}
              </div>

              <p className="text-[#555555] text-sm sm:text-base font-light mt-4 leading-relaxed">
                {product.description}
              </p>

              {/* Fragrance Notes Breakdown with Structure */}
              <div className="mt-6 p-4 rounded-xl border border-[#1b5e3f]/20 bg-[#f5f5f0]">
                <div className="text-xs uppercase tracking-widest text-[#1b5e3f] font-semibold mb-3">
                  Fragrance Composition
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.notes.split(" · ").map((note, index) => (
                    <span
                      key={note}
                      className="px-3 py-1.5 rounded-full text-xs bg-white border border-[#1b5e3f]/20 text-[#333333]"
                    >
                      <span className="text-[#1b5e3f] font-semibold mr-1.5">
                        {index === 0 ? "Top:" : index === 1 ? "Heart:" : "Base:"}
                      </span>
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botanical Name if applicable */}
              {product.botanicalName && (
                <p className="text-xs italic text-[#1b5e3f] mt-4 font-light leading-relaxed">
                  <span className="font-semibold">Botanical specimen:</span> {product.botanicalName}
                </p>
              )}

              {/* Size Selector */}
              <div className="mt-6">
                <div className="text-xs uppercase tracking-widest text-[#1b5e3f] font-semibold mb-3">
                  Select Flacon Size
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-5 py-3 rounded-xl text-xs font-semibold border border-[#1b5e3f] bg-[#1b5e3f] text-white hover:bg-[#164a31] transition-all">
                    {product.size || "50 ml"}
                  </button>
                  <button className="px-5 py-3 rounded-xl text-xs font-semibold border border-[#1b5e3f]/20 bg-white text-[#333333] hover:border-[#1b5e3f]/50 transition-all">
                    100 ml (Extrait)
                  </button>
                </div>
              </div>

              {/* Quantity Stepper & Add to Cart */}
              <div className="mt-8 flex items-center gap-4">
                {/* Stepper */}
                <div className="flex items-center border border-[#1b5e3f]/30 rounded-full bg-[#f5f5f0] p-1">
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[#333333] hover:text-[#1b5e3f] hover:bg-white transition"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-mono text-base text-[#333333] font-semibold">{qty}</span>
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[#333333] hover:text-[#1b5e3f] hover:bg-white transition"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <Button
                  className="flex-1 h-12 rounded-full bg-[#1b5e3f] hover:bg-[#164a31] text-white border border-[#1b5e3f]/40 font-semibold tracking-wide shadow-lg text-sm flex items-center justify-center gap-2 transition-all"
                  onClick={() => addToBag(product, qty)}
                >
                  {addedFlash ? (
                    "✓ Added to Bag"
                  ) : (
                    <>
                      Add to Cart <ShoppingBag size={16} className="text-[#86efac]" />
                    </>
                  )}
                </Button>
              </div>

              {/* Trust Badges Bar */}
              <div className="reveal-on-scroll reveal-delay-150 mt-8 pt-6 border-t border-[#e0e0e0] grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-[#f5f5f0] border border-[#e0e0e0]">
                  <div className="text-lg mb-1">🚚</div>
                  <div className="text-[10px] text-[#333333] font-semibold">Free Shipping</div>
                  <div className="text-[9px] text-[#666666]">Above ₹999</div>
                </div>
                <div className="p-3 rounded-lg bg-[#f5f5f0] border border-[#e0e0e0]">
                  <div className="text-lg mb-1">↩</div>
                  <div className="text-[10px] text-[#333333] font-semibold">7-Day Returns</div>
                  <div className="text-[9px] text-[#666666]">Easy & Hassle-free</div>
                </div>
                <div className="p-3 rounded-lg bg-[#f5f5f0] border border-[#e0e0e0]">
                  <div className="text-lg mb-1">🛡️</div>
                  <div className="text-[10px] text-[#333333] font-semibold">100% Authentic</div>
                  <div className="text-[9px] text-[#666666]">Original KEOMC</div>
                </div>
              </div>

              {/* Accordions (Details, Fragrance Notes, Shipping) */}
              <div className="reveal-on-scroll reveal-delay-200 mt-8 space-y-2">
                <details className="rounded-xl border border-[#1b5e3f]/20 bg-white overflow-hidden group">
                  <summary className="p-4 cursor-pointer text-xs uppercase tracking-wider text-[#333333] font-semibold flex items-center justify-between list-none hover:bg-[#f5f5f0] transition-colors">
                    <span>Product Specifications</span>
                    <span className="text-[#1b5e3f] group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="p-4 pt-2 text-xs text-[#555555] space-y-2 border-t border-[#e0e0e0] font-light leading-relaxed">
                    <p>{product.description}</p>
                    {product.botanicalName && (
                      <p>
                        <strong className="text-[#333333]">Botanical:</strong> {product.botanicalName}
                      </p>
                    )}
                    <p>
                      <strong className="text-[#333333]">Size:</strong> {product.size || "100 ml"}
                    </p>
                    <p>
                      <strong className="text-[#333333]">Category:</strong> {product.category.replace("-", " ")}
                    </p>
                  </div>
                </details>

                <details className="rounded-xl border border-[#1b5e3f]/20 bg-white overflow-hidden group">
                  <summary className="p-4 cursor-pointer text-xs uppercase tracking-wider text-[#333333] font-semibold flex items-center justify-between list-none hover:bg-[#f5f5f0] transition-colors">
                    <span>Fragrance Notes & Longevity</span>
                    <span className="text-[#1b5e3f] group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="p-4 pt-2 text-xs text-[#555555] border-t border-[#e0e0e0] font-light leading-relaxed">
                    <p>{product.notes}</p>
                    <p className="mt-2 text-[#777777]">
                      <strong className="text-[#333333]">Concentration:</strong> High Extrait de Parfum. <br />
                      <strong className="text-[#333333]">Longevity:</strong> 8–12 hours on skin and fabrics.
                    </p>
                  </div>
                </details>

                <details className="rounded-xl border border-[#1b5e3f]/20 bg-white overflow-hidden group">
                  <summary className="p-4 cursor-pointer text-xs uppercase tracking-wider text-[#333333] font-semibold flex items-center justify-between list-none hover:bg-[#f5f5f0] transition-colors">
                    <span>Shipping & Returns</span>
                    <span className="text-[#1b5e3f] group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="p-4 pt-2 text-xs text-[#555555] border-t border-[#e0e0e0] font-light leading-relaxed">
                    <p>
                      <strong className="text-[#333333]">Shipping:</strong> Free standard courier shipping on orders above ₹999 across India. Dispatched within 24 hours.
                    </p>
                    <p className="mt-2">
                      <strong className="text-[#333333]">Returns:</strong> 7-day return guarantee if tamper seal remains unbroken.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products in Matching Emerald Shade */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 border-t border-white/10">
            <div className="reveal-on-scroll flex items-center justify-between mb-8">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-[#1b5e3f] font-medium">
                  YOU MAY ALSO LIKE
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-[#333333] mt-1">
                  Related Fragrances
                </h2>
              </div>
              {crumb && (
                <Button
                  asChild
                  size="sm"
                  className="bg-transparent border border-white/20 text-[#333333] hover:border-[#d4af37] text-xs rounded-full"
                >
                  <a href={crumb.href} className="flex items-center gap-1.5">
                    View All <ArrowRight size={13} className="text-[#1b5e3f]" />
                  </a>
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, idx) => {
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
                          alt={p.name}
                          width={600}
                          height={600}
                          loading="lazy"
                          className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                        />
                      </a>
                      <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest text-[#1b5e3f] bg-white/95 border border-[#e8e2d8] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                        {p.badge}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between bg-white">
                      <div>
                        <a
                          href={`/products/${p.id}`}
                          className="font-display text-base text-[#1a1a1a] group-hover:text-[#1b5e3f] transition-colors block font-medium"
                        >
                          {p.name}
                        </a>
                        <p className="text-xs text-[#666666] line-clamp-1 mt-0.5 font-light">
                          {p.notes}
                        </p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-[#e8e2d8] flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold text-[#1a1a1a]">
                          {money(p.price)}
                        </span>
                        <Button
                          size="sm"
                          className="h-8 px-3 rounded-full bg-[#1b5e3f] hover:bg-[#164a31] text-white border border-[#1b5e3f]/30 text-xs font-medium"
                          onClick={() => addToBag(p)}
                        >
                          Add <Plus size={12} className="ml-0.5 text-[#86efac]" />
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Bag Panel */}
      {panel === "bag" && (
        <div className="bag-overlay overlay" onClick={closeBag}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            className="bag-panel dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dialog-header">
              <h2 className="font-display text-3xl">Your bag ({totalItems})</h2>
              <button className="luxury-icon-btn" aria-label="Close" autoFocus onClick={closeBag}>
                <X />
              </button>
            </div>
            <div className="bag-list">
              {totalItems === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="mx-auto mb-5 text-muted-foreground" />
                  <h3 className="font-display text-3xl">A fragrance awaits.</h3>
                  <p className="status-note my-4">Your bag is currently empty.</p>
                  <Button variant="editorial" onClick={closeBag}>
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
                        <p className="product-notes capitalize">{p.category.replace("-", " ")}</p>
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
                <Button 
                  className="w-full h-12"
                  onClick={() => {
                    const cartItems = Object.entries(bag)
                      .map(([id, qty]) => {
                        const product = allProducts.find(p => p.id === id);
                        return product ? `${product.name} x${qty}` : '';
                      })
                      .filter(Boolean)
                      .join(', ');
                    const whatsappUrl = `https://wa.me/919820252868?text=Hi! I would like to purchase: ${encodeURIComponent(cartItems)}. Total: ${encodeURIComponent(money(total))}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                >
                  Continue to checkout <ArrowRight />
                </Button>
                <p className="status-note mt-3">Shipping and taxes calculated at checkout.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}





