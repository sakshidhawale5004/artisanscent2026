import { createFileRoute } from "@tanstack/react-router";
import { useState } from 'react';
import { ArrowRight, Heart, Plus, Search, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, money, type Product } from '@/lib/products';

export const Route = createFileRoute("/essence-oils")({
  head: () => ({ meta: [
    { title: 'Premium Essence Oils | Artisan Scents' },
    { name: 'description', content: 'Discover our collection of pure essence oils. Sourced from aromatic plants using traditional steam distillation methods.' },
  ] }),
  component: EssenceOilsPage,
});

function EssenceOilsPage() {
  const [selected, setSelected] = useState<Product>();
  const [bag, setBag] = useState<Record<string, number>>({});
  const [panel, setPanel] = useState<'bag' | 'search' | null>(null);
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  
  const essenceOils = products.filter(p => p.category === 'essence-oils');
  const close = () => { setPanel(null); setSelected(undefined); };
  const totalItems = Object.values(bag).reduce((a, b) => a + b, 0);
  const total = products.reduce((sum, p) => sum + p.price * (bag[p.id] || 0), 0);
  
  const add = (p: Product) => { setBag(old => ({ ...old, [p.id]: (old[p.id] || 0) + 1 })); setSelected(undefined); setPanel('bag'); };
  const update = (id: string, amount: number) => setBag(old => ({ ...old, [id]: Math.max(0, (old[id] || 0) + amount) }));
  const toggleSaved = (id: string) => setSaved(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);

  return <>
    <div className="announcement">Pure · Natural · Therapeutic Grade Essential Oils <span className="ml-3">✦</span></div>
    <header className="site-header">
      <nav className="nav-links" aria-label="Main navigation"><a href="/">Home</a><a href="/about">About</a><a href="/contact">Contact</a></nav>
      <a className="wordmark" href="/" aria-label="Artisan Scents home">ARTISAN<span className="text-gold">SCENTS</span></a>
      <div className="flex items-center gap-2 ml-auto"><Button variant="cinema" size="icon" aria-label="Search" onClick={() => setPanel('search')}><Search /></Button><Button variant="cinema" className="text-[11px]" aria-label={`Shopping bag, ${totalItems} items`} onClick={() => setPanel('bag')}><ShoppingBag /><span className="hidden sm:inline">Bag</span> ({totalItems})</Button></div>
    </header>

    <main>
      <section className="hero text-white" style={{
        height: '400px',
        backgroundImage: 'url(/assets/exibition/artisan\ scent\ \(1\).webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center z-10">
          <div className="px-[7%] max-w-2xl">
            <div className="eyebrow text-green-300">BOTANICAL COLLECTION</div>
            <h1 className="hero-title text-white">Premium Essential<br/><em className="text-green-300">Oils & Essences</em></h1>
            <p className="hero-copy">Pure aromatic extracts from the world's finest plants. Sourced ethically, distilled traditionally, crafted with care.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow text-muted-foreground">PURE BOTANICAL ESSENCES</div>
            <h2 className="section-title">Nature's Fragrance</h2>
          </div>
        </div>
        
        <div className="section bg-stone-50 rounded-lg p-6 mb-10">
          <h3 className="font-display text-2xl mb-4">About Our Essence Oils</h3>
          <p className="text-sm leading-relaxed text-muted-foreground mb-3">Our essence oils are extracted using traditional steam distillation methods from aromatic and medicinal plants. Each oil is carefully processed to preserve the plant's natural fragrance compounds and therapeutic properties.</p>
          <p className="text-sm leading-relaxed text-muted-foreground">Available in multiple sizes: 10 ml sample, 100 ml, 500 ml, and bulk 1 litre quantities. Sample credit policies available for wholesale partners.</p>
        </div>

        <div className="product-grid">
          {essenceOils.map(p => (
            <article key={p.id}>
              <div className="product-image" style={{backgroundColor: '#faf5f0'}}>
                <a href={`#${p.id}`} onClick={e => { e.preventDefault(); setSelected(p); }}>
                  <img src={p.image} alt={`${p.name} bottle`} width={1024} height={1024} loading="lazy" style={{objectFit: 'contain', padding: '20px'}} />
                </a>
                <span className="product-badge text-green-700">{p.badge}</span>
                <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={() => toggleSaved(p.id)}>
                  <Heart className={saved.includes(p.id) ? 'fill-foreground' : ''} />
                </Button>
              </div>
              <div className="product-info">
                <div>
                  <a href={`#${p.id}`} onClick={e => {e.preventDefault(); setSelected(p);}} className="product-name">{p.name}</a>
                  <p className="product-notes text-xs">{p.botanicalName}</p>
                  <p className="product-notes text-xs">{p.notes}</p>
                  <div className="text-[9px] text-muted-foreground mt-1">{p.size || '10 ML'}</div>
                </div>
                <span className="product-price">{money(p.price)}</span>
              </div>
              <Button variant="editorial" className="mt-3 w-full" onClick={() => add(p)}>Add to bag <Plus size={14} /></Button>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-green-50">
        <h2 className="section-title mb-8">Sample Pack Options</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-green-200">
            <h3 className="font-display text-xl mb-2">Starter Sample Kit</h3>
            <p className="text-sm mb-3">5 Oils × 5 ml each</p>
            <p className="text-2xl font-bold text-green-700">₹999</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-green-200">
            <h3 className="font-display text-xl mb-2">Professional Sample Kit</h3>
            <p className="text-sm mb-3">10 Oils × 5 ml each</p>
            <p className="text-2xl font-bold text-green-700">₹1,799</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-green-200">
            <h3 className="font-display text-xl mb-2">Premium Perfumery Kit</h3>
            <p className="text-sm mb-3">5 Premium Oils</p>
            <p className="text-2xl font-bold text-green-700">₹2,499</p>
          </div>
        </div>
      </section>
    </main>

    <footer className="footer" style={{marginTop: '70px'}}>
      <div className="footer-top">
        <div>
          <a href="/" className="wordmark">ARTISAN<span className="text-gold">SCENTS</span></a>
          <p className="text-[11px] text-muted-foreground mt-2">Pure natural therapeutic oils.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Artisan Scents. All rights reserved.</span>
      </div>
    </footer>

    {(selected || panel) && (
      <div className={`overlay ${panel === 'bag' ? 'bag-overlay' : ''}`} onClick={close}>
        <div role="dialog" aria-modal="true" className={`dialog ${panel === 'bag' ? 'bag-panel' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="dialog-header">
            <h2 className="font-display text-3xl">{selected ? selected.name : panel === 'bag' ? `Your bag (${totalItems})` : 'Search oils'}</h2>
            <Button variant="ghost" size="icon" autoFocus onClick={close}><X /></Button>
          </div>

          {selected && (
            <div className="detail-grid">
              <img src={selected.image} alt={selected.name} style={{objectFit: 'contain'}} />
              <div>
                <div className="eyebrow text-muted-foreground">{selected.botanicalName}</div>
                <h3 className="section-title">{selected.name}</h3>
                <p className="text-sm leading-7 my-5">{selected.description}</p>
                <p className="product-notes">{selected.notes}</p>
                <p className="text-sm my-5">{selected.size || '10 ml'} · {money(selected.price)}</p>
                <Button className="w-full" onClick={() => add(selected)}>Add to bag <Plus /></Button>
              </div>
            </div>
          )}

          {panel === 'bag' && (
            <>
              <div className="bag-list">
                {totalItems === 0 ? (
                  <div className="py-16 text-center">
                    <ShoppingBag className="mx-auto mb-5 text-muted-foreground" />
                    <h3 className="font-display text-3xl">Your bag is empty</h3>
                    <Button variant="editorial" onClick={close}>Continue shopping <ArrowRight /></Button>
                  </div>
                ) : (
                  products.filter(p => (bag[p.id] || 0) > 0).map(p => (
                    <div className="bag-item" key={p.id}>
                      <img src={p.image} alt={p.name} style={{objectFit: 'contain'}} />
                      <div>
                        <div className="flex justify-between">
                          <h3 className="font-display text-lg">{p.name}</h3>
                          <span className="text-xs">{money(p.price * (bag[p.id] || 0))}</span>
                        </div>
                        <div className="quantity">
                          <Button variant="outline" size="icon" onClick={() => update(p.id, -1)}><Plus size={14} className="rotate-45" /></Button>
                          <span className="text-xs">{bag[p.id]}</span>
                          <Button variant="outline" size="icon" onClick={() => update(p.id, 1)}><Plus size={14} /></Button>
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
                  <Button className="w-full h-12">Continue to checkout <ArrowRight /></Button>
                </div>
              )}
            </>
          )}

          {panel === 'search' && (
            <>
              <input className="search-input" placeholder="Search by oil name..." value={query} onChange={e => setQuery(e.target.value)} />
              <div className="search-results">
                {essenceOils.filter(p => `${p.name} ${p.botanicalName}`.toLowerCase().includes(query.toLowerCase())).map(p => (
                  <a href={`#${p.id}`} key={p.id} className="bag-item" onClick={e => {e.preventDefault();setPanel(null);setSelected(p);}}>
                    <img src={p.image} alt={p.name} style={{objectFit: 'contain'}} />
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
  </>;
}
