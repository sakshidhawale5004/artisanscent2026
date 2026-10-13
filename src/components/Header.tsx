import { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, Heart, X, ChevronDown } from 'lucide-react';

type HeaderProps = {
  currentPage?: string;
  onSearchClick?: () => void;
  onBagClick?: () => void;
  totalItems?: number;
};

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Shop',
    href: '#',
    children: [
      { label: 'Perfumes', href: '/perfumes' },
      { label: 'Essence Oils', href: '/essence-oils' },
      { label: 'Car Perfumes', href: '/car-perfumes' },
      { label: 'Agarbatti', href: '/agarbatti' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '#' },
  { label: 'Contact', href: '/contact' },
];

export function Header({ currentPage, onSearchClick, onBagClick, totalItems = 0 }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [currentPage]);

  return (
    <>
      {/* Desktop / Tablet Header */}
      <header
        className={`luxury-header${scrolled ? ' luxury-header--scrolled' : ''}`}
        role="banner"
      >
        {/* Left Nav */}
        <nav className="luxury-nav luxury-nav--left" aria-label="Primary navigation left">
          {navItems.slice(0, 3).map(item =>
            item.children ? (
              <div key={item.label} className="luxury-dropdown-wrapper">
                <button
                  className={`luxury-nav-link luxury-dropdown-trigger${currentPage === item.label ? ' active' : ''}`}
                  onClick={() => setShopOpen(o => !o)}
                  aria-expanded={shopOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown size={12} className={`luxury-chevron${shopOpen ? ' rotated' : ''}`} />
                </button>
                {shopOpen && (
                  <div className="luxury-dropdown" role="menu">
                    {item.children.map(child => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="luxury-dropdown-item"
                        role="menuitem"
                        onClick={() => setShopOpen(false)}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className={`luxury-nav-link${currentPage === item.label ? ' active' : ''}`}
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Center Logo */}
        <a href="/" className="luxury-logo-link" aria-label="Artisan Scents – home">
          <img
            src="/assets/logo.jpeg"
            alt="Artisan Scents logo"
            className="luxury-logo-img"
            width={120}
            height={60}
          />
        </a>

        {/* Right Nav */}
        <div className="luxury-nav luxury-nav--right">
          {navItems.slice(3).map(item => (
            <a
              key={item.label}
              href={item.href}
              className={`luxury-nav-link${currentPage === item.label ? ' active' : ''}`}
            >
              {item.label}
            </a>
          ))}

          {/* Icons */}
          <div className="luxury-icons">
            {onSearchClick && (
              <button
                className="luxury-icon-btn"
                aria-label="Search"
                onClick={onSearchClick}
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
            )}
            <a href="/wishlist" className="luxury-icon-btn" aria-label="Wishlist">
              <Heart size={18} strokeWidth={1.5} />
            </a>
            <button
              className="luxury-icon-btn luxury-bag-btn"
              aria-label={`Shopping bag, ${totalItems} items`}
              onClick={onBagClick}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && <span className="luxury-bag-count">{totalItems}</span>}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="luxury-hamburger"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="luxury-mobile-overlay" onClick={() => setMobileOpen(false)}>
          <nav
            className="luxury-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            onClick={e => e.stopPropagation()}
          >
            <div className="luxury-mobile-header">
              <img src="/assets/logo.jpeg" alt="Artisan Scents" className="luxury-mobile-logo" />
              <button
                className="luxury-icon-btn"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X size={22} />
              </button>
            </div>
            <ul className="luxury-mobile-links">
              {navItems.map(item => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <span className="luxury-mobile-category">{item.label}</span>
                      <ul className="luxury-mobile-sub">
                        {item.children.map(child => (
                          <li key={child.label}>
                            <a href={child.href} className="luxury-mobile-link luxury-mobile-link--sub">
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a href={item.href} className="luxury-mobile-link">{item.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
