import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: 'About Artisan Scents | KEOMC' },
    { name: 'description', content: 'Learn about Artisan Scents and KEOMC. Premium fragrance sourcing, botanical expertise, and artisanal craftsmanship.' },
  ] }),
  component: AboutPage,
});

function AboutPage() {
  return <>
    <div className="announcement">Crafting Fragrance. Building Dreams. <span className="ml-3">✦</span></div>
    <Header currentPage="About" />

    <main>
      <section className="hero text-white" style={{
        height: '350px',
        backgroundImage: 'url(/assets/project\ site/artisan\ scent\ \(30\).webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center z-10">
          <div className="px-[7%] max-w-3xl">
            <div className="eyebrow text-gold">OUR STORY</div>
            <h1 className="hero-title text-white">Artisan Scents &<br/><em className="text-gold">The KEOMC Legacy</em></h1>
            <p className="hero-copy">Premium fragrance crafted with botanical expertise and a commitment to sustainability and artisanal excellence.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl">
          <h2 className="section-title mb-8">About Artisan Scents</h2>
          <p className="text-sm leading-relaxed mb-6 text-muted-foreground">Artisan Scents is a premium fragrance brand operating across a diverse portfolio of fragrance products and related solutions. With a focus on the fragrance and flavours sector, the brand brings together products such as essential oils, essence oils, perfumes, car perfumes, soaps, and agarbatti.</p>
          <p className="text-sm leading-relaxed mb-6 text-muted-foreground">Our approach centres on understanding fragrance preferences, exploring product possibilities, and delivering solutions aligned with evolving customer and business requirements. From everyday fragrance experiences to specialised fragrance and flavour applications, Artisan Scents aims to build meaningful connections through the world of scent.</p>
        </div>
      </section>

      <section className="section bg-stone-50">
        <div className="max-w-4xl">
          <h2 className="section-title mb-8">About KEOMC</h2>
          <p className="text-sm leading-relaxed mb-6 text-muted-foreground font-semibold">Kulswami Essence Oil Manufacturing Company (KEOMC)</p>
          <p className="text-sm leading-relaxed mb-6 text-muted-foreground">KEOMC is a specialized manufacturing partner processing different types of Aromatic and Medicinal Plants like Geranium, Citronella, Lemongrass, Vetiver, Patchouli, and more to recover premium essence oils. Essential oils are extracted using the traditional steam distillation method, ensuring quality and purity.</p>
          
          <h3 className="font-display text-2xl mb-4 mt-8">Key Services & Expertise</h3>
          <div className="space-y-3 mb-6">
            <p className="text-sm"><span className="font-semibold">Design & Manufacturing:</span> Soap, perfume, car perfume, and agarbatti production</p>
            <p className="text-sm"><span className="font-semibold">Skill Development:</span> Training programs for fragrance and flavour professionals</p>
            <p className="text-sm"><span className="font-semibold">Consultancy Services:</span> Technical know-how and guidance for aromatic and medicinal plant cultivation</p>
            <p className="text-sm"><span className="font-semibold">Agro Technology:</span> Specialized agricultural services for botanical sourcing</p>
            <p className="text-sm"><span className="font-semibold">Engineering Services:</span> Technical consultation and on-site guidance</p>
            <p className="text-sm"><span className="font-semibold">Seed & Planting Material Supply:</span> Premium botanical seeds and propagation material</p>
            <p className="text-sm"><span className="font-semibold">Feasibility Studies:</span> Comprehensive reports for fragrance business establishment</p>
            <p className="text-sm"><span className="font-semibold">Field Distillation:</span> On-the-spot consultancy and job work basis distillation services</p>
            <p className="text-sm"><span className="font-semibold">Herbal Gardens:</span> Establishment and consultancy for aromatic and herbal gardens</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl">
          <h2 className="section-title mb-8">Our Product Range</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-xl mb-4">Essence Oils</h3>
              <ul className="space-y-2 text-sm">
                <li>✦ Lavender Oil - Calming, versatile</li>
                <li>✦ Vetiver (Khus) Oil - Deep, earthy</li>
                <li>✦ Geranium Oil - Sweet, floral</li>
                <li>✦ Lemongrass Oil - Fresh, citrus</li>
                <li>✦ Rosemary Oil - Herbal, refreshing</li>
                <li>✦ Patchouli Oil - Rich, exotic</li>
                <li>✦ Citronella Oil - Fresh, herbal</li>
                <li>✦ Palmarosa Oil - Rose-like, sweet</li>
                <li>✦ Menthol Mint Oil - Cooling, refreshing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl mb-4">Luxury Fragrances</h3>
              <ul className="space-y-2 text-sm">
                <li>✦ Premium Perfumes - Sophisticated compositions</li>
                <li>✦ Car Perfumes - Stylish diffusers</li>
                <li>✦ Handcrafted Soaps - Luxury personal care</li>
                <li>✦ Agarbatti - Traditional incense</li>
                <li>✦ Sample Kits - Professional collections</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-green-50">
        <div className="max-w-4xl">
          <h2 className="section-title mb-8">Pricing & Wholesale</h2>
          
          <div className="mb-8">
            <h3 className="font-display text-xl mb-4">Essence Oil Pricing - Retail</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Lavender Oil:</span> ₹450 / 10 ml | ₹30,000 / Litre</p>
              <p><span className="font-semibold">Vetiver (Khus) Oil:</span> ₹650 / 10 ml | ₹45,000 / Litre</p>
              <p><span className="font-semibold">Geranium Oil:</span> ₹550 / 10 ml | ₹39,000 / Litre</p>
              <p><span className="font-semibold">Lemongrass Oil:</span> ₹299 / 10 ml | ₹19,500 / Litre</p>
              <p><span className="font-semibold">Rosemary Oil:</span> ₹399 / 10 ml | ₹27,000 / Litre</p>
              <p><span className="font-semibold">Patchouli Oil:</span> ₹599 / 10 ml | ₹43,000 / Litre</p>
              <p><span className="font-semibold">Citronella Oil:</span> ₹275 / 10 ml | ₹17,500 / Litre</p>
              <p><span className="font-semibold">Palmarosa Oil:</span> ₹425 / 10 ml | ₹29,000 / Litre</p>
              <p><span className="font-semibold">Menthol Mint Oil:</span> ₹325 / 10 ml | ₹22,000 / Litre</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-xl mb-4">Wholesale Pricing</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-green-300">
                    <th className="text-left py-2 px-2">Oil Type</th>
                    <th className="text-right py-2 px-2">100 ml</th>
                    <th className="text-right py-2 px-2">500 ml</th>
                    <th className="text-right py-2 px-2">1 Litre</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-200">
                  <tr><td className="py-2 px-2">Lavender</td><td className="text-right">₹3,800</td><td className="text-right">₹16,500</td><td className="text-right">₹30,000</td></tr>
                  <tr><td className="py-2 px-2">Vetiver</td><td className="text-right">₹5,500</td><td className="text-right">₹24,000</td><td className="text-right">₹45,000</td></tr>
                  <tr><td className="py-2 px-2">Geranium</td><td className="text-right">₹4,800</td><td className="text-right">₹21,000</td><td className="text-right">₹39,000</td></tr>
                  <tr><td className="py-2 px-2">Lemongrass</td><td className="text-right">₹2,400</td><td className="text-right">₹10,500</td><td className="text-right">₹19,500</td></tr>
                  <tr><td className="py-2 px-2">Rosemary</td><td className="text-right">₹3,300</td><td className="text-right">₹14,500</td><td className="text-right">₹27,000</td></tr>
                  <tr><td className="py-2 px-2">Patchouli</td><td className="text-right">₹5,200</td><td className="text-right">₹23,000</td><td className="text-right">₹43,000</td></tr>
                  <tr><td className="py-2 px-2">Citronella</td><td className="text-right">₹2,200</td><td className="text-right">₹9,500</td><td className="text-right">₹17,500</td></tr>
                  <tr><td className="py-2 px-2">Palmarosa</td><td className="text-right">₹3,600</td><td className="text-right">₹15,500</td><td className="text-right">₹29,000</td></tr>
                  <tr><td className="py-2 px-2">Menthol Mint</td><td className="text-right">₹2,800</td><td className="text-right">₹12,000</td><td className="text-right">₹22,000</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl mb-4">Sample Pack Options</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Starter Sample Kit:</span> 5 Oils × 5 ml - ₹999</p>
              <p><span className="font-semibold">Professional Sample Kit:</span> 10 Oils × 5 ml - ₹1,799</p>
              <p><span className="font-semibold">Premium Perfumery Kit:</span> Rose, Vetiver, Lavender, Geranium, Patchouli - ₹2,499</p>
              <p className="text-xs mt-3 text-muted-foreground">Sample charges can be adjusted against the first wholesale order above ₹50,000. Complimentary sample kits available for approved distributors.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl">
          <h2 className="section-title mb-8">Wholesale Partner Eligibility</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-stone-50 p-6 rounded-lg">
              <h3 className="font-display text-lg mb-3">We Welcome</h3>
              <ul className="space-y-2 text-sm">
                <li>✦ Distributors</li>
                <li>✦ Wholesalers</li>
                <li>✦ Cosmetic Manufacturers</li>
                <li>✦ Pharmaceutical Companies</li>
                <li>✦ Aromatherapy Brands</li>
                <li>✦ Exporters</li>
                <li>✦ Research Institutions</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="font-display text-lg mb-3">Our Commitment</h3>
              <ul className="space-y-2 text-sm">
                <li>✦ Highest Quality Standards</li>
                <li>✦ Ethical Sourcing</li>
                <li>✦ Sustainable Practices</li>
                <li>✦ Competitive Pricing</li>
                <li>✦ Expert Support</li>
                <li>✦ Flexible Quantities</li>
                <li>✦ Technical Guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-r from-amber-900 to-amber-800 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="section-title text-white mb-4">Ready to Collaborate?</h2>
          <p className="text-white opacity-90 mb-6">Connect with our team for wholesale partnerships, consultancy, or custom fragrance solutions.</p>
          <Button variant="luxury" className="bg-gold text-ink hover:bg-gold/90" asChild>
            <a href="/contact">Get in Touch <ArrowRight className="ml-3" /></a>
          </Button>
        </div>
      </section>
    </main>

    <footer className="footer" style={{marginTop: '70px'}}>
      <div className="footer-top">
        <div>
          <a href="/" className="wordmark">ARTISAN<span className="text-gold">SCENTS</span></a>
          <p className="text-[11px] text-muted-foreground mt-2">Premium fragrances. Botanical expertise. Artisanal excellence.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Artisan Scents & KEOMC. All rights reserved.</span>
      </div>
    </footer>
  </>;
}
