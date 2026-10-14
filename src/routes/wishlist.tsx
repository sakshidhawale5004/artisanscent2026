import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useWishlist, useShoppingBag } from "@/lib/store";
import { useProducts, money, type Product } from "@/lib/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Heart,
  Share2,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Trash2,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Curated Wishlist — Artisan Scent Haute Parfumerie" },
      {
        name: "description",
        content:
          "View and manage your personal curated collection of Artisan Scent luxury perfumes, essence oils, and botanical creations.",
      },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { saved, toggleSaved } = useWishlist();
  const { addToBag, totalItems } = useShoppingBag();
  const products = useProducts();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const wishlistProducts = products.filter((p) => saved.includes(p.id));
  const wishlistTotal = wishlistProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddToBag = (product: Product) => {
    addToBag(product.id, 1);
    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const handleAddAllToBag = () => {
    if (wishlistProducts.length === 0) return;
    wishlistProducts.forEach((p) => addToBag(p.id, 1));
    showToast(`Added all ${wishlistProducts.length} curated creations to your shopping bag.`);
  };

  return (
    <>
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#05170e] text-[#86efac] border border-[#2d8659] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 size={18} className="text-[#86efac] shrink-0" />
          <span className="font-medium text-white">{toastMessage}</span>
          <a
            href="/cart"
            className="ml-2 px-3 py-1 bg-[#1b5e3f] hover:bg-[#257d54] text-white rounded-full text-[11px] font-semibold transition-colors"
          >
            View Bag →
          </a>
        </div>
      )}

      <div className="announcement">
        Complimentary Pan-India Delivery on Orders ₹999+ <span className="ml-3">✦</span> Botanical Haute Parfumerie
      </div>

      <Header currentPage="Wishlist" />

      <main className="min-h-screen bg-[#fafaf8]">
        {/* =========================================================================
            PROPERLY DESIGNED LUXURY HERO SECTION
            Matches the Haute Parfumerie brand design system
            ========================================================================= */}
        <section className="relative overflow-hidden border-b border-[#1b5e3f]/20 py-16 sm:py-24 px-6 sm:px-12 bg-[#05170e] text-white">
          {/* Ambient Lighting & Luxury Glows */}
          <div className="absolute top-0 right-1/4 w-[420px] h-[420px] bg-[#1b5e3f]/30 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[360px] h-[360px] bg-[#d4af37]/15 blur-[120px] rounded-full pointer-events-none" />

          {/* Textured Atmospheric Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="/assets/shopimages/perfume sectionimage.png"
              alt="Artisan Scent Olfactory Atmosphere"
              className="w-full h-full object-cover scale-105 opacity-25 blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04150c] via-[#04150c]/90 to-[#04150c]/65" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05170e] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs text-[#86a894] mb-6" aria-label="Breadcrumb">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <span className="text-[#436350]">›</span>
              <a href="/products" className="hover:text-white transition-colors">
                Shop
              </a>
              <span className="text-[#436350]">›</span>
              <span className="text-[#86efac] font-medium">Curated Wishlist</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              {/* Left Column: Heading & Story */}
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#86efac] font-semibold mb-3">
                  <span className="w-6 h-[1px] bg-[#d4af37]" />
                  <Heart size={13} className="text-[#d4af37] fill-[#d4af37]" />
                  <span>HAUTE PARFUMERIE · PRIVATE CURATION</span>
                  <span className="w-6 h-[1px] bg-[#d4af37]" />
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12]">
                  Your Personal
                  <br />
                  <em className="text-[#86efac] font-serif italic">Wishlist &amp; Favorites</em>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-[#c4d6cb] font-light max-w-2xl leading-relaxed">
                  Your private sanctuary of favored extrait perfumes, rare steam-distilled essence oils,
                  and botanical formulations. Curated and preserved for your personal fragrance ritual.
                </p>

                {/* Status Badges */}
                <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/60 text-[#86efac]">
                    <Sparkles size={12} className="text-[#d4af37]" />
                    {wishlistProducts.length}{" "}
                    {wishlistProducts.length === 1 ? "Creation Curated" : "Creations Curated"}
                  </span>
                  {wishlistProducts.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/60 text-white font-mono">
                      Total Reserve: {money(wishlistTotal)}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b5e3f]/25 border border-[#2d8659]/40 text-[#c4d6cb]">
                    ✦ Complimentary Pan-India Delivery on ₹999+
                  </span>
                </div>
              </div>

              {/* Right Column: Hero Quick Actions */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Button
                  asChild
                  className="h-12 px-6 bg-[#1b5e3f] hover:bg-[#237750] text-white border border-[#2d8659] rounded-full font-medium tracking-wide shadow-lg transition-all text-xs flex items-center justify-center gap-2"
                >
                  <a href="/cart">
                    <ShoppingBag size={15} className="text-[#86efac]" />
                    <span>View Shopping Bag ({totalItems})</span>
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-12 px-6 bg-white/5 hover:bg-white/10 text-white border-white/20 hover:border-[#d4af37] rounded-full font-medium tracking-wide transition-all text-xs flex items-center justify-center gap-2"
                >
                  <a href="/products">
                    <span>Explore Full Catalogue</span>
                    <ArrowRight size={14} className="text-[#86efac]" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Wishlist Main Catalog Container */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-24 px-6 rounded-3xl border border-[#e8e2d8] bg-white shadow-xs max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#faf8f5] border border-[#e8e2d8] flex items-center justify-center mx-auto mb-4 text-[#1b5e3f]">
                <Heart size={28} className="text-[#1b5e3f] stroke-1" />
              </div>
              <div className="text-xs uppercase tracking-widest text-[#888888] font-semibold mb-2">
                Empty Reserve
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-[#1a1a1a] mb-3">
                Your Wishlist is Awaiting Fragrances
              </h2>
              <p className="text-[#666666] text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
                Click the heart icon on any individual perfume, essence oil, or soap to save
                your favorite creations for later review and gifting.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  asChild
                  className="h-12 px-8 bg-[#1b5e3f] hover:bg-[#164a31] text-white border border-[#2d8659]/50 rounded-full font-medium tracking-wide shadow-md transition-all inline-flex items-center gap-2 text-xs"
                >
                  <a href="/products">
                    Explore All Collections <ArrowRight size={15} />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 px-8 border-[#d5cebf] text-[#333333] hover:border-[#1b5e3f] rounded-full font-medium transition-all text-xs"
                >
                  <a href="/perfumes">Luxury Perfumes</a>
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {/* Header Bar with Count & Bulk Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#eeebe5] mb-8 gap-4">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl text-[#1a1a1a]">
                    Saved Creations ({wishlistProducts.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-[#666666] mt-1">
                    Combined Reserve Value:{" "}
                    <span className="font-semibold text-[#1b5e3f] font-mono">
                      {money(wishlistTotal)}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleAddAllToBag}
                    className="h-10 px-5 bg-[#1b5e3f] hover:bg-[#164a31] text-white rounded-full font-medium text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag size={14} /> Add All to Bag
                  </Button>
                </div>
              </div>

              {/* Grid of Wishlist Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                {wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative rounded-2xl border border-[#e8e2d8] overflow-hidden bg-white hover:border-[#1b5e3f]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#1b5e3f]/5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Image Showcase */}
                      <a
                        href={`/products/${product.id}`}
                        className="block relative h-72 overflow-hidden bg-[#faf8f5] p-6"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {product.badge && (
                          <span className="absolute top-4 left-4 text-[9px] uppercase tracking-widest text-[#1b5e3f] bg-white/95 border border-[#e8e2d8] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                            {product.badge}
                          </span>
                        )}
                      </a>

                      {/* Remove Button (Heart with active fill) */}
                      <button
                        onClick={() => {
                          toggleSaved(product.id);
                          showToast(`Removed "${product.name}" from wishlist.`);
                        }}
                        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-[#e8e2d8] flex items-center justify-center text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all z-10"
                        aria-label="Remove from wishlist"
                        title="Remove from wishlist"
                      >
                        <Heart size={18} className="fill-rose-600" />
                      </button>

                      {/* Product Metadata */}
                      <div className="p-5 pb-3">
                        <div className="text-[10px] uppercase tracking-wider text-[#1b5e3f] font-semibold mb-1">
                          {product.category.replace("-", " ")}
                        </div>

                        <a href={`/products/${product.id}`} className="block">
                          <h3 className="font-display text-lg sm:text-xl text-[#1a1a1a] mb-1 hover:text-[#1b5e3f] transition-colors leading-snug font-medium line-clamp-1">
                            {product.name}
                          </h3>
                        </a>

                        <p className="text-xs text-[#777777] line-clamp-2 mt-1 font-light leading-relaxed">
                          {product.notes}
                        </p>

                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#f0ede6]">
                          <div>
                            <div className="font-mono text-lg font-semibold text-[#1a1a1a]">
                              {money(product.price)}
                            </div>
                            <div className="text-[10px] text-[#888888]">
                              {product.size || "Standard Edition"}
                            </div>
                          </div>

                          <a
                            href={`/products/${product.id}`}
                            className="text-xs text-[#1b5e3f] hover:underline flex items-center gap-1 font-medium"
                          >
                            Details <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="p-5 pt-0">
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 h-11 bg-[#1b5e3f] hover:bg-[#164a31] text-white rounded-full font-medium text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                          onClick={() => handleAddToBag(product)}
                        >
                          <ShoppingBag size={14} className="text-[#86efac]" /> Add to Bag
                        </Button>

                        <button
                          className="h-11 px-4 border border-[#d5cebf] text-[#555555] hover:text-[#1b5e3f] hover:border-[#1b5e3f] rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-1.5 bg-white"
                          title="Share Product"
                          onClick={() => {
                            const shareUrl = window.location.origin + `/products/${product.id}`;
                            if (navigator.share) {
                              navigator
                                .share({
                                  title: product.name,
                                  text: `Artisan Scent: ${product.name} - ${product.notes}`,
                                  url: shareUrl,
                                })
                                .catch(() => {});
                            } else {
                              navigator.clipboard.writeText(shareUrl);
                              showToast("Product link copied to clipboard.");
                            }
                          }}
                        >
                          <Share2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ready to Checkout Banner */}
              <div className="rounded-3xl border border-[#2d8659]/30 bg-gradient-to-r from-[#0a2316] to-[#123623] text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-80 h-80 bg-[#1b5e3f]/40 blur-[100px] pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-1">
                      BESPOKE PACKAGING &amp; DISPATCH
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl text-white font-normal">
                      Ready to Receive Your Fragrances?
                    </h3>
                    <p className="text-[#c4d6cb] text-sm mt-1 max-w-xl font-light">
                      Review your items in the shopping bag and proceed to order fulfillment.
                      Includes complimentary botanical samples.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      asChild
                      className="h-12 px-8 bg-[#86efac] hover:bg-[#a7f3d0] text-[#05170e] font-semibold rounded-full tracking-wide shadow-lg transition-all flex items-center gap-2 text-xs"
                    >
                      <a href="/cart">
                        <span>Go to Shopping Bag ({totalItems})</span>
                        <ArrowRight size={15} />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation Link */}
          <div className="mt-12 text-center">
            <Button
              asChild
              variant="ghost"
              className="text-[#1b5e3f] hover:text-[#164a31] font-medium inline-flex items-center gap-2 text-xs"
            >
              <a href="/products">
                <ArrowLeft size={15} /> Continue Exploring Products
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
