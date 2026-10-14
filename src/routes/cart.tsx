import { createFileRoute } from "@tanstack/react-router";
import { useShoppingBag } from "@/lib/store";
import { useProducts, money, type Product } from "@/lib/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — Artisan Scents" },
      {
        name: "description",
        content: "Review and manage your Artisan Scents shopping cart before checkout.",
      },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { bag, updateQty, removeItem, clearBag } = useShoppingBag();
  const products = useProducts();

  const cartProducts = products.filter((p) => (bag[p.id] || 0) > 0);
  const cartSubtotal = cartProducts.reduce((sum, p) => sum + p.price * (bag[p.id] || 0), 0);
  const shipping = cartSubtotal > 999 ? 0 : 99;
  const tax = Math.round(cartSubtotal * 0.05);
  const total = cartSubtotal + shipping + tax;

  return (
    <>
      <Header currentPage="Cart" />
      <main className="min-h-screen bg-[#fafaf8]">
        {/* Hero Banner */}
        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[#1b5e3f] to-[#2d8659] text-white border-b border-[#2d8659]/20">
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3 mb-3">
              <ShoppingBag size={24} className="text-[#86efac]" />
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight">
                Your Shopping Bag
              </h1>
            </div>
            <p className="text-[#c4f0db] text-base font-light max-w-2xl">
              Review your selected fragrances and proceed to secure checkout.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items - Left Column */}
            <div className="lg:col-span-2">
              {cartProducts.length === 0 ? (
                <div className="text-center py-20 rounded-3xl border-2 border-dashed border-[#d5cebf] bg-[#fef9f4]">
                  <ShoppingBag size={48} className="mx-auto mb-4 text-[#aaa7a0]" />
                  <h2 className="font-display text-2xl sm:text-3xl text-[#1a1a1a] mb-3">
                    Your bag is empty
                  </h2>
                  <p className="text-[#666666] text-base mb-8 max-w-md mx-auto">
                    Explore our handcrafted fragrances, essential oils, and botanical luxuries.
                  </p>
                  <Button
                    asChild
                    className="h-12 px-8 bg-[#1b5e3f] hover:bg-[#164a31] text-white border border-[#2d8659]/50 rounded-full font-medium tracking-wide shadow-lg transition-all"
                  >
                    <a href="/products" className="inline-flex items-center gap-2">
                      Continue Shopping <ArrowRight size={16} />
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#eeebe5]">
                    <h2 className="font-display text-xl sm:text-2xl text-[#1a1a1a]">
                      Items ({cartProducts.length})
                    </h2>
                    <button
                      onClick={() => clearBag()}
                      className="text-sm text-rose-600 hover:text-rose-700 font-medium transition-colors"
                    >
                      Clear All
                    </button>
                  </div>

                  {cartProducts.map((product) => {
                    const quantity = bag[product.id] || 0;
                    const itemTotal = product.price * quantity;

                    return (
                      <div
                        key={product.id}
                        className="p-4 sm:p-6 rounded-2xl border border-[#e8e2d8] bg-white hover:border-[#1b5e3f]/30 transition-colors"
                      >
                        <div className="flex gap-4 sm:gap-6">
                          {/* Product Image */}
                          <div className="w-20 h-24 sm:w-24 sm:h-32 flex-shrink-0 rounded-xl border border-[#eeebe5] overflow-hidden bg-[#faf8f5] p-2 flex items-center justify-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <a
                                href={`/products/${product.id}`}
                                className="font-display text-lg sm:text-xl text-[#1a1a1a] hover:text-[#1b5e3f] transition-colors"
                              >
                                {product.name}
                              </a>
                              <p className="text-sm text-[#777777] mt-1">{product.notes}</p>
                              <div className="text-xs text-[#999999] uppercase tracking-wide mt-2">
                                {product.category.replace("-", " ")}
                              </div>
                            </div>

                            {/* Quantity Controls & Price */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#f5f3ef] border border-[#e8e2d8]">
                                <button
                                  onClick={() => updateQty(product.id, -1)}
                                  className="w-6 h-6 flex items-center justify-center text-[#1b5e3f] hover:bg-[#eeebe5] rounded transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="font-mono font-semibold text-[#1a1a1a] min-w-6 text-center">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => updateQty(product.id, 1)}
                                  className="w-6 h-6 flex items-center justify-center text-[#1b5e3f] hover:bg-[#eeebe5] rounded transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>

                              <div className="text-right">
                                <div className="font-mono text-xs text-[#777777]">
                                  {money(product.price)} × {quantity}
                                </div>
                                <div className="font-display text-lg sm:text-xl font-semibold text-[#1b5e3f] mt-1">
                                  {money(itemTotal)}
                                </div>
                              </div>

                              <button
                                onClick={() => removeItem(product.id)}
                                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-lg transition-colors ml-2"
                                aria-label="Remove item"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cart Summary - Right Column */}
            {cartProducts.length > 0 && (
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-2xl border border-[#e8e2d8] bg-white p-6 sm:p-8 shadow-sm">
                  <h3 className="font-display text-xl sm:text-2xl text-[#1a1a1a] mb-6">Order Summary</h3>

                  <div className="space-y-3 pb-6 border-b border-[#eeebe5]">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#666666]">Subtotal</span>
                      <span className="font-mono text-[#1a1a1a]">{money(cartSubtotal)}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#666666]">Shipping</span>
                      <span className="font-mono">
                        {shipping === 0 ? (
                          <span className="text-[#1b5e3f] font-semibold">FREE</span>
                        ) : (
                          money(shipping)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#666666]">Tax (5%)</span>
                      <span className="font-mono text-[#1a1a1a]">{money(tax)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-4 mb-6">
                    <span className="font-display text-lg font-semibold text-[#1a1a1a]">Total</span>
                    <span className="font-display text-2xl font-bold text-[#1b5e3f]">{money(total)}</span>
                  </div>

                  {cartSubtotal <= 999 && (
                    <div className="mb-6 p-3 rounded-lg bg-[#fef9f4] border border-[#fdd8b5]">
                      <p className="text-xs text-[#d97706]">
                        Free shipping on orders above ₹999 · Spend{" "}
                        <strong>{money(999 - cartSubtotal)}</strong> more to qualify
                      </p>
                    </div>
                  )}

                  <Button
                    className="w-full h-12 sm:h-13 bg-[#1b5e3f] hover:bg-[#164a31] text-white rounded-full font-semibold tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 mb-3"
                    onClick={() => {
                      alert(
                        "🎁 Preview Checkout\n\nPayment integration coming soon. Your cart is preserved and ready for secure checkout.\n\nSubtotal: " +
                          money(cartSubtotal)
                      );
                    }}
                  >
                    Proceed to Checkout <ArrowRight size={16} />
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-12 sm:h-13 border border-[#1b5e3f] text-[#1b5e3f] rounded-full font-semibold tracking-wide hover:bg-[#1b5e3f]/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <a href="/products">
                      <ArrowLeft size={16} /> Continue Shopping
                    </a>
                  </Button>

                  <div className="mt-6 pt-6 border-t border-[#eeebe5] text-center">
                    <p className="text-xs text-[#777777] leading-relaxed">
                      ✓ 100% Authentic · ✓ Pan-India Delivery · ✓ Safe Checkout
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
