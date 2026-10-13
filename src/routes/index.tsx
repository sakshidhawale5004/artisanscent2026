import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, ChevronRight, Heart, Menu, Minus, Pause, Play, Plus, Search, ShoppingBag, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, money, type Product } from '@/lib/products';
import heroPoster from '@/assets/hero-poster.jpg.asset.json';
import { EntranceLoader } from '@/components/EntranceLoader';

const ScentSculpture = lazy(() => import('@/components/ScentSculpture'));
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Artisan Scents — Premium Fragrances & Essential Oils' },
    { name: 'description', content: 'Discover Artisan Scents: luxury perfumes, pure essential oils, car diffusers, and handcrafted agarbatti. Crafted with botanical expertise.' },
    { property: 'og:title', content: 'Artisan Scents — Premium Fragrances' },
    { property: 'og:description', content: 'Premium fragrances. Botanical expertise. Artisanal excellence.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState('All Products');
  const [selected, setSelected] = useState<Product>();
  const [bag, setBag] = useState<Record<string, number>>({});
  const [panel, setPanel] = useState<'bag' | 'search' | 'menu' | 'story' | null>(null);
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const close = () => { setPanel(null); setSelected(undefined); setCheckout(false); };
  const totalItems = Object.values(bag).reduce((a, b) => a + b, 0);
  const total = products.reduce((sum, p) => sum + p.price * (bag[p.id] || 0), 0);
  useEffect(() => { setMounted(true); if (matchMedia('(prefers-reduced-motion: reduce)').matches) { video.current?.pause(); setPaused(true); } }, []);
  useEffect(() => {
    if (!panel && !selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const listener = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    document.addEventListener('keydown', listener);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', listener); };
  }, [panel, selected]);
  const add = (p: Product) => { setBag(old => ({ ...old, [p.id]: (old[p.id] || 0) + 1 })); setSelected(undefined); setPanel('bag'); setCheckout(false); };
  const update = (id: string, amount: number) => setBag(old => ({ ...old, [id]: Math.max(0, (old[id] || 0) + amount) }));
  const toggleSaved = (id: string) => setSaved(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  const filtered = products.filter(p => {
    if (filter === 'All Products') return true;
    if (filter === 'Perfumes') return p.category === 'perfumes';
    if (filter === 'Oils') return p.category === 'essence-oils';
    if (filter === 'Car Perfumes') return p.category === 'car-perfumes';
    if (filter === 'Agarbatti') return p.category === 'agarbatti';
    if (filter === 'Soaps') return p.category === 'soaps';
    return true;
  });

  return <>
    <EntranceLoader />
    <div className="announcement">Luxury Fragrances. Botanical Excellence. Artisanal Craftsmanship. <span className="ml-3">✦</span></div>
    <header className="site-header">
      <nav className="nav-links" aria-label="Main navigation"><a href="#collection">Collection</a><a href="/about">About</a><a href="/contact">Contact</a></nav>
      <Button variant="cinema" size="icon" className="md:hidden" aria-label="Open menu" onClick={() => setPanel('menu')}><Menu /></Button>
      <a className="wordmark" href="#" aria-label="Artisan Scents home">ARTISAN<span className="text-gold">SCENTS</span></a>
      <div className="flex items-center gap-2 ml-auto"><Button variant="cinema" size="icon" aria-label="Search fragrances" title="Search products" onClick={() => setPanel('search')}><Search /></Button><Button variant="cinema" className="text-[11px]" aria-label={`Shopping bag, ${totalItems} items`} onClick={() => setPanel('bag')}><ShoppingBag /><span className="hidden sm:inline">Bag</span> ({totalItems})</Button></div>
    </header>
    <main>
      <section className="hero text-white" style={{
        minHeight: '620px',
        backgroundImage: 'url(/assets/project\ site/artisan\ scent\ \(31\).webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="relative min-h-full flex flex-col justify-between z-10" style={{padding: '95px 7% 30px'}}>
          <div>
            <div className="eyebrow text-gold">LUXURY FRAGRANCES & ESSENCES</div>
            <h1 className="hero-title text-white">Discover Your<br /><em className="text-gold">Signature Scent</em></h1>
            <p className="hero-copy">Artisan Scents brings together premium perfumes, pure essential oils, botanical fragrances, and handcrafted incense. Each product is a testament to our commitment to quality and artisanal excellence.</p>
            <Button variant="luxury" asChild className="mt-8"><a href="#collection">Explore the Collection <ArrowRight className="ml-5" /></a></Button>
          </div>
          <div className="flex justify-between items-center">
            <span className="sequence text-sm">01 <span className="opacity-40">/ 05</span></span>
            <a href="#collection" className="flex items-center gap-3 text-sm"><span>SCROLL TO DISCOVER</span> <ArrowDown size={12} /></a>
          </div>
        </div>
      </section>

      <section id="collection" className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow text-muted-foreground">OUR COLLECTION</div>
            <h2 className="section-title">Five Categories of Luxury</h2>
          </div>
          <Button variant="editorial" onClick={() => {setFilter('All Products');}}>View all <ArrowRight /></Button>
        </div>
        
        <div className="collection-tabs" role="tablist" aria-label="Product category">
          {['All Products', 'Perfumes', 'Oils', 'Car Perfumes', 'Agarbatti'].map(f => (
            <Button key={f} variant="tab" role="tab" aria-selected={filter === f} data-active={filter === f} onClick={() => setFilter(f)}>
              {f}
            </Button>
          ))}
        </div>
        
        <div className="product-grid">
          {filtered.slice(0, 6).map(p => (
            <article key={p.id}>
              <div className="product-image" style={{backgroundColor: p.category === 'essence-oils' ? '#faf5f0' : p.category === 'car-perfumes' ? '#f0f0f0' : p.category === 'agarbatti' ? '#fef3c7' : '#f5e6d3'}}>
                <a href={`#${p.id}`} onClick={e => { e.preventDefault(); setSelected(p); }}>
                  <img src={p.image} alt={`${p.name}`} width={1024} height={1024} loading="lazy" style={{objectFit: 'contain', padding: '20px'}} />
                </a>
                <span className="product-badge">{p.badge}</span>
                <Button variant="ghost" size="icon" className="absolute right-2 top-2" aria-label={`${saved.includes(p.id) ? 'Unsave' : 'Save'} ${p.name}`} aria-pressed={saved.includes(p.id)} onClick={() => toggleSaved(p.id)}><Heart className={saved.includes(p.id) ? 'fill-foreground' : ''} /></Button>
              </div>
              <div className="product-info">
                <div>
                  <a href={`#${p.id}`} onClick={e => {e.preventDefault(); setSelected(p);}} className="product-name">{p.name}</a>
                  <p className="product-notes">{p.notes}</p>
                  <div className="text-[9px] text-muted-foreground capitalize">{p.category.replace('-', ' ')}</div>
                </div>
                <span className="product-price">{money(p.price)}</span>
              </div>
              <Button variant="editorial" className="mt-3 w-full" onClick={() => add(p)}>Add to bag <Plus size={14} /></Button>
            </article>
          ))}
        </div>
      </section>

      <section className="ritual-strip">
        <span><Sparkles size={16} strokeWidth={1} /> Handcrafted with Care</span>
        <span><ShoppingBag size={16} strokeWidth={1} /> Premium Quality</span>
        <span><Heart size={16} strokeWidth={1} /> Botanical Excellence</span>
      </section>

      <section className="section bg-stone-50">
        <h2 className="section-title mb-10 text-center">Our Product Categories</h2>
        <div className="grid md:grid-cols-5 gap-6">
          <a href="/perfumes" className="group text-center">
            <div className="aspect-square bg-amber-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-amber-200 transition">
              <span className="text-4xl">💎</span>
            </div>
            <h3 className="font-display text-lg mb-2">Perfumes</h3>
            <p className="text-xs text-muted-foreground">Luxury compositions</p>
          </a>
          <a href="/essence-oils" className="group text-center">
            <div className="aspect-square bg-green-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-green-200 transition">
              <span className="text-4xl">🌿</span>
            </div>
            <h3 className="font-display text-lg mb-2">Essence Oils</h3>
            <p className="text-xs text-muted-foreground">Pure botanical extracts</p>
          </a>
          <a href="/car-perfumes" className="group text-center">
            <div className="aspect-square bg-blue-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-blue-200 transition">
              <span className="text-4xl">🚗</span>
            </div>
            <h3 className="font-display text-lg mb-2">Car Perfumes</h3>
            <p className="text-xs text-muted-foreground">Stylish diffusers</p>
          </a>
          <a href="/agarbatti" className="group text-center">
            <div className="aspect-square bg-orange-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-orange-200 transition">
              <span className="text-4xl">🕯️</span>
            </div>
            <h3 className="font-display text-lg mb-2">Agarbatti</h3>
            <p className="text-xs text-muted-foreground">Sacred incense</p>
          </a>
          <a href="/about" className="group text-center">
            <div className="aspect-square bg-purple-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-purple-200 transition">
              <span className="text-4xl">📖</span>
            </div>
            <h3 className="font-display text-lg mb-2">About</h3>
            <p className="text-xs text-muted-foreground">Our story & KEOMC</p>
          </a>
        </div>
      </section>

      <section id="maison" className="maison">
        <div className="maison-canvas">{mounted && <Suspense fallback={null}><ScentSculpture /></Suspense>}</div>
        <div className="maison-copy">
          <div className="eyebrow text-gold">THE ARTISAN SCENTS MISSION</div>
          <h2 className="section-title">More than a fragrance.<br /><em>A way of life.</em></h2>
          <p>At Artisan Scents, we believe that fragrance is an invisible signature—an intimate expression of who you are. We work with KEOMC's botanical expertise to source the finest aromatic plants and essential oils, crafting products that turn fleeting moments into lasting memories.</p>
          <Button variant="luxury" asChild><a href="/about">Discover our story <ArrowRight /></a></Button>
        </div>
        <span className="maison-caption">HANDCRAFTED SINCE INCEPTION · 100% NATURAL</span>
      </section>

      <section id="journal" className="section journal">
        <img src={products[0]?.image} alt="Premium fragrance collection" width={1024} height={1024} loading="lazy" style={{objectFit: 'contain'}} />
        <div>
          <div className="eyebrow text-muted-foreground">THE ARTISAN DIFFERENCE</div>
          <h2 className="section-title">Crafted with<br /><em>intention.</em></h2>
          <p>Every Artisan Scents product is carefully formulated using natural botanical extracts and essential oils. From our luxury perfumes to our pure essence oils, each item reflects our commitment to quality, sustainability, and artisanal excellence.</p>
          <Button variant="editorial" onClick={() => setPanel('story')}>Learn more <ArrowRight /></Button>
        </div>
      </section>
    </main>
    <footer className="footer">
      <div className="footer-top">
        <div>
          <a href="#" className="wordmark">ARTISAN<span className="text-gold">SCENTS</span></a>
          <p className="text-[11px] text-muted-foreground mt-2">Premium fragrances. Botanical expertise. Artisanal excellence.</p>
        </div>
        <div className="max-w-sm w-full">
          <div className="font-display text-2xl mb-3">A note from Artisan Scents</div>
          <form className="flex border-b border-foreground" onSubmit={e => {e.preventDefault(); setSubscribed(true);}}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required aria-label="Your email address" placeholder="Your email address" className="bg-transparent outline-none text-[11px] flex-1 min-w-0" />
            <Button variant="ghost" size="icon" aria-label="Subscribe">{subscribed ? <Check /> : <ArrowRight />}</Button>
          </form>
          {subscribed && <p className="status-note mt-2">Thank you. Newsletter delivery is not connected yet.</p>}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Artisan Scents. All rights reserved.</span>
        <span>FRAGRANCE IS PERSONAL. MAKE IT YOURS.</span>
        <span><a href="/about">About</a> · <a href="#">Privacy</a></span>
      </div>
    </footer>
    {(selected || panel) && <div className={`overlay ${panel === 'bag' ? 'bag-overlay' : ''}`} onClick={close}>
      <div role="dialog" aria-modal="true" aria-label={selected?.name || (panel === 'bag' ? 'Your shopping bag' : panel === 'search' ? 'Search products' : panel === 'story' ? 'Artisan Scents Story' : 'Navigation')} className={`dialog ${panel === 'bag' ? 'bag-panel' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="dialog-header">
          <h2 className="font-display text-3xl">{selected ? selected.name : panel === 'bag' ? `Your bag (${totalItems})` : panel === 'search' ? 'Find your fragrance' : panel === 'menu' ? 'ARTISAN SCENTS' : 'Our Commitment to Quality'}</h2>
          <Button variant="ghost" size="icon" aria-label="Close" autoFocus onClick={close}><X /></Button>
        </div>
        {selected && <div className="detail-grid"><img src={selected.image} alt={selected.name} style={{objectFit: 'contain'}} /><div><div className="eyebrow text-muted-foreground">{selected.family} · {selected.category}</div><h3 className="section-title">{selected.name}</h3><p className="text-sm leading-7 my-5">{selected.description}</p><p className="product-notes">{selected.notes}</p>{selected.botanicalName && <p className="text-xs my-2 text-muted-foreground">{selected.botanicalName}</p>}<p className="text-sm my-5">{selected.size || '100 ml'} · {money(selected.price)}</p><Button className="w-full" onClick={() => add(selected)}>Add to bag <Plus /></Button></div></div>}
        {panel === 'bag' && <><div className="bag-list">{totalItems === 0 ? <div className="py-16 text-center"><ShoppingBag className="mx-auto mb-5 text-muted-foreground" /><h3 className="font-display text-3xl">A fragrance awaits.</h3><p className="status-note my-4">Your bag is currently empty.</p><Button variant="editorial" onClick={close}>Explore the collection <ArrowRight /></Button></div> : products.filter(p => (bag[p.id] || 0) > 0).map(p => <div className="bag-item" key={p.id}><img src={p.image} alt={p.name} style={{objectFit: 'contain'}} /><div><div className="flex justify-between"><h3 className="font-display text-xl">{p.name}</h3><span className="text-xs">{money(p.price * (bag[p.id] || 0))}</span></div><p className="product-notes capitalize">{p.category.replace('-', ' ')}</p><div className="quantity"><Button variant="outline" size="icon" aria-label={`Remove one ${p.name}`} onClick={() => update(p.id, -1)}><Minus /></Button><span className="text-xs">{bag[p.id]}</span><Button variant="outline" size="icon" aria-label={`Add one ${p.name}`} onClick={() => update(p.id, 1)}><Plus /></Button></div></div></div>)}</div>{totalItems > 0 && <div className="pt-6"><div className="flex justify-between text-sm mb-4"><span>Subtotal</span><span>{money(total)}</span></div><Button className="w-full h-12" onClick={() => setCheckout(true)}>Continue to checkout <ArrowRight /></Button><p className="status-note mt-3">{checkout ? 'This is a preview store. Payments and order processing are not connected; no charge has been made.' : 'Shipping and taxes calculated at checkout.'}</p></div>}</>}
        {panel === 'search' && <><input className="search-input" aria-label="Search by product name or note" placeholder="Search a fragrance, an oil, a scent…" value={query} onChange={e => setQuery(e.target.value)} /><div className="search-results">{products.filter(p => `${p.name} ${p.notes} ${p.category}`.toLowerCase().includes(query.toLowerCase())).map(p => <a href={`#${p.id}`} key={p.id} className="bag-item" onClick={e => {e.preventDefault();setPanel(null);setSelected(p);}}><img src={p.image} alt={p.name} style={{objectFit: 'contain'}} /><div><h3 className="font-display text-2xl">{p.name}</h3><p className="product-notes">{p.notes}</p><span className="text-xs">{money(p.price)}</span></div></a>)}{!products.some(p => `${p.name} ${p.notes} ${p.category}`.toLowerCase().includes(query.toLowerCase())) && <p className="status-note py-8">No fragrances found. Try lavender, oud, or rose.</p>}</div></>}
        {panel === 'menu' && <nav className="flex flex-col gap-6 font-display text-3xl">{[['Perfumes','/perfumes'],['Oils','/essence-oils'],['Car Perfumes','/car-perfumes'],['Agarbatti','/agarbatti'],['About','/about']].map(([label,id]) => <a key={id} href={id} onClick={close} className="flex justify-between">{label}<ChevronRight /></a>)}</nav>}
        {panel === 'story' && <div className="max-w-lg mx-auto py-5"><div className="eyebrow text-muted-foreground mb-5">Artisan Scents</div><p className="text-sm leading-8">We believe fragrance is more than a scent—it's a story, a memory, a moment. Each Artisan Scents product is meticulously crafted using natural botanical extracts and essential oils sourced through partnerships with KEOMC.</p><p className="text-sm leading-8 mt-5">From our luxury perfumes to our pure essence oils, every product reflects our commitment to quality, sustainability, and artisanal excellence. We work with aromatic plants from around the world, using traditional distillation methods to preserve their natural essence.</p><p className="font-display text-3xl my-6">Fragrance is personal. Make it yours.</p><Button variant="editorial" onClick={() => {close();document.getElementById('collection')?.scrollIntoView({behavior:'smooth'});}}>Explore our collection <ArrowRight /></Button></div>}
      </div>
    </div>}
  </>;
}
