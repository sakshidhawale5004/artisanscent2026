import { createFileRoute } from "@tanstack/react-router";
import { Scale, CheckCircle2, ShieldAlert, BookOpen, Building2, HelpCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Artisan Scent" },
      {
        name: "description",
        content:
          "Read Artisan Scent Terms and Conditions of service. Understand our ordering terms, intellectual property, pricing, and governing law.",
      },
    ],
  }),
  component: TermsAndConditionsPage,
});

export default function TermsAndConditionsPage() {
  const lastUpdated = "October 2026";

  return (
    <>
      <div className="announcement">
        Terms of Service &amp; User Agreement <span className="ml-3">✦</span> Artisan Scent
      </div>
      <Header currentPage="About" />

      <main className="bg-[#fafaf8] text-[#333333] min-h-screen">
        {/* Editorial Hero Banner */}
        <section className="relative overflow-hidden border-b border-[#1b5e3f]/15 py-20 px-6 sm:px-12 bg-[#092014] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1b5e3f]/40 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="reveal-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#86efac] font-medium mb-3">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span>LEGAL AGREEMENT</span>
              <span className="w-5 h-[1px] bg-[#d4af37]" />
            </div>
            <h1 className="reveal-on-scroll font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
              Terms &amp; Conditions
            </h1>
            <p className="reveal-on-scroll reveal-delay-100 mt-4 text-sm sm:text-base text-[#d0e5d9] font-light max-w-xl mx-auto leading-relaxed">
              These terms govern your access to and purchase of high-concentration perfumes, botanical oils, and artisanal goods from Artisan Scent.
            </p>
            <div className="mt-5 text-xs text-[#d4af37] font-mono tracking-widest uppercase">
              Last Updated · {lastUpdated}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-6 sm:px-8 py-16">
          {/* Quick Overview Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#e8f5f0] text-[#1b5e3f] flex items-center justify-center mb-4">
                <Scale size={18} />
              </div>
              <h3 className="font-display text-lg text-[#1a1a1a] mb-1">Mutual Fairness</h3>
              <p className="text-xs text-[#666666] font-light leading-relaxed">
                Clear guidelines protecting both artisan creators and our valued fragrance connoisseurs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#e8f5f0] text-[#1b5e3f] flex items-center justify-center mb-4">
                <BookOpen size={18} />
              </div>
              <h3 className="font-display text-lg text-[#1a1a1a] mb-1">Authentic Claims</h3>
              <p className="text-xs text-[#666666] font-light leading-relaxed">
                100% genuine specifications regarding extraction, concentration, and volume.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#e8f5f0] text-[#1b5e3f] flex items-center justify-center mb-4">
                <Building2 size={18} />
              </div>
              <h3 className="font-display text-lg text-[#1a1a1a] mb-1">Jurisdiction</h3>
              <p className="text-xs text-[#666666] font-light leading-relaxed">
                Subject to the laws of the Republic of India and competent courts of Maharashtra.
              </p>
            </div>
          </div>

          {/* Detailed Policy Text */}
          <div className="space-y-10 text-[#444444] text-sm sm:text-base font-light leading-relaxed">
            <div className="p-8 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <h2 className="font-display text-2xl text-[#1a1a1a] mb-3 flex items-center gap-2">
                <span className="text-[#1b5e3f] font-serif">01.</span> Acceptance of Agreement
              </h2>
              <p className="mb-3">
                By accessing, browsing, creating an account, or purchasing through this website (<span className="text-[#1b5e3f] font-mono">artisanscent.com</span>), you expressly signify your unreserved assent to these Terms &amp; Conditions, together with our Privacy Policy and Return Policy.
              </p>
              <p className="text-sm text-[#555555]">
                If you do not agree with any stipulation contained herein, we advise discontinuing use of our digital platforms.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <h2 className="font-display text-2xl text-[#1a1a1a] mb-3 flex items-center gap-2">
                <span className="text-[#1b5e3f] font-serif">02.</span> Olfactory Disclaimers &amp; Natural Variations
              </h2>
              <p className="mb-3">
                Our perfumes, essence oils, and bathing bars are created from authentic botanical extracts, organic essential oils, and small-batch distillations:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-[#555555]">
                <li><strong>Seasonal Nuance:</strong> Natural harvests may yield minute tonal variations in natural amber color and initial aromatic opening without altering purity or quality.</li>
                <li><strong>Patch Testing:</strong> While our formulations use therapeutic-grade essences, individual dermal sensitivities exist. We advise patch testing pure oils prior to expansive topical application.</li>
                <li><strong>External Use Solely:</strong> Perfumes, diffusers, and essence oils are strictly for topical/ambient use and must never be ingested.</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <h2 className="font-display text-2xl text-[#1a1a1a] mb-3 flex items-center gap-2">
                <span className="text-[#1b5e3f] font-serif">03.</span> Product Pricing &amp; Order Acceptance
              </h2>
              <p className="mb-3">
                All prices are denoted in Indian Rupees (INR ₹) and are inclusive of relevant Good and Services Tax (GST) unless explicitly noted otherwise.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-[#555555]">
                <li>We reserve the right to revise catalog pricing, promotional offers, or discontinue product runs without prior notice.</li>
                <li>Receipt of an electronic order confirmation does not constitute definitive acceptance. We reserve the right to decline or cancel orders in cases of pricing inaccuracies, stock depletion, or flagged fraudulent payment signals.</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <h2 className="font-display text-2xl text-[#1a1a1a] mb-3 flex items-center gap-2">
                <span className="text-[#1b5e3f] font-serif">04.</span> Intellectual Property Rights
              </h2>
              <p className="text-sm text-[#555555] leading-relaxed">
                All visual assets, bespoke flacon photography, trademarks, brand titles (including "Artisan Scent", "Artisan Scents", and "KEOMC" botanical lab affiliations), editorial scent narratives, sound clips, and software code are the exclusive intellectual property of Artisan Scent. Any reproduction, commercial exploitation, or unauthorized mirroring without written permission is strictly prohibited.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#e8e2d8] shadow-sm">
              <h2 className="font-display text-2xl text-[#1a1a1a] mb-3 flex items-center gap-2">
                <span className="text-[#1b5e3f] font-serif">05.</span> Limitation of Liability &amp; Governing Law
              </h2>
              <p className="text-sm text-[#555555] mb-4 leading-relaxed">
                Artisan Scent shall not be liable for any indirect, incidental, or consequential damages arising from website unavailability or misuse of products contrary to stated handling instructions. In all circumstances, maximum aggregate liability is capped at the value of the specific order placed.
              </p>
              <p className="text-sm text-[#555555] leading-relaxed">
                These terms shall be interpreted, construed, and enforced exclusively in accordance with the laws of the Republic of India. Any legal dispute or proceeding shall be subject to the exclusive jurisdiction of the competent courts of Mumbai, Maharashtra.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer tagline="Authentic formulations. Integrity in commerce. Artisanal excellence." />
    </>
  );
}
