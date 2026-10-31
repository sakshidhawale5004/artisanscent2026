import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useShoppingBag, useWishlist, addOrderToCRM } from "@/lib/store";
import { useProducts, money, type Product } from "@/lib/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowLeft,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ExternalLink,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Bag & Cart — Artisan Scent Haute Parfumerie" },
      {
        name: "description",
        content:
          "Review and manage your selected Artisan Scent luxury perfumes and botanical products before bespoke dispatch.",
      },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { bag, updateQty, removeItem, clearBag, totalItems } = useShoppingBag();
  const { wishlistCount } = useWishlist();
  const products = useProducts();

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [checkoutNote, setCheckoutNote] = useState("");
  const [checkoutOrderId, setCheckoutOrderId] = useState<string | null>(null);

  const cartProducts = products.filter((p) => (bag[p.id] || 0) > 0);
  const cartSubtotal = cartProducts.reduce((sum, p) => sum + p.price * (bag[p.id] || 0), 0);
  const isFreeShipping = cartSubtotal >= 999;
  const shipping = cartProducts.length === 0 ? 0 : isFreeShipping ? 0 : 99;
  const tax = Math.round(cartSubtotal * 0.05);
  const total = cartSubtotal + shipping + tax;

  const totalCartCount = cartProducts.reduce((sum, p) => sum + (bag[p.id] || 0), 0);

  const handleWhatsAppCheckout = () => {
    if (cartProducts.length === 0) return;

    const itemsSummary = cartProducts
      .map((p) => `${p.name} (${p.size || "Standard"}) x${bag[p.id]} [${money(p.price * (bag[p.id] || 0))}]`)
      .join(", ");

    const customerName = clientName.trim() || "WhatsApp Shopper";
    const customerPhone = clientPhone.trim() || "+91 (Mobile)";
    const customerEmail = "whatsapp.shopper@artisanscent.com";

    // Record order and client interaction in CRM Dashboard and cloud stream
    const newOrder = addOrderToCRM({
      customer: customerName,
      email: customerEmail,
      phone: customerPhone,
      items: itemsSummary,
      total: total,
      note: checkoutNote.trim() || undefined,
      source: "WhatsApp Checkout",
    });

    setCheckoutOrderId(newOrder.id);

    const message = `✦ Artisan Scent Haute Parfumerie Order Concierge ✦\n\nReference: ${newOrder.id}\nPatron: ${customerName}${clientPhone.trim() ? `\nWhatsApp / Phone: ${clientPhone.trim()}` : ""}\n\nSelected Formulations:\n${itemsSummary}\n\nSubtotal: ${money(cartSubtotal)}\nPan-India Delivery: ${shipping === 0 ? "Complimentary (FREE)" : money(shipping)}\nTotal Valuation: ${money(total)}${checkoutNote.trim() ? `\n\nBespoke Instructions: ${checkoutNote.trim()}` : ""}\n\nPlease confirm availability and dispatch schedule.`;

    const whatsappUrl = `https://wa.me/919820252868?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div className="announcement">
        Complimentary Pan-India Delivery on Orders ₹999+ <span className="ml-3">✦</span> Botanical Haute Parfumerie
      </div>

      <Header currentPage="Cart" />

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
              alt="Artisan Scent Shopping Atmosphere"
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
              <span className="text-[#86efac] font-medium">Shopping Bag &amp; Cart</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              {/* Left Column: Heading & Description */}
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#86efac] font-semibold mb-3">
                  <span className="w-6 h-[1px] bg-[#d4af37]" />
                  <ShoppingBag size={13} className="text-[#d4af37]" />
                  <span>MAISON ARTISAN SCENT · BESPOKE DISPATCH</span>
                  <span className="w-6 h-[1px] bg-[#d4af37]" />
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12]">
                  Your Reserved
                  <br />
                  <em className="text-[#86efac] font-serif italic">Shopping Bag &amp; Cart</em>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-[#c4d6cb] font-light max-w-2xl leading-relaxed">
                  Review your selected haute parfumerie flacons, rare botanical extracts, and artisanal home diffusers.
                  Prepared with bespoke gift packaging and insured courier transit across India.
                </p>

                {/* Status Badges */}
                <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b5e3f]/40 border border-[#2d8659]/60 text-[#86efac]">
                    <Sparkles size={12} className="text-[#d4af37]" />
                    {totalCartCount} {totalCartCount === 1 ? "Unit Selected" : "Units Selected"} (
                    {cartProducts.length} {cartProducts.length === 1 ? "Item" : "Items"})
                  </span>

                  {cartProducts.length > 0 && (
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs ${
                        isFreeShipping
                          ? "bg-[#1b5e3f]/50 border-[#86efac]/50 text-[#86efac]"
                          : "bg-[#d4af37]/20 border-[#d4af37]/50 text-[#fed7aa]"
                      }`}
                    >
                      {isFreeShipping ? (
                        <>✦ Qualified for Complimentary Delivery</>
                      ) : (
                        <>✦ Add {money(999 - cartSubtotal)} for Complimentary Shipping</>
                      )}
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b5e3f]/25 border border-[#2d8659]/40 text-[#c4d6cb]">
                    ✦ Complimentary Olfactory Samples Included
                  </span>
                </div>
              </div>

              {/* Right Column: Hero Quick Actions */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Button
                  asChild
                  className="h-12 px-6 bg-[#1b5e3f] hover:bg-[#237750] text-white border border-[#2d8659] rounded-full font-medium tracking-wide shadow-lg transition-all text-xs flex items-center justify-center gap-2"
                >
                  <a href="/wishlist">
                    <Heart size={15} className="text-[#d4af37] fill-[#d4af37]" />
                    <span>View Wishlist ({wishlistCount})</span>
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-12 px-6 bg-white/5 hover:bg-white/10 text-white border-white/20 hover:border-[#d4af37] rounded-full font-medium tracking-wide transition-all text-xs flex items-center justify-center gap-2"
                >
                  <a href="/products">
                    <span>Explore Fragrance Catalogue</span>
                    <ArrowRight size={14} className="text-[#86efac]" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cart Main Content Area */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Cart Items - Left Column */}
            <div className="lg:col-span-7 xl:col-span-8">
              {cartProducts.length === 0 ? (
                <div className="text-center py-20 px-6 rounded-3xl border border-[#e8e2d8] bg-white shadow-xs max-w-xl mx-auto">
                  <div className="w-16 h-16 rounded-full bg-[#faf8f5] border border-[#e8e2d8] flex items-center justify-center mx-auto mb-4 text-[#1b5e3f]">
                    <ShoppingBag size={28} className="text-[#1b5e3f] stroke-1" />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#888888] font-semibold mb-2">
                    Empty Bag
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl text-[#1a1a1a] mb-3">
                    Your Shopping Bag is Currently Empty
                  </h2>
                  <p className="text-[#666666] text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
                    Discover our rare botanical extrait perfumes, ambient car diffusers, and
                    artisan-distilled oils to begin your personal fragrance curation.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      asChild
                      className="h-12 px-8 bg-[#1b5e3f] hover:bg-[#164a31] text-white border border-[#2d8659]/50 rounded-full font-medium tracking-wide shadow-md transition-all inline-flex items-center gap-2 text-xs"
                    >
                      <a href="/products">
                        Explore All Fragrances <ArrowRight size={15} />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-12 px-8 border-[#d5cebf] text-[#333333] hover:border-[#1b5e3f] rounded-full font-medium transition-all text-xs"
                    >
                      <a href="/wishlist">View Saved Wishlist ({wishlistCount})</a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart Header Strip */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#eeebe5]">
                    <div>
                      <h2 className="font-display text-xl sm:text-2xl text-[#1a1a1a]">
                        Selected Formulations ({cartProducts.length})
                      </h2>
                      <p className="text-xs text-[#777777] mt-0.5">
                        Free delivery applies automatically to qualifying orders.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to remove all items from your bag?")) {
                          clearBag();
                        }
                      }}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium transition-colors flex items-center gap-1 p-1"
                    >
                      <Trash2 size={13} /> Clear Bag
                    </button>
                  </div>

                  {/* Individual Product Rows */}
                  {cartProducts.map((product) => {
                    const quantity = bag[product.id] || 0;
                    const itemTotal = product.price * quantity;

                    return (
                      <div
                        key={product.id}
                        className="p-4 sm:p-6 rounded-2xl border border-[#e8e2d8] bg-white hover:border-[#1b5e3f]/40 transition-all duration-300 shadow-xs flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                      >
                        <div className="flex gap-4 sm:gap-6 items-center flex-1 min-w-0">
                          {/* Product Thumbnail */}
                          <Link
                            to="/products/$productId"
                            params={{ productId: product.id }}
                            className="w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 rounded-xl border border-[#eeebe5] overflow-hidden bg-[#faf8f5] p-2 flex items-center justify-center group"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
                            />
                          </Link>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] uppercase tracking-wider text-[#1b5e3f] font-semibold mb-1">
                              {product.category.replace("-", " ")}
                            </div>
                            <Link
                              to="/products/$productId"
                              params={{ productId: product.id }}
                              className="font-display text-base sm:text-lg text-[#1a1a1a] hover:text-[#1b5e3f] transition-colors leading-snug font-medium block truncate"
                            >
                              {product.name}
                            </Link>
                            <p className="text-xs text-[#777777] line-clamp-1 mt-0.5 font-light">
                              {product.notes}
                            </p>
                            <div className="text-[11px] text-[#888888] mt-1 font-mono">
                              Unit Price: {money(product.price)} · Size: {product.size || "Standard"}
                            </div>
                          </div>
                        </div>

                        {/* Controls & Price Block */}
                        <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#f0ede6]">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-[#d5cebf] rounded-full bg-[#f9f8f5] px-1 py-0.5">
                            <button
                              onClick={() => updateQty(product.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-[#1b5e3f] hover:bg-white rounded-full transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="font-mono text-xs font-semibold text-[#1a1a1a] w-7 text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQty(product.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#1b5e3f] hover:bg-white rounded-full transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          {/* Line Total */}
                          <div className="text-right min-w-[80px]">
                            <div className="font-mono text-base font-semibold text-[#1b5e3f]">
                              {money(itemTotal)}
                            </div>
                            <div className="text-[10px] text-[#888888]">
                              {quantity} × {money(product.price)}
                            </div>
                          </div>

                          {/* Remove Item Button */}
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-stone-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-full transition-colors"
                            aria-label="Remove item"
                            title="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Trust Badges Strip */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-white border border-[#e8e2d8] flex items-center gap-3">
                  <Truck size={20} className="text-[#1b5e3f] shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-[#1a1a1a]">Insured Pan-India Transit</div>
                    <div className="text-[10px] text-[#777777]">Dispatched in 24 hours</div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#e8e2d8] flex items-center gap-3">
                  <ShieldCheck size={20} className="text-[#1b5e3f] shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-[#1a1a1a]">100% Authentic KEOMC</div>
                    <div className="text-[10px] text-[#777777]">Pure botanical formulation</div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#e8e2d8] flex items-center gap-3">
                  <RotateCcw size={20} className="text-[#1b5e3f] shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-[#1a1a1a]">7-Day Safe Returns</div>
                    <div className="text-[10px] text-[#777777]">Tamper-sealed peace of mind</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Summary - Right Column */}
            {cartProducts.length > 0 && (
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="sticky top-24 rounded-3xl border border-[#e8e2d8] bg-white p-6 sm:p-8 shadow-md">
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#eeebe5]">
                    <h3 className="font-display text-xl sm:text-2xl text-[#1a1a1a]">Order Summary</h3>
                    <span className="text-xs font-mono text-[#1b5e3f] font-semibold">
                      {totalCartCount} {totalCartCount === 1 ? "unit" : "units"}
                    </span>
                  </div>

                  <div className="space-y-3.5 pb-5 border-b border-[#eeebe5] text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[#666666]">Cart Subtotal</span>
                      <span className="font-mono text-[#1a1a1a] font-medium">{money(cartSubtotal)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#666666]">Pan-India Shipping</span>
                      <span className="font-mono font-medium">
                        {shipping === 0 ? (
                          <span className="text-[#1b5e3f] font-semibold">COMPLIMENTARY</span>
                        ) : (
                          money(shipping)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#666666]">GST &amp; Bottling Levies (5%)</span>
                      <span className="font-mono text-[#1a1a1a] font-medium">{money(tax)}</span>
                    </div>
                  </div>

                  {/* Free Shipping Progress / Status Bar */}
                  <div className="my-5 p-3.5 rounded-2xl bg-[#f5fbf7] border border-[#2d8659]/30">
                    {isFreeShipping ? (
                      <p className="text-xs text-[#1b5e3f] font-medium flex items-center gap-1.5">
                        <Sparkles size={14} className="text-[#d4af37]" />
                        You have unlocked <strong>Free Pan-India Delivery</strong> on this order!
                      </p>
                    ) : (
                      <p className="text-xs text-[#92400e] leading-relaxed">
                        Add <strong>{money(999 - cartSubtotal)}</strong> more in artisanal fragrances to qualify
                        for <strong>Complimentary Delivery</strong>.
                      </p>
                    )}
                  </div>

                  {/* Final Total */}
                  <div className="flex justify-between items-baseline py-2 mb-6">
                    <div>
                      <span className="font-display text-lg font-semibold text-[#1a1a1a]">Estimated Total</span>
                      <div className="text-[10px] text-[#888888]">Includes all applicable taxes</div>
                    </div>
                    <span className="font-mono text-2xl font-bold text-[#1b5e3f]">{money(total)}</span>
                  </div>

                  {/* Customer Information (Optional - for bespoke concierge tracking) */}
                  <div className="mb-4 space-y-3 pt-1">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666666] font-semibold mb-1">
                        Your Full Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g., Sakshi Dhawale"
                        className="w-full text-xs p-2.5 rounded-xl border border-[#d5cebf] bg-[#faf8f5] text-[#222222] focus:outline-none focus:border-[#1b5e3f] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#666666] font-semibold mb-1">
                        WhatsApp Contact Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="e.g., +91 98202 52868"
                        className="w-full text-xs p-2.5 rounded-xl border border-[#d5cebf] bg-[#faf8f5] text-[#222222] focus:outline-none focus:border-[#1b5e3f] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Optional Order Note */}
                  <div className="mb-5">
                    <label className="block text-[11px] uppercase tracking-wider text-[#666666] font-semibold mb-1.5">
                      Bespoke Gifting or Delivery Note (Optional)
                    </label>
                    <textarea
                      value={checkoutNote}
                      onChange={(e) => setCheckoutNote(e.target.value)}
                      placeholder="e.g., Include personal gift card note, leave at door..."
                      rows={2}
                      className="w-full text-xs p-3 rounded-xl border border-[#d5cebf] bg-[#faf8f5] text-[#222222] focus:outline-none focus:border-[#1b5e3f] transition-colors resize-none"
                    />
                  </div>

                  {/* Instant Order Registered Feedback */}
                  {checkoutOrderId && (
                    <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-start gap-2.5 animate-in fade-in">
                      <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <div className="font-semibold text-emerald-900">✦ Order Reference #{checkoutOrderId} Registered!</div>
                        <div className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                          Your order has been recorded live in the Artisan Scent Staff Hub. Opening WhatsApp Concierge...
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Primary WhatsApp Concierge Checkout Button */}
                  <Button
                    onClick={handleWhatsAppCheckout}
                    className="w-full h-12 sm:h-13 bg-[#1b5e3f] hover:bg-[#164a31] text-white rounded-full font-semibold tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 mb-3 text-xs sm:text-sm"
                  >
                    <MessageCircle size={17} className="text-[#86efac]" />
                    <span>Proceed to WhatsApp Checkout</span>
                    <ArrowRight size={15} />
                  </Button>

                  {/* Secondary Continue Shopping Button */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-11 border border-[#1b5e3f]/40 text-[#1b5e3f] rounded-full font-medium tracking-wide hover:bg-[#1b5e3f]/5 transition-colors flex items-center justify-center gap-2 text-xs"
                  >
                    <a href="/products">
                      <ArrowLeft size={14} /> Continue Curating Products
                    </a>
                  </Button>

                  {/* Assurance footnote */}
                  <div className="mt-5 pt-5 border-t border-[#eeebe5] text-center">
                    <p className="text-[11px] text-[#777777] leading-relaxed">
                      🔒 Direct artisan concierge fulfillment · Safe transactions · Hand-packed in Mumbai
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
