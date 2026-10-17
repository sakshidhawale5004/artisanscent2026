import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import {
  Package,
  Users,
  ShoppingBag,
  TrendingUp,
  Download,
  Plus,
  Search,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Eye,
  LogOut,
  Lock,
  Layers,
  ArrowUpRight,
  Filter,
  X,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Mail,
  UploadCloud,
  Image as ImageIcon,
  Camera,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  products as initialProducts,
  money,
  type Product,
  getStoredProducts,
  saveStoredProducts,
} from "@/lib/products";
import {
  type Inquiry,
  getStoredInquiries,
  saveStoredInquiries,
} from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Artisan Scent CRM & Staff Admin Hub" },
      {
        name: "description",
        content:
          "Internal CRM and commerce administration hub for Artisan Scent: product catalog control, CSV exports, customer profiles, and real-time order tracking.",
      },
    ],
  }),
  component: AdminHubPage,
});

export type Order = {
  id: string;
  customer: string;
  email: string;
  items: string;
  total: number;
  status: "Completed" | "Processing" | "Shipped" | "Pending";
  date: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  segment: string;
  ordersCount: number;
  totalSpend: number;
  lastOrder: string;
  inquiryInterest?: string | undefined;
};

// Start with empty real-world CRM state (no dummy entries)
const initialOrders: Order[] = [];
const initialCustomers: Customer[] = [];

type ExtendedProduct = Product & {
  salePrice?: number | undefined;
  stock?: number | undefined;
  rating?: number | undefined;
  sku?: string | undefined;
};

export function AdminHubPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authUsername, setAuthUsername] = useState<string>("");
  const [authPassword, setAuthPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Navigation View Tab
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders" | "customers" | "inquiries">("dashboard");

  // CRM State
  const [productList, setProductList] = useState<ExtendedProduct[]>([]);
  const [ordersList, setOrdersList] = useState<Order[]>(initialOrders);
  const [customerList, setCustomerList] = useState<Customer[]>(initialCustomers);
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>([]);

  // Search & Filter state
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ExtendedProduct | null>(null);

  // Form State for Add / Edit Product
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<Product["category"]>("perfumes");
  const [formPrice, setFormPrice] = useState<number>(4999);
  const [formSalePrice, setFormSalePrice] = useState<number | undefined>(undefined);
  const [formRating, setFormRating] = useState<number>(4.9);
  const [formImage, setFormImage] = useState("/assets/perfumes/Faceted Gold Perfume Bottle.png");
  const [formNotes, setFormNotes] = useState("Amber · Sandalwood · Jasmine");
  const [formFamily, setFormFamily] = useState("Luxury");
  const [formSize, setFormSize] = useState("50 ml");
  const [formBadge, setFormBadge] = useState("New Arrival");
  const [formStock, setFormStock] = useState<number>(45);
  const [formDescription, setFormDescription] = useState(
    "Handcrafted formulation distilled with rare botanicals in collaboration with KEOMC Botanical Labs."
  );

  // Image Upload Control States
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUploadMethod, setImageUploadMethod] = useState<"file" | "url">("file");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const processImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showFeedback("Please select an image file (PNG, JPG, WEBP, or SVG).");
      return;
    }

    setIsUploadingImage(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.src = src;
      img.onload = () => {
        // Create canvas to resize to reasonable web dimensions (max 900x900)
        const canvas = document.createElement("canvas");
        const MAX_DIM = 900;
        let { width, height } = img;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const isPng = file.type === "image/png";
          const compressedDataUrl = canvas.toDataURL(isPng ? "image/png" : "image/jpeg", 0.88);
          setFormImage(compressedDataUrl);
          showFeedback(`Image "${file.name}" uploaded and optimized!`);
        } else {
          setFormImage(src);
          showFeedback(`Image "${file.name}" uploaded successfully!`);
        }
        setIsUploadingImage(false);
      };
      img.onerror = () => {
        setFormImage(src);
        setIsUploadingImage(false);
        showFeedback(`Image "${file.name}" uploaded successfully!`);
      };
    };
    reader.onerror = () => {
      setIsUploadingImage(false);
      showFeedback("Could not read image file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Toast / Feedback message
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  // Check login & load live data on mount
  useEffect(() => {
    const isLogged = localStorage.getItem("artisanscent_admin_logged");
    if (isLogged === "true") {
      setIsAuthenticated(true);
    }

    // Load live central products catalog
    const loaded = getStoredProducts();
    setProductList(
      loaded.map((p) => ({
        ...p,
        stock: p.stock ?? 35,
        rating: p.rating ?? 4.9,
        sku: p.sku ?? `ART-${p.id.toUpperCase()}`,
      }))
    );

    // Load CRM patron customers
    try {
      const storedCust = localStorage.getItem("artisanscent_crm_customers");
      if (storedCust) {
        setCustomerList(JSON.parse(storedCust));
      }
    } catch {
      setCustomerList([]);
    }

    // Load customer orders
    try {
      const storedOrders = localStorage.getItem("artisanscent_crm_orders");
      if (storedOrders) {
        setOrdersList(JSON.parse(storedOrders));
      }
    } catch {
      setOrdersList([]);
    }

    // Load contact inquiries
    setInquiriesList(getStoredInquiries());

    const handleSync = () => {
      setInquiriesList(getStoredInquiries());
      try {
        const storedCust = localStorage.getItem("artisanscent_crm_customers");
        if (storedCust) setCustomerList(JSON.parse(storedCust));
      } catch {}
      try {
        const storedOrders = localStorage.getItem("artisanscent_crm_orders");
        if (storedOrders) setOrdersList(JSON.parse(storedOrders));
      } catch {}
    };

    window.addEventListener("artisanscent:inquiries-updated", handleSync);
    window.addEventListener("artisanscent:customers-updated", handleSync);
    window.addEventListener("artisanscent:orders-updated", handleSync);

    return () => {
      window.removeEventListener("artisanscent:inquiries-updated", handleSync);
      window.removeEventListener("artisanscent:customers-updated", handleSync);
      window.removeEventListener("artisanscent:orders-updated", handleSync);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authUsername === "admin" && (authPassword === "artisan2026" || authPassword === "admin123")) {
      setIsAuthenticated(true);
      localStorage.setItem("artisanscent_admin_logged", "true");
      setAuthError("");
      showFeedback("Welcome, Administrator. Staff Hub active.");
    } else {
      setAuthError("Invalid username or password. Please verify your staff credentials.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("artisanscent_admin_logged");
    showFeedback("Signed out from Admin Hub.");
  };

  // Reset Add/Edit Form
  const resetForm = () => {
    setEditingProduct(null);
    setFormName("");
    setFormCategory("perfumes");
    setFormPrice(4999);
    setFormSalePrice(undefined);
    setFormRating(4.9);
    setFormImage("/assets/perfumes/Faceted Gold Perfume Bottle.png");
    setImageUploadMethod("file");
    setFormNotes("Amber · Sandalwood · Jasmine");
    setFormFamily("Luxury");
    setFormSize("50 ml");
    setFormBadge("New Arrival");
    setFormStock(45);
    setFormDescription(
      "Handcrafted formulation distilled with rare botanicals in collaboration with KEOMC Botanical Labs."
    );
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openEditModal = (p: ExtendedProduct) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormSalePrice(p.salePrice);
    setFormRating(p.rating || 4.9);
    setFormImage(p.image);
    setImageUploadMethod(p.image.startsWith("data:") ? "file" : "url");
    setFormNotes(p.notes);
    setFormFamily(p.family);
    setFormSize(p.size || "50 ml");
    setFormBadge(p.badge);
    setFormStock(p.stock || 30);
    setFormDescription(p.description);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    let updated: ExtendedProduct[];
    if (editingProduct) {
      // Update existing product
      updated = productList.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formName,
              category: formCategory,
              price: Number(formPrice),
              salePrice: formSalePrice ? Number(formSalePrice) : undefined,
              rating: Number(formRating),
              image: formImage,
              notes: formNotes,
              family: formFamily,
              size: formSize,
              badge: formBadge,
              stock: Number(formStock),
              description: formDescription,
            }
          : p
      );
      showFeedback(`Product "${formName}" updated successfully.`);
    } else {
      // Create new product
      const newId = `prod-${Date.now().toString().slice(-6)}`;
      const newProduct: ExtendedProduct = {
        id: newId,
        name: formName,
        category: formCategory,
        price: Number(formPrice),
        salePrice: formSalePrice ? Number(formSalePrice) : undefined,
        rating: Number(formRating),
        image: formImage,
        notes: formNotes,
        family: formFamily,
        size: formSize,
        badge: formBadge,
        stock: Number(formStock),
        description: formDescription,
        sku: `ART-${newId.toUpperCase()}`,
      };
      updated = [newProduct, ...productList];
      showFeedback(`New product "${formName}" added to catalog.`);
    }

    setProductList(updated);
    // Persist live catalog across entire website
    saveStoredProducts(updated);

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from catalog?`)) {
      const updated = productList.filter((p) => p.id !== id);
      setProductList(updated);
      saveStoredProducts(updated);
      showFeedback(`Product "${name}" deleted from catalog.`);
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm("Reset catalog formulations back to default Maison master list?")) {
      setProductList(initialProducts);
      saveStoredProducts(initialProducts);
      showFeedback("Catalog formulations reset to default master list.");
    }
  };

  // Inquiry actions
  const handleUpdateInquiryStatus = (id: string, status: Inquiry["status"]) => {
    const updated = inquiriesList.map((inq) =>
      inq.id === id ? { ...inq, status } : inq
    );
    setInquiriesList(updated);
    saveStoredInquiries(updated);
    showFeedback(`Inquiry ${id} status updated to "${status}".`);
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm("Are you sure you want to delete this contact submission?")) {
      const updated = inquiriesList.filter((inq) => inq.id !== id);
      setInquiriesList(updated);
      saveStoredInquiries(updated);
      showFeedback("Inquiry record removed.");
    }
  };

  // CSV Export Generators
  const exportProductsCSV = () => {
    const headers = ["ID", "Name", "Category", "Price", "SalePrice", "Rating", "Image", "Notes", "Family", "Size", "Badge", "Stock", "Description"];
    const rows = productList.map((p) => [
      `"${p.id}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      p.price,
      p.salePrice || "",
      p.rating || 4.9,
      `"${p.image}"`,
      `"${p.notes.replace(/"/g, '""')}"`,
      `"${p.family}"`,
      `"${p.size || ''}"`,
      `"${p.badge || ''}"`,
      p.stock || 25,
      `"${p.description.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `artisanscent_products_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback("Products catalog CSV downloaded successfully.");
  };

  const exportOrdersCSV = () => {
    const headers = ["OrderID", "Customer", "Email", "Items", "TotalINR", "Status", "Date"];
    const rows = ordersList.map((o) => [
      `"${o.id}"`,
      `"${o.customer.replace(/"/g, '""')}"`,
      `"${o.email}"`,
      `"${o.items.replace(/"/g, '""')}"`,
      o.total,
      `"${o.status}"`,
      `"${o.date}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `artisanscent_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback("Orders CSV exported successfully.");
  };

  const exportInquiriesCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Interest", "Message", "Date", "Time", "Status"];
    const rows = inquiriesList.map((i) => [
      `"${i.id}"`,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${i.phone}"`,
      `"${i.interest}"`,
      `"${i.message.replace(/"/g, '""')}"`,
      `"${i.date}"`,
      `"${i.time}"`,
      `"${i.status}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `artisanscent_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback("Inquiries CSV exported successfully.");
  };

  const exportCustomersCSV = () => {
    const headers = ["CustomerID", "Name", "Email", "Phone", "Segment", "OrdersCount", "TotalSpendINR", "LastOrderDate"];
    const rows = customerList.map((c) => [
      `"${c.id}"`,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.email}"`,
      `"${c.phone}"`,
      `"${c.segment}"`,
      c.ordersCount,
      c.totalSpend,
      `"${c.lastOrder}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `artisanscent_crm_customers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback("CRM Customer profiles exported to CSV.");
  };

  // Filtered Products for Table
  const filteredProducts = useMemo(() => {
    return productList.filter((p) => {
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.notes.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [productList, categoryFilter, productSearch]);

  // Aggregate Metrics (Accurate, dynamic, and non-duplicated)
  const grossRevenue = useMemo(() => {
    return ordersList.reduce((sum, o) => sum + o.total, 0);
  }, [ordersList]);

  const totalOrdersCount = ordersList.length;

  const avgOrderValue = useMemo(() => {
    return totalOrdersCount > 0 ? Math.round(grossRevenue / totalOrdersCount) : 0;
  }, [grossRevenue, totalOrdersCount]);

  const totalInventoryValue = useMemo(() => {
    return productList.reduce((sum, p) => sum + p.price * (p.stock ?? 25), 0);
  }, [productList]);

  const orderStatusCounts = useMemo(() => {
    return {
      completed: ordersList.filter((o) => o.status === "Completed").length,
      processing: ordersList.filter((o) => o.status === "Processing").length,
      shipped: ordersList.filter((o) => o.status === "Shipped").length,
      pending: ordersList.filter((o) => o.status === "Pending").length,
    };
  }, [ordersList]);

  const categoryDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    productList.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [productList]);

  // If Not Authenticated -> Show Luxury Admin Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#071910] text-[#e0e7e3] flex flex-col justify-center items-center px-4 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#1b5e3f]/25 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#d4af37]/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md bg-[#0a2316]/95 border border-[#2d8659]/50 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#1b5e3f] border-2 border-[#d4af37] flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock size={26} className="text-[#86efac]" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-1">
              ARTISAN SCENT HAUTE PARFUMERIE
            </div>
            <h1 className="font-display text-2xl sm:text-3xl text-white font-normal">
              Staff CRM &amp; Commerce Hub
            </h1>
            <p className="text-xs text-[#a3b8ac] font-light mt-2">
              Enter your staff credentials to manage the product catalog, export customer records, and review order telemetry.
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#9fb3a6] font-semibold mb-1.5">
                Staff Username
              </label>
              <input
                type="text"
                value={authUsername}
                onChange={(e) => setAuthUsername(e.target.value)}
                placeholder="Enter staff username"
                required
                className="w-full bg-[#05170e] border border-[#2d8659]/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-[#557060] focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#9fb3a6] font-semibold mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-[#05170e] border border-[#2d8659]/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-[#557060] focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-full bg-[#1b5e3f] hover:bg-[#237750] text-white border border-[#2d8659] font-medium tracking-wide shadow-lg text-xs mt-2 transition-all"
            >
              Authenticate &amp; Access Hub
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-[#86efac] hover:underline">
              ← Return to Artisan Scent Storefront
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6f3] text-[#222222] flex flex-col font-sans">
      {/* Toast Feedback */}
      {feedbackMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#05170e] text-[#86efac] border border-[#2d8659] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 size={16} />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <header className="bg-[#05170e] text-white border-b border-[#1b5e3f]/40 sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3 group">
              <img
                src="/assets/logo.jpeg"
                alt="Artisan Scent"
                className="w-9 h-9 rounded-full object-cover border border-[#d4af37]/60 group-hover:scale-105 transition-transform"
              />
              <div>
                <div className="font-display tracking-widest text-base sm:text-lg text-white font-semibold leading-none">
                  ARTISAN <span className="text-[#d4af37]">SCENT</span>
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-[#86efac] font-mono mt-0.5">
                  COMMERCE SUITE &amp; CRM v2.0
                </div>
              </div>
            </a>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#092618] p-1 rounded-full border border-[#2d8659]/50">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "dashboard" ? "bg-[#1b5e3f] text-white shadow-xs" : "text-[#a3b8ac] hover:text-white"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "products" ? "bg-[#1b5e3f] text-white shadow-xs" : "text-[#a3b8ac] hover:text-white"
              }`}
            >
              Products ({productList.length})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "orders" ? "bg-[#1b5e3f] text-white shadow-xs" : "text-[#a3b8ac] hover:text-white"
              }`}
            >
              Orders ({ordersList.length})
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "customers" ? "bg-[#1b5e3f] text-white shadow-xs" : "text-[#a3b8ac] hover:text-white"
              }`}
            >
              CRM Patrons ({customerList.length})
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "inquiries" ? "bg-[#1b5e3f] text-white shadow-xs" : "text-[#a3b8ac] hover:text-white"
              }`}
            >
              Inquiries ({inquiriesList.length})
            </button>
          </nav>

          {/* Right Action: Storefront Link & Logout */}
          <div className="flex items-center gap-3">
            <a
              href="/products"
              target="_blank"
              className="text-xs text-[#86efac] hover:text-white flex items-center gap-1 hidden sm:flex"
            >
              Storefront <ExternalLink size={12} />
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="h-8 px-3 rounded-full border-[#2d8659]/60 bg-transparent text-[#e0deda] hover:bg-[#1b5e3f]/40 hover:text-white text-xs gap-1.5"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center gap-1 mt-3 pt-3 border-t border-[#1b5e3f]/40 overflow-x-auto no-scrollbar">
          {(["dashboard", "products", "orders", "customers", "inquiries"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap capitalize ${
                activeTab === tab ? "bg-[#1b5e3f] text-white" : "text-[#a3b8ac]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Main CRM Content Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
        {/* ======================= DASHBOARD TAB ======================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header with Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl text-[#111111] font-normal">Command Center</h1>
                <p className="text-xs text-[#666666] mt-0.5 font-light">
                  Real-time telemetry, fragrance catalog metrics, and customer relationship records.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  onClick={openAddModal}
                  size="sm"
                  className="rounded-full bg-[#1b5e3f] hover:bg-[#164a31] text-white h-9 px-4 text-xs font-medium shadow-sm gap-1.5"
                >
                  <Plus size={14} /> Add Product
                </Button>
                <Button
                  onClick={exportProductsCSV}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#dcd6cb] bg-white hover:bg-[#f2efe9] text-[#222222] h-9 px-4 text-xs gap-1.5"
                >
                  <Download size={13} /> Export Products CSV
                </Button>
                <Button
                  onClick={exportOrdersCSV}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#dcd6cb] bg-white hover:bg-[#f2efe9] text-[#222222] h-9 px-4 text-xs gap-1.5"
                >
                  <Download size={13} /> Orders CSV
                </Button>
              </div>
            </div>

            {/* KPI Summary Cards (Real-time and Accurate) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-white border border-[#e4ded5] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#777777] mb-2 font-medium uppercase tracking-wider">
                  <span>Gross Revenue</span>
                  <span className="p-1.5 rounded-lg bg-[#e8f5f0] text-[#1b5e3f]">
                    <TrendingUp size={15} />
                  </span>
                </div>
                <div className="font-mono text-2xl font-bold text-[#111111]">{money(grossRevenue)}</div>
                <div className="text-[11px] text-[#777777] font-light mt-1">
                  Avg. Order Value: <span className="font-mono font-medium text-[#111111]">{money(avgOrderValue)}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#e4ded5] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#777777] mb-2 font-medium uppercase tracking-wider">
                  <span>Total Orders</span>
                  <span className="p-1.5 rounded-lg bg-[#f0ede8] text-[#996515]">
                    <ShoppingBag size={15} />
                  </span>
                </div>
                <div className="font-mono text-2xl font-bold text-[#111111]">{totalOrdersCount} Orders</div>
                <div className="text-[11px] text-[#1b5e3f] font-medium mt-1">
                  {orderStatusCounts.completed} completed · {orderStatusCounts.processing + orderStatusCounts.shipped} in transit
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#e4ded5] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#777777] mb-2 font-medium uppercase tracking-wider">
                  <span>Active CRM Patrons</span>
                  <span className="p-1.5 rounded-lg bg-[#eef2ff] text-[#4f46e5]">
                    <Users size={15} />
                  </span>
                </div>
                <div className="font-mono text-2xl font-bold text-[#111111]">
                  {customerList.length} Profiles
                </div>
                <div className="text-[11px] text-[#777777] font-light mt-1">
                  {customerList.filter((c) => c.segment === "VIP Reserve").length} VIP Reserve Patrons
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#e4ded5] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#777777] mb-2 font-medium uppercase tracking-wider">
                  <span>Catalog Valuation</span>
                  <span className="p-1.5 rounded-lg bg-[#fef3c7] text-[#b45309]">
                    <Package size={15} />
                  </span>
                </div>
                <div className="font-mono text-2xl font-bold text-[#111111]">
                  {money(totalInventoryValue)}
                </div>
                <div className="text-[11px] text-[#777777] font-light mt-1">
                  Across {productList.length} active formulations
                </div>
              </div>
            </div>

            {/* Non-Duplicated Overview Section: Logistics Funnel & Category Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: Logistics & Fulfillment Funnel */}
              <div className="rounded-2xl bg-white border border-[#e4ded5] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-display text-xl text-[#111111]">Order Fulfillment Funnel</h3>
                      <p className="text-xs text-[#666666] font-light">Status distribution of all customer orders in the system.</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab("orders")}
                      className="text-xs text-[#1b5e3f] hover:underline"
                    >
                      Manage Orders →
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-center">
                      <div className="text-[10px] uppercase font-semibold text-emerald-800 tracking-wider">Completed</div>
                      <div className="font-mono text-xl font-bold text-emerald-900 mt-1">{orderStatusCounts.completed}</div>
                      <div className="text-[9px] text-emerald-700 mt-0.5">Delivered</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/60 text-center">
                      <div className="text-[10px] uppercase font-semibold text-amber-800 tracking-wider">Processing</div>
                      <div className="font-mono text-xl font-bold text-amber-900 mt-1">{orderStatusCounts.processing}</div>
                      <div className="text-[9px] text-amber-700 mt-0.5">Blending / Pack</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200/60 text-center">
                      <div className="text-[10px] uppercase font-semibold text-blue-800 tracking-wider">Shipped</div>
                      <div className="font-mono text-xl font-bold text-blue-900 mt-1">{orderStatusCounts.shipped}</div>
                      <div className="text-[9px] text-blue-700 mt-0.5">In Transit</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-100 border border-neutral-200 text-center">
                      <div className="text-[10px] uppercase font-semibold text-neutral-700 tracking-wider">Pending</div>
                      <div className="font-mono text-xl font-bold text-neutral-900 mt-1">{orderStatusCounts.pending}</div>
                      <div className="text-[9px] text-neutral-600 mt-0.5">Awaiting Action</div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#eeebe5] flex items-center justify-between text-xs text-[#666666]">
                  <span>Total Active Workflows: <strong className="text-[#111111]">{totalOrdersCount}</strong></span>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-[#1b5e3f] hover:underline font-medium text-xs cursor-pointer"
                  >
                    Open full orders list in Orders tab →
                  </button>
                </div>
              </div>

              {/* Card 2: Catalog Portfolio Breakdown */}
              <div className="rounded-2xl bg-white border border-[#e4ded5] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-display text-xl text-[#111111]">Portfolio Distribution</h3>
                      <p className="text-xs text-[#666666] font-light">Formulation counts across luxury product categories.</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab("products")}
                      className="text-xs text-[#1b5e3f] hover:underline"
                    >
                      Manage Products →
                    </Button>
                  </div>

                  <div className="space-y-3 mt-4">
                    {[
                      { key: "perfumes", label: "Luxury Perfumes", color: "bg-[#1b5e3f]" },
                      { key: "essence-oils", label: "Pure Essence Oils", color: "bg-[#d4af37]" },
                      { key: "car-perfumes", label: "Car Diffusers", color: "bg-[#2d8659]" },
                      { key: "agarbatti", label: "Sacred Agarbatti", color: "bg-[#b45309]" },
                      { key: "soaps", label: "Handcrafted Soaps", color: "bg-[#059669]" },
                    ].map((cat) => {
                      const count = categoryDistribution[cat.key] || 0;
                      const percent = productList.length > 0 ? Math.round((count / productList.length) * 100) : 0;
                      return (
                        <div key={cat.key} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-[#222222]">{cat.label}</span>
                            <span className="text-[#777777] font-mono">{count} items ({percent}%)</span>
                          </div>
                          <div className="w-full h-2 bg-[#f0ede8] rounded-full overflow-hidden">
                            <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#eeebe5] flex items-center justify-between text-xs text-[#666666]">
                  <span>Total Formulations: <strong className="text-[#111111]">{productList.length}</strong></span>
                  <button
                    onClick={() => setActiveTab("products")}
                    className="text-[#1b5e3f] hover:underline font-medium text-xs cursor-pointer"
                  >
                    View catalog in Products tab →
                  </button>
                </div>
              </div>
            </div>


          </div>
        )}

        {/* ======================= PRODUCTS TAB ======================= */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl text-[#111111] font-normal">Products Catalog</h1>
                <p className="text-xs text-[#666666] mt-0.5 font-light">
                  Manage product specifications, pricing, imagery, olfactory notes, and stock levels.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  onClick={openAddModal}
                  size="sm"
                  className="rounded-full bg-[#1b5e3f] hover:bg-[#164a31] text-white h-9 px-4 text-xs font-medium shadow-sm gap-1.5"
                >
                  <Plus size={14} /> Add Product
                </Button>
                <Button
                  onClick={exportProductsCSV}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#dcd6cb] bg-white hover:bg-[#f2efe9] text-[#222222] h-9 px-4 text-xs gap-1.5"
                >
                  <Download size={13} /> Export Catalog CSV
                </Button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-white border border-[#e4ded5] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter products by name, notes..."
                  className="w-full pl-9 pr-3 py-1.5 bg-[#fbfaf8] border border-[#dcd6cb] rounded-lg text-xs focus:outline-none focus:border-[#1b5e3f]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[11px] text-[#777777] uppercase tracking-wider font-semibold">Category:</span>
                {["all", "perfumes", "essence-oils", "car-perfumes", "agarbatti", "soaps"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      categoryFilter === cat
                        ? "bg-[#1b5e3f] text-white"
                        : "bg-[#f2efe9] text-[#555555] hover:bg-[#e6e2d9]"
                    }`}
                  >
                    {cat === "all" ? "All" : cat.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Data Table */}
            <div className="rounded-2xl bg-white border border-[#e4ded5] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#fcfbf9] border-b border-[#eeebe5] text-[#777777] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Image</th>
                      <th className="py-3 px-4">Name &amp; Fragrance Notes</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price (₹)</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f2efe9]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#faf9f7] transition-colors">
                        <td className="py-3 px-4">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 object-contain rounded-lg border border-[#e8e2d8] p-1 bg-white"
                          />
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <div className="font-display text-base font-semibold text-[#111111]">{p.name}</div>
                          <div className="text-[11px] text-[#666666] line-clamp-1">{p.notes}</div>
                          <div className="text-[10px] text-[#1b5e3f] font-mono mt-0.5">
                            {p.badge || "Standard Flacon"} · {p.size || "50 ml"}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#f0ede8] text-[#555555] text-[10px] font-medium capitalize">
                            {p.category.replace("-", " ")}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-[#111111]">
                          {money(p.price)}
                          {p.salePrice && (
                            <span className="ml-1 text-[10px] text-[#999999] line-through font-normal">
                              {money(p.salePrice)}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-[#d4af37] font-semibold text-xs">
                          ★ {p.rating || 4.9}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              (p.stock || 25) > 15
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {p.stock || 25} in stock
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditModal(p)}
                            className="h-8 w-8 text-[#555555] hover:text-[#1b5e3f]"
                            title="Edit Product"
                          >
                            <Edit3 size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="h-8 w-8 text-[#888888] hover:text-red-600"
                            title="Delete Product"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================= ORDERS TAB ======================= */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl text-[#111111] font-normal">Orders &amp; Logistics</h1>
                <p className="text-xs text-[#666666] mt-0.5 font-light">
                  Track customer purchases, update order stages, and export logistics spreadsheets.
                </p>
              </div>

              <Button
                onClick={exportOrdersCSV}
                variant="outline"
                size="sm"
                className="rounded-full border-[#dcd6cb] bg-white hover:bg-[#f2efe9] text-[#222222] h-9 px-4 text-xs gap-1.5 self-start sm:self-auto"
              >
                <Download size={13} /> Export Orders CSV
              </Button>
            </div>

            <div className="rounded-2xl bg-white border border-[#e4ded5] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#fcfbf9] border-b border-[#eeebe5] text-[#777777] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">Cart Formulation</th>
                      <th className="py-3 px-4">Subtotal</th>
                      <th className="py-3 px-4">Fulfillment Status</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f2efe9]">
                    {ordersList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-14 text-center text-[#777777]">
                          <ShoppingBag className="mx-auto mb-2 text-[#aaa7a0] opacity-50" size={32} />
                          <div className="font-medium text-sm text-[#222222]">No Customer Orders Registered Yet</div>
                          <div className="text-xs text-[#888888] mt-1 max-w-sm mx-auto">
                            Customer orders placed through store checkout will register here with instant status workflows and CSV export.
                          </div>
                        </td>
                      </tr>
                    ) : (
                      ordersList.map((o) => (
                        <tr key={o.id} className="hover:bg-[#faf9f7] transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#111111]">{o.id}</td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-[#111111]">{o.customer}</div>
                            <div className="text-[11px] text-[#777777]">{o.email}</div>
                          </td>
                          <td className="py-3.5 px-4 text-[#444444] max-w-sm">{o.items}</td>
                          <td className="py-3.5 px-4 font-mono font-semibold text-[#111111]">
                            {money(o.total)}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={o.status}
                              onChange={(e) => {
                                const newStatus = e.target.value as Order["status"];
                                setOrdersList((prev) => {
                                  const next = prev.map((item) =>
                                    item.id === o.id ? { ...item, status: newStatus } : item
                                  );
                                  try {
                                    localStorage.setItem("artisanscent_crm_orders", JSON.stringify(next));
                                  } catch {}
                                  return next;
                                });
                                showFeedback(`Order ${o.id} updated to ${newStatus}.`);
                              }}
                              className="bg-[#f5f4f0] border border-[#dcd6cb] rounded-lg px-2.5 py-1 text-xs cursor-pointer focus:outline-none focus:border-[#1b5e3f]"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-[#777777]">{o.date}</td>
                          <td className="py-3.5 px-4 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-[#1b5e3f] h-7 px-2"
                              onClick={() => showFeedback(`Receipt dispatched for ${o.id}`)}
                            >
                              Send Receipt
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================= CUSTOMERS CRM TAB ======================= */}
        {activeTab === "customers" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl text-[#111111] font-normal">Patron CRM Directory</h1>
                <p className="text-xs text-[#666666] mt-0.5 font-light">
                  Customer lifetime value (LTV), buying tier segmentation, and concierge leads.
                </p>
              </div>

              <Button
                onClick={exportCustomersCSV}
                variant="outline"
                size="sm"
                className="rounded-full border-[#dcd6cb] bg-white hover:bg-[#f2efe9] text-[#222222] h-9 px-4 text-xs gap-1.5 self-start sm:self-auto"
              >
                <Download size={13} /> Export Customers CSV
              </Button>
            </div>

            <div className="rounded-2xl bg-white border border-[#e4ded5] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#fcfbf9] border-b border-[#eeebe5] text-[#777777] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Patron Name</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">CRM Segment</th>
                      <th className="py-3 px-4">Orders Count</th>
                      <th className="py-3 px-4">Lifetime Spend (₹)</th>
                      <th className="py-3 px-4">Last Order</th>
                      <th className="py-3 px-4 text-right">Direct Concierge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f2efe9]">
                    {customerList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-14 text-center text-[#777777]">
                          <Users className="mx-auto mb-2 text-[#aaa7a0] opacity-50" size={32} />
                          <div className="font-medium text-sm text-[#222222]">No Patron Profiles Recorded Yet</div>
                          <div className="text-xs text-[#888888] mt-1 max-w-sm mx-auto">
                            Customer contacts and leads submitted through the Contact page form will appear here automatically.
                          </div>
                        </td>
                      </tr>
                    ) : (
                      customerList.map((c) => (
                        <tr key={c.id} className="hover:bg-[#faf9f7] transition-colors">
                          <td className="py-3.5 px-4 font-medium text-[#111111] flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#1b5e3f]/10 border border-[#1b5e3f]/30 flex items-center justify-center font-display font-semibold text-[#1b5e3f]">
                              {c.name.slice(0, 1)}
                            </div>
                            <div>
                              <div>{c.name}</div>
                              <div className="text-[10px] text-[#888888] font-mono">{c.id}</div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div>{c.email}</div>
                            <div className="text-[10px] text-[#777777]">{c.phone}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                                c.segment === "VIP Reserve"
                                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                                  : c.segment === "High LTV"
                                    ? "bg-purple-100 text-purple-900 border border-purple-300"
                                    : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                              }`}
                            >
                              ✦ {c.segment}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono">{c.ordersCount} orders</td>
                          <td className="py-3.5 px-4 font-mono font-bold text-[#111111]">
                            {money(c.totalSpend)}
                          </td>
                          <td className="py-3.5 px-4 text-[#777777]">{c.lastOrder}</td>
                          <td className="py-3.5 px-4 text-right">
                            <a
                              href={`mailto:${c.email}?subject=Private%20Reserve%20Concierge%20-%20Artisan%20Scent`}
                              className="inline-flex items-center gap-1 text-xs text-[#1b5e3f] hover:underline font-medium"
                            >
                              Contact Patron →
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================= INQUIRIES TAB ======================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl text-[#111111] font-normal">Contact Inquiries &amp; Leads</h1>
                <p className="text-xs text-[#666666] mt-0.5 font-light">
                  Form submissions and bespoke commissions received through the website contact form.
                </p>
              </div>

              <Button
                onClick={exportInquiriesCSV}
                variant="outline"
                size="sm"
                className="rounded-full border-[#dcd6cb] bg-white hover:bg-[#f2efe9] text-[#222222] h-9 px-4 text-xs gap-1.5 self-start sm:self-auto"
              >
                <Download size={13} /> Export Inquiries CSV
              </Button>
            </div>

            <div className="rounded-2xl bg-white border border-[#e4ded5] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#fcfbf9] border-b border-[#eeebe5] text-[#777777] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Ref ID</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">Interest</th>
                      <th className="py-3 px-4">Message</th>
                      <th className="py-3 px-4">Received</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f2efe9]">
                    {inquiriesList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-14 text-center text-[#777777]">
                          <Mail className="mx-auto mb-2 text-[#aaa7a0] opacity-50" size={32} />
                          <div className="font-medium text-sm text-[#222222]">No Contact Submissions Received Yet</div>
                          <div className="text-xs text-[#888888] mt-1 max-w-sm mx-auto">
                            When users fill out the form on the Contact page, their message and contact info will appear here immediately.
                          </div>
                        </td>
                      </tr>
                    ) : (
                      inquiriesList.map((inq) => (
                        <tr key={inq.id} className="hover:bg-[#faf9f7] transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#111111]">{inq.id}</td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-[#111111]">{inq.name}</div>
                            <div className="text-[11px] text-[#777777]">{inq.email}</div>
                            <div className="text-[11px] text-[#888888]">{inq.phone}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#e8f5f0] text-[#1b5e3f] border border-[#1b5e3f]/20">
                              {inq.interest}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-[#444444] max-w-xs truncate" title={inq.message}>
                            {inq.message}
                          </td>
                          <td className="py-3.5 px-4 text-[#777777]">
                            <div>{inq.date}</div>
                            <div className="text-[10px] text-[#999999]">{inq.time}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                              className="bg-[#f5f4f0] border border-[#dcd6cb] rounded-lg px-2.5 py-1 text-xs cursor-pointer focus:outline-none focus:border-[#1b5e3f]"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <a
                              href={`mailto:${inq.email}?subject=Re:%20Artisan%20Scent%20Inquiry%20(${encodeURIComponent(inq.interest)})`}
                              className="text-xs text-[#1b5e3f] hover:underline mr-3 font-medium"
                            >
                              Reply
                            </a>
                            <button
                              type="button"
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="text-xs text-rose-600 hover:underline cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ======================= ADD / EDIT PRODUCT MODAL ======================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#dcd6cb] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-[#888888] hover:text-[#111111] p-1.5 rounded-full bg-[#f5f4f0]"
            >
              <X size={18} />
            </button>

            <div className="mb-6">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#1b5e3f] font-semibold">
                ARTISAN SCENT CATALOG MANAGEMENT
              </div>
              <h2 className="font-display text-2xl text-[#111111] font-normal mt-0.5">
                {editingProduct ? `Edit Product: ${editingProduct.name}` : "Add New Artisan Product"}
              </h2>
              <p className="text-xs text-[#666666] font-light">
                Fill in all product specifications. Products added will immediately sync to the storefront and CSV export engines.
              </p>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Veridian Royal Jasmine Extrait"
                  className="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-3.5 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
                />
              </div>

              {/* Category & Olfactory Family */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-3.5 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f] cursor-pointer"
                  >
                    <option value="perfumes">Luxury Perfumes</option>
                    <option value="essence-oils">Pure Essence Oils</option>
                    <option value="car-perfumes">Car Diffusers</option>
                    <option value="agarbatti">Sacred Agarbatti</option>
                    <option value="soaps">Handcrafted Soaps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
                    Olfactory Family *
                  </label>
                  <input
                    type="text"
                    required
                    value={formFamily}
                    onChange={(e) => setFormFamily(e.target.value)}
                    placeholder="e.g. Luxury, Floral, Woody, Oriental"
                    className="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-3.5 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
                  />
                </div>
              </div>

              {/* Price & Sale Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
                    Regular Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-3.5 py-2 text-xs text-[#222222] font-mono focus:outline-none focus:border-[#1b5e3f]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
                    Sale Price (₹ Optional)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formSalePrice || ""}
                    onChange={(e) =>
                      setFormSalePrice(e.target.value ? Number(e.target.value) : undefined)
                    }
                    placeholder="Optional"
                    className="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-3.5 py-2 text-xs text-[#222222] font-mono focus:outline-none focus:border-[#1b5e3f]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
                    Stock Units *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-3.5 py-2 text-xs text-[#222222] font-mono focus:outline-none focus:border-[#1b5e3f]"
                  />
                </div>
              </div>

              {/* Product Image Upload & Selection Section */}
              <div className="rounded-2xl border border-[#dcd6cb] p-4 bg-[#fbfaf8] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase tracking-wider text-[#333333] font-semibold flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-[#1b5e3f]" />
                    Product Image *
                  </label>
                  <div className="flex items-center gap-1 bg-[#eeebe5] p-0.5 rounded-lg text-[10px]">
                    <button
                      type="button"
                      onClick={() => setImageUploadMethod("file")}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                        imageUploadMethod === "file"
                          ? "bg-white text-[#1b5e3f] shadow-xs"
                          : "text-[#666666] hover:text-[#111111]"
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUploadMethod("url")}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                        imageUploadMethod === "url"
                          ? "bg-white text-[#1b5e3f] shadow-xs"
                          : "text-[#666666] hover:text-[#111111]"
                      }`}
                    >
                      Image URL / Presets
                    </button>
                  </div>
                </div>

                {imageUploadMethod === "file" ? (
                  <div>
                    {/* Hidden Native File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />

                    {/* Drag and Drop / Click to Select Box */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                        dragActive
                          ? "border-[#1b5e3f] bg-[#e8f5f0]"
                          : "border-[#dcd6cb] bg-white hover:border-[#1b5e3f] hover:bg-[#faf9f7]"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-[#1b5e3f]/10 text-[#1b5e3f] flex items-center justify-center">
                          {isUploadingImage ? (
                            <RefreshCw className="animate-spin" size={22} />
                          ) : (
                            <UploadCloud size={24} />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#111111]">
                            {isUploadingImage
                              ? "Optimizing & Uploading..."
                              : "Click to select or drag & drop product photo"}
                          </p>
                          <p className="text-[10px] text-[#777777] mt-0.5">
                            Supports JPG, PNG, WEBP, SVG (auto-optimized for lightning fast loading)
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 px-4 rounded-full text-xs font-medium border-[#1b5e3f]/40 text-[#1b5e3f] hover:bg-[#1b5e3f] hover:text-white mt-1"
                        >
                          <Camera size={13} className="mr-1.5" /> Choose from Device / Photos
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Direct Image URL input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="Paste image URL (https://... or /assets/...)"
                        className="w-full bg-white border border-[#dcd6cb] rounded-xl px-3.5 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
                      />
                    </div>

                    {/* Presets */}
                    <div className="flex items-center gap-1.5 mt-2 overflow-x-auto text-[10px] text-[#777777]">
                      <span className="font-semibold text-[#444444]">Quick Presets:</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormImage("/assets/perfumes/Faceted Gold Perfume Bottle.png")
                        }
                        className="hover:text-[#1b5e3f] underline whitespace-nowrap"
                      >
                        Gold Flacon
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormImage("/assets/perfumes/Glossy Black-to-Blue Perfume Bottle.png")
                        }
                        className="hover:text-[#1b5e3f] underline whitespace-nowrap"
                      >
                        Midnight Flacon
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormImage("/assets/essence oil/Amber Patchouli Oil Bottle.png")
                        }
                        className="hover:text-[#1b5e3f] underline whitespace-nowrap"
                      >
                        Amber Oil
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormImage("/assets/car perfume/car perfume.png")
                        }
                        className="hover:text-[#1b5e3f] underline whitespace-nowrap"
                      >
                        Car Diffuser
                      </button>
                    </div>
                  </div>
                )}

                {/* Live Image Preview Bar */}
                {formImage && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e4ded5]">
                    <div className="flex items-center gap-3">
                      <img
                        src={formImage}
                        alt="Product preview"
                        className="w-12 h-12 rounded-lg object-contain bg-[#faf8f5] p-1 border border-[#eeebe5]"
                        onError={(e) => {
                          (e.currentTarget as any).src =
                            "/assets/perfumes/Faceted Gold Perfume Bottle.png";
                        }}
                      />
                      <div>
                        <div className="text-xs font-semibold text-[#111111]">Active Product Image</div>
                        <div className="text-[10px] text-[#777777] font-mono truncate max-w-xs">
                          {formImage.startsWith("data:")
                            ? "Uploaded from device (Optimized Data URI)"
                            : formImage}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-[#1b5e3f] hover:underline font-medium px-2 py-1"
                    >
                      Change photo
                    </button>
                  </div>
                )}
              </div>

              {/* Fragrance Notes & Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
                    Fragrance Notes Breakdown *
                  </label>
                  <input
                    type="text"
                    required
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="e.g. Jasmine · Cardamom · Sandalwood"
                    className="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-3.5 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
                    Size / Volume &amp; Rating *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={formSize}
                      onChange={(e) => setFormSize(e.target.value)}
                      placeholder="e.g. 50 ml"
                      className="w-1/2 bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-3 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
                    />
                    <input
                      type="number"
                      step="0.1"
                      min={1}
                      max={5}
                      required
                      value={formRating}
                      onChange={(e) => setFormRating(Number(e.target.value))}
                      placeholder="4.9"
                      className="w-1/2 bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-3 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
                    />
                  </div>
                </div>
              </div>

              {/* Badge Tag */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
                  Product Badge Tag
                </label>
                <input
                  type="text"
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  placeholder="e.g. Signature Reserve, Bestseller, Limited Edition"
                  className="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-3.5 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#555555] font-semibold mb-1">
                  Artisanal Story &amp; Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe the aromatic narrative, extraction source, and character..."
                  className="w-full bg-[#faf9f7] border border-[#dcd6cb] rounded-xl px-3.5 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#1b5e3f] resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e8e2d8]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-full border-[#dcd6cb] text-xs h-9 px-5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-full bg-[#1b5e3f] hover:bg-[#164a31] text-white text-xs h-9 px-6 font-medium shadow-md"
                >
                  {editingProduct ? "Save Changes" : "Create & Publish Product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
