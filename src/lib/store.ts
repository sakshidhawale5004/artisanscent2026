import { useState, useEffect } from "react";
import type { Product } from "./products";

// ─── WISHLIST ──────────────────────────────────────────
export const WISHLIST_STORAGE_KEY = "artisanscent_wishlist";
export const WISHLIST_UPDATED_EVENT = "artisanscent:wishlist-updated";

export function getStoredWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredWishlist(saved: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(saved));
    window.dispatchEvent(new CustomEvent(WISHLIST_UPDATED_EVENT, { detail: saved }));
  } catch (e) {
    console.error("Failed to save wishlist", e);
  }
}

export function useWishlist() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    setSaved(getStoredWishlist());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setSaved(customEvent.detail);
      } else {
        setSaved(getStoredWishlist());
      }
    };

    window.addEventListener(WISHLIST_UPDATED_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(WISHLIST_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const toggleSaved = (id: string) => {
    const current = getStoredWishlist();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    saveStoredWishlist(next);
    setSaved(next);
  };

  const isSaved = (id: string) => saved.includes(id);

  return {
    saved,
    toggleSaved,
    isSaved,
    wishlistCount: saved.length,
  };
}

// ─── SHOPPING BAG ──────────────────────────────────────
export const BAG_STORAGE_KEY = "artisanscent_cart";
export const BAG_UPDATED_EVENT = "artisanscent:cart-updated";

export function getStoredBag(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(BAG_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveStoredBag(bag: Record<string, number>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(bag));
    window.dispatchEvent(new CustomEvent(BAG_UPDATED_EVENT, { detail: bag }));
  } catch (e) {
    console.error("Failed to save bag", e);
  }
}

export function useShoppingBag() {
  const [bag, setBag] = useState<Record<string, number>>({});

  useEffect(() => {
    setBag(getStoredBag());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<Record<string, number>>;
      if (customEvent.detail && typeof customEvent.detail === "object") {
        setBag(customEvent.detail);
      } else {
        setBag(getStoredBag());
      }
    };

    window.addEventListener(BAG_UPDATED_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(BAG_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const addToBag = (id: string, qty = 1) => {
    const current = getStoredBag();
    const next = { ...current, [id]: (current[id] || 0) + qty };
    saveStoredBag(next);
    setBag(next);
  };

  const updateQty = (id: string, delta: number) => {
    const current = getStoredBag();
    const currentQty = current[id] || 0;
    const newQty = currentQty + delta;
    const next = { ...current };
    if (newQty <= 0) {
      delete next[id];
    } else {
      next[id] = newQty;
    }
    saveStoredBag(next);
    setBag(next);
  };

  const removeItem = (id: string) => {
    const current = getStoredBag();
    const next = { ...current };
    delete next[id];
    saveStoredBag(next);
    setBag(next);
  };

  const clearBag = () => {
    saveStoredBag({});
    setBag({});
  };

  const totalItems = Object.values(bag).reduce((a, b) => a + b, 0);

  const calculateSubtotal = (productsList: Product[]) => {
    return productsList.reduce((sum, p) => sum + p.price * (bag[p.id] || 0), 0);
  };

  return {
    bag,
    addToBag,
    updateQty,
    removeItem,
    clearBag,
    totalItems,
    calculateSubtotal,
  };
}

// ─── CONTACT INQUIRIES ─────────────────────────────────
export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  date: string;
  time: string;
  status: "New" | "Contacted" | "Resolved";
};

export const INQUIRIES_STORAGE_KEY = "artisanscent_crm_inquiries";
export const INQUIRIES_UPDATED_EVENT = "artisanscent:inquiries-updated";

export function getStoredInquiries(): Inquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredInquiries(inquiries: Inquiry[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(inquiries));
    window.dispatchEvent(new CustomEvent(INQUIRIES_UPDATED_EVENT, { detail: inquiries }));
  } catch (e) {
    console.error("Failed to save inquiries", e);
  }
}

export function addInquiryToCRM(data: Omit<Inquiry, "id" | "status" | "date" | "time">): Inquiry {
  const inquiries = getStoredInquiries();
  const now = new Date();
  const newInquiry: Inquiry = {
    id: `INQ-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`,
    name: data.name,
    email: data.email,
    phone: data.phone || "Not provided",
    interest: data.interest,
    message: data.message,
    date: now.toISOString().split("T")[0] as string,
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    status: "New",
  };

  const updatedInquiries = [newInquiry, ...inquiries];
  saveStoredInquiries(updatedInquiries);

  // Also record this lead automatically in Patron CRM
  try {
    const patronKey = "artisanscent_crm_customers";
    const raw = localStorage.getItem(patronKey);
    const patrons = raw ? JSON.parse(raw) : [];
    const exists = patrons.some((p: any) => p.email.toLowerCase() === data.email.toLowerCase());
    if (!exists) {
      const newCustomer = {
        id: `LEAD-${Date.now().toString().slice(-4)}`,
        name: data.name,
        email: data.email,
        phone: data.phone || "+91 (unspecified)",
        segment: "Contact Inquiry / Lead",
        ordersCount: 0,
        totalSpend: 0,
        lastOrder: "Awaiting Order",
        inquiryInterest: data.interest,
      };
      localStorage.setItem(patronKey, JSON.stringify([newCustomer, ...patrons]));
      window.dispatchEvent(new CustomEvent("artisanscent:customers-updated"));
    }
  } catch (e) {
    console.error("Failed to sync customer patron", e);
  }

  return newInquiry;
}

export type CRMOrder = {
  id: string;
  customer: string;
  email: string;
  items: string;
  total: number;
  status: "Completed" | "Processing" | "Shipped" | "Pending";
  date: string;
};

export function addOrderToCRM(data: {
  customer?: string;
  email?: string;
  phone?: string;
  items: string;
  total: number;
}): CRMOrder {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0] as string;
  const orderId = `ORD-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;

  const customerName = data.customer || "WhatsApp Concierge Client";
  const customerEmail = data.email || "whatsapp.order@artisanscent.com";

  const newOrder: CRMOrder = {
    id: orderId,
    customer: customerName,
    email: customerEmail,
    items: data.items,
    total: data.total,
    status: "Pending",
    date: dateStr,
  };

  if (typeof window !== "undefined") {
    // 1. Record in CRM Orders list
    try {
      const raw = localStorage.getItem("artisanscent_crm_orders");
      const orders = raw ? JSON.parse(raw) : [];
      const updatedOrders = [newOrder, ...orders];
      localStorage.setItem("artisanscent_crm_orders", JSON.stringify(updatedOrders));
      window.dispatchEvent(new CustomEvent("artisanscent:orders-updated", { detail: updatedOrders }));
    } catch (e) {
      console.error("Failed to record CRM order", e);
    }

    // 2. Record / update CRM Customer Patron
    try {
      const patronKey = "artisanscent_crm_customers";
      const raw = localStorage.getItem(patronKey);
      const patrons = raw ? JSON.parse(raw) : [];
      const existingIdx = patrons.findIndex((p: any) => p.email.toLowerCase() === customerEmail.toLowerCase());

      if (existingIdx >= 0) {
        patrons[existingIdx].ordersCount = (patrons[existingIdx].ordersCount || 0) + 1;
        patrons[existingIdx].totalSpend = (patrons[existingIdx].totalSpend || 0) + data.total;
        patrons[existingIdx].lastOrder = dateStr;
      } else {
        patrons.unshift({
          id: `CUST-${Date.now().toString().slice(-4)}`,
          name: customerName,
          email: customerEmail,
          phone: data.phone || "+91 98202 52868",
          segment: "WhatsApp Order / Patron",
          ordersCount: 1,
          totalSpend: data.total,
          lastOrder: dateStr,
          inquiryInterest: data.items,
        });
      }
      localStorage.setItem(patronKey, JSON.stringify(patrons));
      window.dispatchEvent(new CustomEvent("artisanscent:customers-updated", { detail: patrons }));
    } catch (e) {
      console.error("Failed to sync patron customer", e);
    }

    // 3. Also log as Inquiry in CRM so it shows up under Recent Activity on Dashboard tab
    addInquiryToCRM({
      name: customerName,
      email: customerEmail,
      phone: data.phone || "+91 98202 52868",
      interest: "WhatsApp Checkout Order",
      message: `WhatsApp Checkout initiated for: ${data.items}. Total Value: ₹${data.total}`,
    });
  }

  return newOrder;
}

