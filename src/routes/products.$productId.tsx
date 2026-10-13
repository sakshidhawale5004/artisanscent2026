import { createFileRoute } from "@tanstack/react-router";
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Minus, Plus, Share2, ShoppingBag, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, money, type Product } from '@/lib/products';
import { Header } from '@/components/Header';

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const product = products.find(p => p.id === params.productId);
    return {
      meta: [
        { title: product ? `${product.name} | Artisan Scents` : 'Product | Artisan Scents' },
        { name: 'description', content: product?.description ?? 'Premium artisan fragrance.' },
      ],
    };
  },
  component: ProductDetailPage,
});

const categoryBreadcrumb: Record<string, { label: string; href: string }> = {
  'perfumes':      { label: 'Perfumes',      href: '/perfumes' },
  'essence-oils':  { label: 'Essence Oils',  href: '/essence-oils' },
  'car-perfumes':  { label: 'Car Perfumes',  href: '/car-perfumes' },
  'agarbatti':     { label: 'Agarbatti',     href: '/agarbatti' },
  'soaps':         { label: 'Soaps',         href: '/' },
};

const categoryBg: Record<string, string> = {
  'perfumes':     '#f5e6d3',
  'essence-oils': '#faf5f0',
  'car-perfumes': '#f0f0f0',
  'agarbatti':    '#fef3c7',
  'soaps':        '#fdf0f0',
};

function StarRating({ rating = 4.5, count = 124 }: { rating?: number; count?: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="product-detail-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < full ? 'star-filled' : half && i === full ? 'star-half' : 'star-empty'}
          fill={i < full ? 'currentColor' : 'none'}
        />
      ))}
      <span className="product-detail-rating-count">({count} reviews)</span>
    </div>
  );
}

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const [bag, setBag] = useState<Record<string, number>>({});
  const [panel, setPanel] = useState<'bag' | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [addedFlash, setAddedFlash] = useState(false);

  const product = products.find(p => p.id === productId);
  const related = products.filter(p => p.category === product?.category && p.id !== productId).slice(0, 4);
  const totalItems = Object.values(bag).reduce((a, b) => a + b, 0);
  const total = products.reduce((sum, p) => sum + p.price * (bag[p.id] || 0), 0);

  const closeBag = () => setPanel(null);

  const addToBag = (p: Product, quantity = 1) => {
    setBag(old => ({ ...old, [p.id]: (old[p.id] || 0) + quantity }));
    setAddedFlash(true);
    setPanel('bag');
    setTimeout(() => setAddedFlash(false), 1500);
  };

  const update = (id: string, amount: number) =>
    setBag(old => ({ ...old, [id]: Math.max(0, (old[id] || 0) + amount) }));

  const toggleSaved = (id: string) =>
    setSaved(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
          <h1 className="font-display text-5xl mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been moved.</p>
          <Button asChild variant="editorial"><a href="/">Return Home <ArrowRight /></a></Button>
        </div>
      </>
    );
  }

  const crumb = categoryBreadcrumb[product.category];
  const bgColor = categoryBg[product.category] || '#f5f5f5';

  // Mock multiple images (same image shown differently for demo)
  const images = [product.image, product.image, product.image];

  return (
    <>
      <div className="announcement">Free Shipping on Orders Above ₹999 <span className="ml-3">✦</span> 7-Day Returns</div>
      <Header
        currentPage="Shop"
        onBagClick={() => setPanel('bag')}
        totalItems={totalItems}
      />

      <main>
        {/* Breadcrumb */}
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="product-breadcrumb-sep">›</span>
          {crumb && <><a href={crumb.href}>{crumb.label}</a><span className="product-breadcrumb-sep">›</span></>}
          <span>{product.name}</span>
        </nav>

        {/* Product Detail Layout */}
        <div className="product-detail-grid section">
          {/* Left: Images */}
          <div className="product-detail-images">
            {/* Thumbnail column */}
            <div className="product-detail-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`product-detail-thumb${activeImg === i ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} style={{ objectFit: 'contain' }} />
                </button>
              ))}
            </div>
            {/* Main image */}
            <div className="product-detail-main-img" style={{ backgroundColor: bgColor }}>
              <img
                src={images[activeImg]}
                alt={product.name}
                style={{ objectFit: 'contain', padding: '40px' }}
              />
              <button
                className={`product-detail-wishlist${saved.includes(product.id) ? ' saved' : ''}`}
                aria-label={saved.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                onClick={() => toggleSaved(product.id)}
              >
                <Heart size={20} fill={saved.includes(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Right: Info */}
          <div className="product-detail-info">
            <div className="eyebrow text-muted-foreground mb-2">
              {product.family} · {product.category.replace('-', ' ').toUpperCase()}
            </div>

            <h1 className="product-detail-title">{product.name}</h1>

            <StarRating />

            <div className="product-detail-price">{money(product.price)}</div>

            <p className="product-detail-description">{product.description}</p>

            {/* Notes */}
            <div className="product-detail-notes-row">
              <div className="eyebrow text-muted-foreground mb-3">Fragrance Notes</div>
              <div className="product-detail-notes">
                {product.notes.split(' · ').map(note => (
                  <span key={note} className="product-detail-note-chip">{note}</span>
                ))}
              </div>
            </div>

            {/* Botanical name if applicable */}
            {product.botanicalName && (
              <p className="text-xs italic text-muted-foreground mb-4">
                Botanical name: <em>{product.botanicalName}</em>
              </p>
            )}

            {/* Size / format */}
            {product.size && (
              <div className="product-detail-size-row">
                <div className="eyebrow text-muted-foreground mb-2">Size</div>
                <button className="product-detail-size-btn active">{product.size}</button>
              </div>
            )}

            {/* Quantity */}
            <div className="product-detail-qty-row">
              <div className="eyebrow text-muted-foreground mb-2">Quantity</div>
              <div className="product-detail-qty">
                <button
                  className="product-detail-qty-btn"
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="product-detail-qty-num">{qty}</span>
                <button
                  className="product-detail-qty-btn"
                  onClick={() => setQty(q => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="product-detail-ctas">
              <Button
                className="product-detail-add-btn"
                onClick={() => addToBag(product, qty)}
              >
                {addedFlash ? '✓ Added to Bag' : <>Add to Bag <ShoppingBag size={16} /></>}
              </Button>
              <button
                className="product-detail-wishlist-btn"
                onClick={() => toggleSaved(product.id)}
                aria-label="Add to wishlist"
              >
                <Heart size={16} fill={saved.includes(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="product-detail-badges">
              <div className="product-detail-badge">🚚 Free Shipping above ₹999</div>
              <div className="product-detail-badge">↩ 7-Day Easy Returns</div>
              <div className="product-detail-badge">✅ 100% Authentic</div>
            </div>

            {/* Accordion details */}
            <details className="product-detail-accordion">
              <summary>Details</summary>
              <div className="product-detail-accordion-body">
                <p>{product.description}</p>
                {product.botanicalName && <p className="mt-2"><strong>Botanical:</strong> {product.botanicalName}</p>}
                <p className="mt-2"><strong>Size:</strong> {product.size || '100 ml'}</p>
                <p className="mt-2"><strong>Category:</strong> {product.category.replace('-', ' ')}</p>
              </div>
            </details>

            <details className="product-detail-accordion">
              <summary>Fragrance Notes</summary>
              <div className="product-detail-accordion-body">
                <p>{product.notes}</p>
              </div>
            </details>

            <details className="product-detail-accordion">
              <summary>Shipping & Returns</summary>
              <div className="product-detail-accordion-body">
                <p>Free shipping on orders above ₹999. Standard delivery 3–5 business days.</p>
                <p className="mt-2">7-day hassle-free return policy. Easy & hassle free.</p>
              </div>
            </details>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="section bg-stone-50">
            <div className="section-heading">
              <div>
                <div className="eyebrow text-muted-foreground">YOU MAY ALSO LIKE</div>
                <h2 className="section-title">Related Products</h2>
              </div>
              {crumb && (
                <Button variant="editorial" asChild>
                  <a href={crumb.href}>View All <ArrowRight /></a>
                </Button>
              )}
            </div>
            <div className="product-grid">
              {related.map(p => (
                <article key={p.id}>
                  <div className="product-image" style={{ backgroundColor: categoryBg[p.category] || '#f5f5f5' }}>
                    <a href={`/products/${p.id}`}>
                      <img src={p.image} alt={p.name} width={600} height={600} loading="lazy" style={{ objectFit: 'contain', padding: '20px' }} />
                    </a>
                    <span className="product-badge">{p.badge}</span>
                    <button
                      className={`absolute right-2 top-2 p-2 text-foreground hover:text-gold transition-colors${saved.includes(p.id) ? ' text-gold' : ''}`}
                      onClick={() => toggleSaved(p.id)}
                      aria-label={`Wishlist ${p.name}`}
                    >
                      <Heart size={16} fill={saved.includes(p.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="product-info">
                    <div>
                      <a href={`/products/${p.id}`} className="product-name">{p.name}</a>
                      <p className="product-notes">{p.notes}</p>
                    </div>
                    <span className="product-price">{money(p.price)}</span>
                  </div>
                  <Button variant="editorial" className="mt-3 w-full" onClick={() => addToBag(p)}>
                    Add to Bag <Plus size={14} />
                  </Button>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer" style={{ marginTop: '70px' }}>
        <div className="footer-top">
          <div>
            <a href="/" className="wordmark">ARTISAN<span className="text-gold">SCENTS</span></a>
            <p className="text-[11px] text-muted-foreground mt-2">Premium fragrances. Botanical expertise. Artisanal excellence.</p>
          </div>
          <div className="flex gap-8 text-[11px] flex-wrap">
            <div>
              <div className="font-semibold mb-2 uppercase tracking-wide">Shop</div>
              <div className="space-y-1 text-muted-foreground">
                <div><a href="/perfumes">Perfumes</a></div>
                <div><a href="/essence-oils">Essence Oils</a></div>
                <div><a href="/car-perfumes">Car Perfumes</a></div>
                <div><a href="/agarbatti">Agarbatti</a></div>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-2 uppercase tracking-wide">Company</div>
              <div className="space-y-1 text-muted-foreground">
                <div><a href="/about">About</a></div>
                <div><a href="/contact">Contact</a></div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Artisan Scents. All rights reserved.</span>
          <span>FRAGRANCE IS PERSONAL. MAKE IT YOURS.</span>
          <span><a href="/about">About</a> · <a href="#">Privacy</a></span>
        </div>
      </footer>

      {/* Bag Panel */}
      {panel === 'bag' && (
        <div className="bag-overlay overlay" onClick={closeBag}>
          <div role="dialog" aria-modal="true" aria-label="Shopping bag" className="bag-panel dialog" onClick={e => e.stopPropagation()}>
            <div className="dialog-header">
              <h2 className="font-display text-3xl">Your bag ({totalItems})</h2>
              <button className="luxury-icon-btn" aria-label="Close" autoFocus onClick={closeBag}><X /></button>
            </div>
            <div className="bag-list">
              {totalItems === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="mx-auto mb-5 text-muted-foreground" />
                  <h3 className="font-display text-3xl">A fragrance awaits.</h3>
                  <p className="status-note my-4">Your bag is currently empty.</p>
                  <Button variant="editorial" onClick={closeBag}>Explore the collection <ArrowRight /></Button>
                </div>
              ) : (
                products.filter(p => (bag[p.id] || 0) > 0).map(p => (
                  <div className="bag-item" key={p.id}>
                    <img src={p.image} alt={p.name} style={{ objectFit: 'contain' }} />
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-display text-xl">{p.name}</h3>
                        <span className="text-xs">{money(p.price * (bag[p.id] || 0))}</span>
                      </div>
                      <p className="product-notes capitalize">{p.category.replace('-', ' ')}</p>
                      <div className="quantity">
                        <Button variant="outline" size="icon" aria-label={`Remove one ${p.name}`} onClick={() => update(p.id, -1)}><Minus /></Button>
                        <span className="text-xs">{bag[p.id]}</span>
                        <Button variant="outline" size="icon" aria-label={`Add one ${p.name}`} onClick={() => update(p.id, 1)}><Plus /></Button>
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
                <p className="status-note mt-3">Shipping and taxes calculated at checkout.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
