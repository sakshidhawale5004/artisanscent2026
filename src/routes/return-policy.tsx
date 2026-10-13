import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw, PackageCheck, AlertCircle, CheckCircle2, Truck, HelpCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/return-policy")({
  head: () => ({
    meta: [
      { title: "Return & Refund Policy | Artisan Scent" },
      {
        name: "description",
        content:
          "Artisan Scent Return & Refund Policy. Learn about our 7-day return window, replacement guarantees for damaged flacons, and refund timelines.",
      },
    ],
  }),
  component: ReturnPolicyPage,
});

export default function ReturnPolicyPage() {
  const lastUpdated = "October 2026";

  return (
    <>
      <div className="announcement">
        Hassle-Free Returns &amp; Replacement Assurance <span className="ml-3">✦</span> Artisan Scent
      </div>
      <Header currentPage="About" />

      <main className="bg-[#fafaf8] text-[#333333] min-h-screen">
        {/* Editorial Hero Banner */}
        <section className="relative overflow-hidden border-b border-[#1b5e3f]/15 py-20 px-6 sm:px-12 bg-[#092014] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1b5e3f]/40 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#86efac] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>SATISFACTION GUARANTEED</span>
              <span className="w-5 h-[1px] bg-[#d4af37]" />
            </div>
            <h1 className="reveal-on-scroll font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
              Return &amp; Refund Policy
            </h1>
            <p className="reveal-on-scroll reveal-delay-100 mt-4 text-sm sm:text-base text-[#d0e5d9] font-light max-w-xl mx-auto leading-relaxed">
              Every Artisan Scent creation is crafted to bring delight. If an item arrives damaged or fails to match your order, we guarantee swift resolution.
            </p>
            <div className="mt-5 text-xs text-[#d4af37] font-mono tracking-widest uppercase">
              Last Updated · {lastUpdated}
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="max-w-4xl mx-auto px-6 sm:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#e8f5f0] text-[#1b5e3f] flex items-center justify-center mb-4">
                <RotateCcw size={18} />
              </div>
              <h3 className="font-display text-lg text-[#1a1a1a] mb-1">7-Day Window</h3>
              <p className="text-xs text-[#666666] font-light leading-relaxed">
                Eligible for returns within 7 calendar days from confirmed delivery timestamp.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#e8f5f0] text-[#1b5e3f] flex items-center justify-center mb-4">
                <PackageCheck size={18} />
              </div>
              <h3 className="font-display text-lg text-[#1a1a1a] mb-1">Transit Breakage Guarantee</h3>
              <p className="text-xs text-[#666666] font-light leading-relaxed">
                Damaged glass flacons or leaked oils are replaced immediately at zero extra cost.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#e8f5f0] text-[#1b5e3f] flex items-center justify-center mb-4">
                <CheckCircle2 size={18} />
              </div>
              <h3 className="font-display text-lg text-[#1a1a1a] mb-1">Prompt 5-Day Refunds</h3>
              <p className="text-xs text-[#666666] font-light leading-relaxed">
                Approved returns are credited to your original payment method within 5–7 business days.
              </p>
            </div>
          </div>

          {/* Step-by-Step Return Process */}
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#0c2a1c] to-[#071910] text-white border border-[#2d8659]/30 mb-12 shadow-xl">
            <div className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-2">
              SIMPLE 3-STEP PROCESS
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-white mb-6">
              How to Initiate a Return or Replacement
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <div className="text-2xl font-serif text-[#86efac] mb-2">01</div>
                <div className="font-semibold text-white text-sm mb-1">Photograph Package</div>
                <div className="text-xs text-[#d0ded5] leading-relaxed">
                  Take a clear photograph of the outer carton, airway bill label, and the flacon condition.
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <div className="text-2xl font-serif text-[#86efac] mb-2">02</div>
                <div className="font-semibold text-white text-sm mb-1">Notify Concierge</div>
                <div className="text-xs text-[#d0ded5] leading-relaxed">
                  Email <span className="text-[#86efac]">care@artisanscent.com</span> with your Order ID within 48 hours of arrival.
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                <div className="text-2xl font-serif text-[#86efac] mb-2">03</div>
                <div className="font-semibold text-white text-sm mb-1">Speedy Dispatch / Refund</div>
                <div className="text-xs text-[#d0ded5] leading-relaxed">
                  We schedule free return pickup and dispatch your pristine replacement or initiate refund.
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Policy Text */}
          <div className="space-y-10 text-[#444444] text-sm sm:text-base font-light leading-relaxed">
            <div className="p-8 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <h2 className="font-display text-2xl text-[#1a1a1a] mb-3 flex items-center gap-2">
                <span className="text-[#1b5e3f] font-serif">✦</span> Eligibility Criteria for Returns
              </h2>
              <p className="mb-4">
                Owing to strict hygiene and personal care safety protocols governing botanical extractions, perfumes, and skin-contact soaps:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-[#555555]">
                <li><strong>Unopened &amp; Unused:</strong> Products must remain in their original luxury presentation boxes with tamper-evident seals intact.</li>
                <li><strong>Damaged or Defective:</strong> Flacons exhibiting sprayer dysfunction, leakage, or glass fracture upon unboxing are covered unconditionally for complimentary replacement.</li>
                <li><strong>Incorrect Product:</strong> If you received an item discordant with your order confirmation, notify us for immediate exchange at our expense.</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <h2 className="font-display text-2xl text-[#1a1a1a] mb-3 flex items-center gap-2">
                <span className="text-[#1b5e3f] font-serif">✦</span> Non-Returnable Items
              </h2>
              <p className="text-sm text-[#555555] mb-3">
                For reasons of hygiene and cosmetic integrity, the following categories are strictly non-returnable once opened:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-[#555555]">
                <li>Opened perfume bottles with broken protective collars or diminished liquid levels.</li>
                <li>Opened therapeutic essence oil droppers and bulk amber bottles (500ml / 1L).</li>
                <li>Unwrapped artisan soap bars or burnt agarbatti sticks.</li>
                <li>Custom bespoke gift hampers or personalized engraved flacons.</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm" id="shipping">
              <h2 className="font-display text-2xl text-[#1a1a1a] mb-3 flex items-center gap-2">
                <span className="text-[#1b5e3f] font-serif">✦</span> Shipping &amp; Courier Logistics
              </h2>
              <p className="text-sm text-[#555555] leading-relaxed">
                For verified damaged shipments, Artisan Scent schedules a complimentary reverse courier pickup from your address. If reverse pickup is unavailable in your pin code, we reimburse standard postal parcel costs upon presentation of the dispatch receipt.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <h2 className="font-display text-2xl text-[#1a1a1a] mb-3 flex items-center gap-2">
                <span className="text-[#1b5e3f] font-serif">✦</span> Refund Processing Timeline
              </h2>
              <p className="text-sm text-[#555555] mb-4 leading-relaxed">
                Upon receipt of the returned item at our quality laboratory in Maharashtra, inspection is concluded within 48 hours. Approved refunds are initiated immediately:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#f8f7f4] border border-[#e8e2d8]">
                  <strong>Prepaid (Cards, UPI, Netbanking):</strong>
                  <div className="text-[#666666] mt-1">Recredited to original bank/card account in 5–7 banking days.</div>
                </div>
                <div className="p-4 rounded-xl bg-[#f8f7f4] border border-[#e8e2d8]">
                  <strong>Cash on Delivery (COD):</strong>
                  <div className="text-[#666666] mt-1">Direct NEFT/IMPS transfer to your designated bank account or store credit voucher.</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer tagline="Transparent returns. Exemplary service. Artisanal excellence." />
    </>
  );
}
