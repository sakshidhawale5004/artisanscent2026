// Luxury Perfumes
const perfume1 = "/assets/perfumes/Faceted Gold Perfume Bottle.png";
const perfume2 = "/assets/perfumes/Glossy Black-to-Blue Perfume Bottle.png";
const perfume3 = "/assets/perfumes/Jewel-Toned Perfume Bottle Display.png";
const perfume4 = "/assets/perfumes/Lavender Crystal Perfume Bottle.png";
const perfume5 = "/assets/perfumes/Luxury Black Perfume Bottle with Gold Cap.png";
const perfume6 = "/assets/perfumes/Luxury Perfume Collection in Gold and Glass.png";
const perfume7 = "/assets/perfumes/Ruby Perfume Bottle with Gold Cap.png";

// Essence Oils
const essence1 = "/assets/essence oil/Amber Patchouli Oil Bottle.png";
const essence2 = "/assets/essence oil/Amber Rosemary Oil Bottle.png";
const essence3 = "/assets/essence oil/Citronella Essential Oil Bottle Mockup.png";
const essence4 = "/assets/essence oil/Geranium Oil Amber Bottle Studio Shot.png";
const essence5 = "/assets/essence oil/Palmarosa Oil Amber Bottle.png";
const essence6 = "/assets/essence oil/Premium Lavender Essential Oil Bottle.png";
const essence7 = "/assets/essence oil/Premium Lemongrass Essential Oil Bottle.png";
const essence8 = "/assets/essence oil/Premium Menthol Mint Oil Bottle.png";
const essence9 = "/assets/essence oil/Vetiver Oil Amber Bottle Mockup.png";

// Car Perfumes
const car1 = "/assets/car perfume/car perfume.png";
const car2 = "/assets/car perfume/Hanging Wooden Amber Diffuser.png";
const car3 = "/assets/car perfume/Minimalist Hanging Green Diffuser Bottle.png";

// Agarbatti
const agarbatti1 = "/assets/AGARBATTI NEW/Premium Agarbatti Sticks.png";
const agarbatti2 = "/assets/AGARBATTI NEW/Deluxe Incense Collection.png";
const agarbatti3 = "/assets/AGARBATTI NEW/Artisanscent Incense Jar Pyramid.png";

// Soaps
const soap1 = "/assets/SOAP NEW/Artisan Signature Soap.png";
const soap2 = "/assets/SOAP NEW/ARTISAN SCENT Aromatics Soap Ring.png";

import { useState, useEffect } from "react";

export type Product = {
  id: string;
  name: string;
  notes: string;
  family: string;
  category: "perfumes" | "essence-oils" | "car-perfumes" | "agarbatti" | "soaps";
  price: number;
  salePrice?: number | undefined;
  image: string;
  badge: string;
  description: string;
  botanicalName?: string | undefined;
  size?: string | undefined;
  applications?: string[] | undefined;
  stock?: number | undefined;
  rating?: number | undefined;
  sku?: string | undefined;
};

export const products: Product[] = [
  // LUXURY PERFUMES
  {
    id: "gold-faceted",
    name: "Golden Essence",
    notes: "Floral · Amber · Woody",
    family: "Luxury",
    category: "perfumes",
    price: 5999,
    image: perfume1,
    badge: "Premium",
    description:
      "A sophisticated blend of golden florals with warm amber undertones. Perfect for special occasions and memorable evenings.",
  },
  {
    id: "midnight-mystery",
    name: "Midnight Mystery",
    notes: "Black Currant · Dark Florals · Sandalwood",
    family: "Luxury",
    category: "perfumes",
    price: 4999,
    image: perfume2,
    badge: "Signature",
    description:
      "Mysterious and alluring. The deep essence of night with hints of precious woods and dark florals.",
  },
  {
    id: "jeweled-collection",
    name: "Jeweled Collection",
    notes: "Rose · Peony · Musk",
    family: "Luxury",
    category: "perfumes",
    price: 5499,
    image: perfume3,
    badge: "Exclusive",
    description:
      "A precious collection inspired by gemstones. Each note is carefully composed for lasting elegance.",
  },
  {
    id: "lavender-crystal",
    name: "Lavender Crystal",
    notes: "Lavender · Citrus · White Floral",
    family: "Luxury",
    category: "perfumes",
    price: 4699,
    image: perfume4,
    badge: "Timeless",
    description:
      "Pure lavender essence with crystalline citrus notes. Refreshing, timeless, and universally adored.",
  },
  {
    id: "black-luxury",
    name: "Black Luxury",
    notes: "Oud · Leather · Vanilla",
    family: "Luxury",
    category: "perfumes",
    price: 6499,
    image: perfume5,
    badge: "Rare",
    description:
      "An opulent fragrance with precious oud, subtle leather, and creamy vanilla. The epitome of sophistication.",
  },
  {
    id: "gold-collection",
    name: "Gold Collection Harmony",
    notes: "Jasmine · Vanilla · Amber",
    family: "Luxury",
    category: "perfumes",
    price: 5799,
    image: perfume6,
    badge: "Premium Collection",
    description:
      "A harmonious blend celebrating luxury. Jasmine, vanilla, and golden amber create an unforgettable experience.",
  },
  {
    id: "ruby-luxury",
    name: "Ruby Radiance",
    notes: "Red Rose · Raspberry · Sandalwood",
    family: "Luxury",
    category: "perfumes",
    price: 5399,
    image: perfume7,
    badge: "Exclusive",
    description:
      "Radiant and bold. Ruby-red florals with juicy raspberry and warm sandalwood create an unforgettable impression.",
  },

  // ESSENCE OILS
  {
    id: "patchouli-oil",
    name: "Patchouli Oil",
    notes: "Earthy · Musky · Exotic",
    family: "Essential",
    category: "essence-oils",
    price: 599,
    image: essence1,
    badge: "Premium Oil",
    botanicalName: "Pogostemon cablin",
    size: "10 ml",
    description:
      "Rich, earthy patchouli prized for fragrance stability. Perfect for fine fragrances and perfumes.",
  },
  {
    id: "rosemary-oil",
    name: "Rosemary Oil",
    notes: "Herbal · Refreshing · Woody",
    family: "Essential",
    category: "essence-oils",
    price: 399,
    image: essence2,
    badge: "Pure Essential",
    botanicalName: "Rosmarinus officinalis",
    size: "10 ml",
    description:
      "Herbal and refreshing. Widely used in hair care, room fragrances, and wellness products.",
  },
  {
    id: "citronella-oil",
    name: "Citronella Oil",
    notes: "Fresh · Herbal · Citrus",
    family: "Essential",
    category: "essence-oils",
    price: 275,
    image: essence3,
    badge: "Natural",
    botanicalName: "Cymbopogon winterianus",
    size: "10 ml",
    description:
      "Fresh herbal fragrance. Widely used in insect-repellent products, soaps, and cosmetics.",
  },
  {
    id: "geranium-oil",
    name: "Geranium Oil",
    notes: "Rose-like · Floral · Sweet",
    family: "Essential",
    category: "essence-oils",
    price: 550,
    image: essence4,
    badge: "Premium Oil",
    botanicalName: "Pelargonium graveolens",
    size: "10 ml",
    description: "Sweet floral aroma extensively used in cosmetics and personal care formulations.",
  },
  {
    id: "palmarosa-oil",
    name: "Palmarosa Oil",
    notes: "Rose-like · Fragrant · Sweet",
    family: "Essential",
    category: "essence-oils",
    price: 425,
    image: essence5,
    badge: "Pure Essential",
    botanicalName: "Cymbopogon martinii",
    size: "10 ml",
    description: "Rich in natural geraniol. Ideal cosmetic ingredient and excellent blending oil.",
  },
  {
    id: "lavender-oil",
    name: "Lavender Oil",
    notes: "Floral · Calming · Sweet",
    family: "Essential",
    category: "essence-oils",
    price: 450,
    image: essence6,
    badge: "Premium Oil",
    botanicalName: "Lavandula officinalis",
    size: "10 ml",
    description: "Calming and sweet. Popular in aromatherapy, wellness, skincare, and perfumery.",
  },
  {
    id: "lemongrass-oil",
    name: "Lemongrass Oil",
    notes: "Fresh · Citrus · Herbal",
    family: "Essential",
    category: "essence-oils",
    price: 299,
    image: essence7,
    badge: "Fresh",
    botanicalName: "Cymbopogon flexuosus",
    size: "10 ml",
    description:
      "Fresh citrus scent. A major source of natural citral used in personal care and fragrances.",
  },
  {
    id: "menthol-oil",
    name: "Menthol Mint Oil",
    notes: "Cooling · Refreshing · Mint",
    family: "Essential",
    category: "essence-oils",
    price: 325,
    image: essence8,
    badge: "Premium Oil",
    botanicalName: "Mentha arvensis",
    size: "10 ml",
    description:
      "Strong cooling effect. Popular wellness ingredient used in oral care and personal care products.",
  },
  {
    id: "vetiver-oil",
    name: "Vetiver Oil",
    notes: "Deep · Earthy · Woody",
    family: "Essential",
    category: "essence-oils",
    price: 650,
    image: essence9,
    badge: "Rare Oil",
    botanicalName: "Chrysopogon zizanioides",
    size: "10 ml",
    description:
      "Deep earthy woody notes. Excellent perfume fixative used in attars and luxury fragrances.",
  },

  // CAR PERFUMES
  {
    id: "car-classic",
    name: "Classic Car Diffuser",
    notes: "Fresh · Woody · Citrus",
    family: "Automotive",
    category: "car-perfumes",
    price: 1299,
    image: car1,
    badge: "Popular",
    size: "Compact",
    description:
      "Designed for automotive fragrance use. Fresh and woody notes perfect for your driving environment.",
  },
  {
    id: "car-wooden",
    name: "Wooden Amber Diffuser",
    notes: "Amber · Woody · Warm",
    family: "Automotive",
    category: "car-perfumes",
    price: 1499,
    image: car2,
    badge: "Premium",
    size: "Hanging",
    description:
      "Combines compact design with stylish appearance. Warm amber and woody notes for a luxurious in-car experience.",
  },
  {
    id: "car-minimalist",
    name: "Green Minimalist Diffuser",
    notes: "Fresh · Green · Herbal",
    family: "Automotive",
    category: "car-perfumes",
    price: 1399,
    image: car3,
    badge: "Modern",
    size: "Hanging",
    description:
      "Minimalist green bottle with fresh herbal fragrance. Perfect for personalizing your driving space.",
  },

  // AGARBATTI
  {
    id: "agarbatti-premium",
    name: "Premium Agarbatti Sticks",
    notes: "Floral · Woody · Soothing",
    family: "Traditional",
    category: "agarbatti",
    price: 399,
    image: agarbatti1,
    badge: "Handcrafted",
    size: "Box",
    description:
      "Fragrances inspired by Indian traditions. Floral and woody scent profiles for prayer spaces and meditation.",
  },
  {
    id: "agarbatti-deluxe",
    name: "Deluxe Incense Collection",
    notes: "Woody · Floral · Aromatic",
    family: "Traditional",
    category: "agarbatti",
    price: 499,
    image: agarbatti2,
    badge: "Premium",
    size: "Box",
    description:
      "Premium incense products for rituals and everyday moments. Creates an atmosphere of calm and familiarity.",
  },
  {
    id: "agarbatti-pyramid",
    name: "Pyramid Premium Dhoop Sticks",
    notes: "Woody · Herbal · Pure",
    family: "Traditional",
    category: "agarbatti",
    price: 599,
    image: agarbatti3,
    badge: "Exclusive",
    size: "Pyramid Pack",
    description:
      "Premium pyramid dhoop sticks in traditional style. Perfect for creating peaceful ambience in any space.",
  },

  // SOAPS
  {
    id: "soap-signature",
    name: "Artisan Signature Soap",
    notes: "Botanical · Creamy · Gentle",
    family: "Personal Care",
    category: "soaps",
    price: 249,
    image: soap1,
    badge: "Handcrafted",
    size: "100 g",
    description:
      "A cold-process bathing bar infused with pure botanical essence oils. Creamy lather and a soft, lingering fragrance for daily luxury.",
  },
  {
    id: "soap-varad-ring",
    name: "Varad Aromatics Soap Ring",
    notes: "Floral · Woody · Rich",
    family: "Personal Care",
    category: "soaps",
    price: 299,
    image: soap2,
    badge: "Premium",
    size: "125 g",
    description:
      "An aromatic artisan soap ring enriched with essential oils, crafted for a rich, fragrant cleanse and a refined shelf presence.",
  },
];

export const money = (amount: number) => `₹${amount}`;

export const PRODUCTS_STORAGE_KEY = "artisanscent_live_catalog";
export const PRODUCTS_UPDATED_EVENT = "artisanscent:products-updated";

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return products;
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) return products;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((p: Product) => {
        if (p.id === "agarbatti-premium" && (p.image.includes("agarbatti (1)") || !p.image.includes("AGARBATTI NEW"))) {
          return { ...p, image: agarbatti1 };
        }
        if (p.id === "agarbatti-deluxe" && (p.image.includes("agarbatti (2)") || !p.image.includes("AGARBATTI NEW"))) {
          return { ...p, image: agarbatti2 };
        }
        if (p.id === "agarbatti-pyramid" && (p.image.includes("Pyramid of Premium") || !p.image.includes("AGARBATTI NEW"))) {
          return { ...p, image: agarbatti3 };
        }
        if (p.id === "soap-signature" && (p.image.includes("soaps/soap") || !p.image.includes("SOAP NEW"))) {
          return { ...p, image: soap1 };
        }
        if (p.id === "soap-varad-ring" && (p.image.includes("Varad Aromatics") || !p.image.includes("SOAP NEW"))) {
          return { ...p, image: soap2 };
        }
        return p;
      });
    }
  } catch {
    // fallback to initial
  }
  return products;
}

export function saveStoredProducts(updatedList: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent(PRODUCTS_UPDATED_EVENT, { detail: updatedList }));
  } catch (e) {
    console.error("Failed to save products to localStorage", e);
  }
}

export function useProducts(): Product[] {
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);

  useEffect(() => {
    // Sync on mount
    setCurrentProducts(getStoredProducts());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<Product[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setCurrentProducts(customEvent.detail);
      } else {
        setCurrentProducts(getStoredProducts());
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === PRODUCTS_STORAGE_KEY) {
        setCurrentProducts(getStoredProducts());
      }
    };

    window.addEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return currentProducts;
}
