import { createFileRoute } from "@tanstack/react-router";
import { useWishlist, useShoppingBag } from "@/lib/store";
import { useProducts, money, type Product } from "@/lib/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Share2, ArrowLeft, ShoppingBag, Plus } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist — Artisan Scents" },
      {
        name: "description",
        content: "View and manage your saved Artisan Scents fragrances and products.",
      },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { saved, toggleSaved } = useWishlist();
  const { addToBag } = useShoppingBag();
  const products = useProducts();

  const wishlistProducts = products.filter((p) => saved.includes(p.id));
  const wishlistTotal = wishlistProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddToBag = (product: Product) => {
    addToBag(product.id, 1);
    alert(`✓ Added "${product.name}" to your bag`);
  };

  return (
    <>
      <Header currentPage="Wishlist" />
      <main className="min-h-screen bg-[#fafaf8]">
        {/* Hero Banner */}
        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-rose-600 to-pink-600 text-white border-b border-rose-700/20">
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3 mb-3">
              <Heart size={24} className="text-rose-200 fill-rose-200" />
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight">
                My Wishlist
              </h1>
            </div>
            <p className="text-rose-100 text-base font-light max-w-2xl">
              Your curated collection of favored fragrances and botanical luxuries.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-24 rounded-3xl border-2 border-dashed border-[#d5cebf] bg-[#fef9f4]">
              <Heart size={48} className="mx-auto mb-4 text-[#aaa7a0]" />
              <h2 className="font-display text-2xl sm:text-3xl text-[#1a1a1a] mb-3">
                Your Wishlist is Empty
              </h2>
              <p className="text-[#666666] text-base mb-8 max-w-md mx-auto">
                Click the heart icon on any product to save your favorite fragrances and botanical essences.
              </p>
              <Button
                asChild
                className="h-12 px-8 bg-[#1b5e3f] hover:bg-[#164a31] text-white border border-[#2d8659]/50 rounded-full font-medium tracking-wide shadow-lg transition-all inline-flex items-center gap-2"
              >
                <a href="/products">
                  Explore Fragrances <ArrowRight size={16} />
                </a>
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#eeebe5] mb-8">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl text-[#1a1a1a]">
                    Saved Items ({wishlistProducts.length})
                  </h2>
                  <p className="text-sm text-[#666666] mt-1">
                    Total Value: <span className="font-semibold text-[#1b5e3f]">{money(wishlistTotal)}</span>
                  </p>
                </div>
              </div>

              {/* Grid of Wishlist Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                {wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative rounded-2xl border border-[#e8e2d8] overflow-hidden bg-white hover:border-rose-300 transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Product Image */}
                    <a href={`/products/${product.id}`} className="block relative h-72 overflow-hidden bg-[#faf8f5]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>

                    {/* Heart Icon - Remove from Wishlist */}
                    <button
                      onClick={() => toggleSaved(product.id)}
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all z-10"
                      aria-label="Remove from wishlist"
                    >
                      <Heart size={20} className="fill-current" />
                    </button>

                    {/* Product Info */}
                    <div className="p-4 sm:p-5">
                      <a href={`/products/${product.id}`} className="block">
                        <h3 className="font-display text-lg sm:text-xl text-[#1a1a1a] mb-1 line-clamp-2 hover:text-[#1b5e3f] transition-colors">
                          {product.name}
                        </h3>
                      </a>

                      <p className="text-sm text-[#777777] mb-3 line-clamp-2">{product.notes}</p>

                      <div className="flex items-end justify-between mb-4">
                        <div>
                          <div className="text-xs text-[#999999] uppercase tracking-wide mb-1">
                            {product.category.replace("-", " ")}
                          </div>
                          <div className="font-display text-xl sm:text-2xl font-bold text-[#1b5e3f]">
                            {money(product.price)}
                          </div>
                        </div>
                        {product.badge && (
                          <span className="text-xs font-semibold text-[#1b5e3f] bg-[#d4f0db]/30 px-2.5 py-1 rounded-full">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 h-10 bg-[#1b5e3f] hover:bg-[#164a31] text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all"
                          onClick={() => handleAddToBag(product)}
                        >
                          <ShoppingBag size={14} /> Add
                        </Button>
                        <button
                          className="flex-1 h-10 border border-[#1b5e3f] text-[#1b5e3f] rounded-lg font-medium text-sm hover:bg-[#1b5e3f]/5 transition-colors flex items-center justify-center gap-2"
                          onClick={() => {
                            navigator.share({
                              title: product.name,
                              text: `Check out ${product.name} - ${product.notes}`,
                              url: window.location.origin + `/products/${product.id}`,
                            }).catch(() => {
                              // Fallback: copy URL to clipboard
                              navigator.clipboard.writeText(
                                window.location.origin + `/products/${product.id}`
                              );
                              alert("Link copied to clipboard");
                            });
                          }}
                        >
                          <Share2 size={14} /> Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Section */}
              <div className="rounded-2xl border border-[#e8e2d8] bg-gradient-to-r from-[#1b5e3f]/5 to-rose-600/5 p-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="font-display text-xl text-[#1a1a1a] mb-2">Ready to Explore?</h3>
                    <p className="text-[#666666] text-base">
                      Add items from your wishlist to your bag and proceed to checkout.
                    </p>
                  </div>

                  <Button
                    className="h-12 px-8 bg-[#1b5e3f] hover:bg-[#164a31] text-white rounded-full font-medium tracking-wide shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
                    onClick={() => {
                      alert(`You have ${wishlistProducts.length} items totaling ${money(wishlistTotal)} in your wishlist.`);
                    }}
                  >
                    View Cart <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Continue Shopping Link */}
          <div className="mt-12 text-center">
            <Button
              asChild
              variant="ghost"
              className="text-[#1b5e3f] hover:text-[#164a31] font-medium inline-flex items-center gap-2"
            >
              <a href="/products">
                <ArrowLeft size={16} /> Continue Shopping
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
