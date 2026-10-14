# Artisan Scent CRM & Admin Panel (PHP + In-App Suite)

Inspired by the [Commerce & CRM Suite](https://customer-relationship-manager-zeta.vercel.app/), this package provides a complete, standalone, production-ready PHP CRM & Admin Hub, alongside the matching integrated `/admin` route within the React storefront.

---

## 🔑 Default Administrator Credentials
- **Username**: `admin`
- **Password**: `artisan2026` (or `admin123`)

---

## 🚀 How to Run the PHP CRM

### Method 1: Local Built-in PHP Server (Fastest)
From this directory, run:
```bash
cd crm
php -S localhost:8000
```
Then open your browser at:
```
http://localhost:8000
```

### Method 2: XAMPP / WAMP / Laragon
1. Copy the `crm` folder to your server document root (e.g. `C:\xampp\htdocs\crm`).
2. Start Apache from the XAMPP Control Panel.
3. Open `http://localhost/crm` in your browser.

### Method 3: Hosting Server (cPanel, Nginx, Apache)
Upload the `crm/` directory to your web root or a subdomain (e.g. `crm.artisanscent.com`). No MySQL configuration is required as all products, orders, and CRM records automatically persist into standard JSON storage in `crm/data/`.

---

## 📦 Features & Capabilities

### 1. Command Center (Dashboard)
- **KPI Metrics**: Real-time Gross Revenue, Total Orders, Active CRM Patrons, and Total Catalog Valuation.
- **Recent Orders Telemetry**: Live status updates across all orders with direct status update switcher.
- **Category Breakdown**: Recent additions across luxury perfumes, essence oils, car diffusers, and soaps.

### 2. Product Catalog Management
- **Full Details Support**:
  - Product Name
  - Category (`perfumes`, `essence-oils`, `car-perfumes`, `agarbatti`, `soaps`)
  - Regular Price (₹) & Sale Price (₹)
  - Rating (e.g. 4.9)
  - Image Upload (stores in `crm/uploads/`) or Image URL / Path
  - Olfactory Notes (Top, Heart, Base)
  - Olfactory Family (Luxury, Floral, Woody, etc.)
  - Bottle Size / Volume (e.g. 50 ml Extrait, 15 ml, 200g)
  - Stock Quantity & Inventory Level
  - Product Badge (e.g. Signature Reserve, Bestseller)
  - Botanical Specimen Name
  - Full Artisanal Story & Description
- **Product Actions**: Real-time search, category filters, edit, and deletion.

### 3. CSV File Export Engine
One-click instant spreadsheet downloads:
- **Products Catalog CSV** (`export.php?type=products`):
  Exports all categories, prices, images, descriptions, ratings, notes, and names in standard UTF-8 CSV with Excel compatibility.
- **Orders History CSV** (`export.php?type=orders`):
  Exports all orders, customer details, formulations, totals, and fulfillment statuses.
- **Customers CRM CSV** (`export.php?type=customers`):
  Exports patron profiles, CRM segments (VIP Reserve, High LTV, etc.), total spend, and contact info.

### 4. Orders & Logistics
- Track all customer orders with fulfillment status toggles:
  - `Pending`
  - `Processing`
  - `Shipped`
  - `Completed`

### 5. Patron CRM Directory
- Customer profiles with lifetime value (LTV) calculation.
- Segment tags: VIP Reserve, High LTV, Frequent Patron, New Client.
- Direct email concierge links.
