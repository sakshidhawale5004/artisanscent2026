import { createFileRoute } from "@tanstack/react-router";
import { useState } from 'react';
import { ArrowRight, Heart, Plus, Search, ShoppingBag, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, money, type Product } from '@/lib/products';
import { Header } from '@/components/Header';

export const Route = createFileRoute("/perfumes")({
  head: () => ({ meta: [
    { title: 'Luxury Perfumes | Artisan Scents' },
    { name: 'description', content: 'Discover our collection of luxury perfumes. Sophisticated compositions crafted for special occasions and personal wear.' },
  ] }),
  component: PerfumesPage,
});

function PerfumesPage() {
  const [selected, setSelected] = useState<Product>();
  const [bag, setBag] = useState<Record<string, number>>({});
  const [panel, setPanel] = useState<'bag' | 'search' | null>(null);
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  
  const perfumes = products.filter(p => p.category === 'perfumes');
  const close = () => { setPanel(null); setSelected(undefined); };
  const totalItems = Object.values(bag).reduce((a, b) => a + b, 0);
  const total = products.reduce((sum, p) => sum + p.price * (bag[p.id] || 0), 0);
  
  const add = (p: Product) => { setBag(old => ({ ...old, [p.id]: (old[p.id] || 0) + 1 })); setSelected(undefined); setPanel('bag'); };
  const update = (id: string, amount: number) => setBag(old => ({ ...old, [id]: Math.max(0, (old[id] || 0) + amount) }));
  const toggleSaved = (id: string) => setSaved(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);

  return <>
    <div className="announcement">Luxury Fragrances. Premium Expressions. <span className="ml-3">✦</span></div>
    <Header
      currentPage="Shop"
      onSearchClick={() => setPanel('search')}
      onBagClick={() => setPanel('bag')}
      totalItems={totalItems}
    />

    <main>
      <section className="hero text-white" style={{
        height: '400px',
        backgroundImage: 'url(/assets/project\ site/artisan\ scent\ \(13\).webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center z-10">
          <div className="px-[7%] max-w-2xl">
            <div className="eyebrow text-gold">LUXURY COLLECTION</div>
            <h1 className="hero-title text-white">Discover Our<br/><em className="text-gold">Signature Perfumes</em></h1>
            <p className="hero-copy">Sophisticated fragrances crafted for those who appreciate fine artisanal composition and lasting elegance.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow text-muted-foreground">THE COLLECTION</div>
            <h2 className="section-title">Timeless Elegance</h2>
          </div>
        </div>
        
        <div className="product-grid">
          {perfumes.map(p => (
            <article key={p.id}>
              <div className="product-image" style={{backgroundColor: '#f5e6d3'}}>
                <a href={`/products/${p.id}`}>
                  <img src={p.image} alt={`${p.name} perfume bottle`} width={1024} height={1024} loading="lazy" style={{objectFit: 'contain', padding: '20px'}} />
                </a>
                <span className="product-badge text-gold">{p.badge}</span>
                <Button variant="ghost" size="icon" className="absolute right-2 top-2" aria-label={`${saved.includes(p.id) ? 'Unsave' : 'Save'} ${p.name}`} onClick={() => toggleSaved(p.id)}>
                  <Heart className={saved.includes(p.id) ? 'fill-foreground' : ''} />
                </Button>
              </div>
              <div className="product-info">
                <div>
                  <a href={`/products/${p.id}`} className="product-name">{p.name}</a>
                  <p className="product-notes">{p.notes}</p>
                  <div className="text-[9px] text-muted-foreground">EAU DE PARFUM · 100 ML</div>
                </div>
                <span className="product-price">{money(p.price)}</span>
              </div>
              <Button variant="editorial" className="mt-3 w-full" onClick={() => add(p)}>Add to bag <Plus size={14} /></Button>
            </article>
          ))}
        </div>
      </section>
    </main>

    <footer className="footer" style={{marginTop: '70px'}}>
      <div className="footer-top">
        <div>
          <a href="/" className="wordmark">ARTISAN<span className="text-gold">SCENTS</span></a>
          <p className="text-[11px] text-muted-foreground mt-2">Luxury fragrances. Premium expressions.</p>
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
            <h2 className="font-display text-3xl">{selected ? selected.name : panel === 'bag' ? `Your bag (${totalItems})` : 'Search fragrances'}</h2>
            <Button variant="ghost" size="icon" aria-label="Close" autoFocus onClick={close}><X /></Button>
          </div>

          {selected && (
            <div className="detail-grid">
              <img src={selected.image} alt={selected.name} style={{objectFit: 'contain'}} />
              <div>
                <div className="eyebrow text-muted-foreground">Luxury · Eau de parfum</div>
                <h3 className="section-title">{selected.name}</h3>
                <p className="text-sm leading-7 my-5">{selected.description}</p>
                <p className="product-notes">{selected.notes}</p>
                <p className="text-sm my-5">100 ml · {money(selected.price)}</p>
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
                    <p className="status-note my-4">Start building your collection</p>
                    <Button variant="editorial" onClick={close}>Continue shopping <ArrowRight /></Button>
                  </div>
                ) : (
                  products.filter(p => (bag[p.id] || 0) > 0).map(p => (
                    <div className="bag-item" key={p.id}>
                      <img src={p.image} alt={p.name} style={{objectFit: 'contain'}} />
                      <div>
                        <div className="flex justify-between">
                          <h3 className="font-display text-xl">{p.name}</h3>
                          <span className="text-xs">{money(p.price * (bag[p.id] || 0))}</span>
                        </div>
                        <p className="product-notes">{p.category}</p>
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
              <input className="search-input" placeholder="Search by fragrance name..." value={query} onChange={e => setQuery(e.target.value)} />
              <div className="search-results">
                {perfumes.filter(p => `${p.name} ${p.notes}`.toLowerCase().includes(query.toLowerCase())).map(p => (
                  <a href={`#${p.id}`} key={p.id} className="bag-item" onClick={e => {e.preventDefault();setPanel(null);setSelected(p);}}>
                    <img src={p.image} alt={p.name} style={{objectFit: 'contain'}} />
                    <div>
                      <h3 className="font-display text-2xl">{p.name}</h3>
                      <p className="product-notes">{p.notes}</p>
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
