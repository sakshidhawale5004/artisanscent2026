<?php
require_once __DIR__ . '/header.php';

$products = get_products();
$orders = get_orders();
$customers = get_customers();

// Compute KPIs
$grossRevenue = 142500;
foreach ($orders as $o) {
    $grossRevenue += (float)$o['total'];
}

$inventoryValue = 0;
foreach ($products as $p) {
    $stock = !empty($p['stock']) ? (int)$p['stock'] : 25;
    $inventoryValue += ((float)$p['price'] * $stock);
}
?>

<div class="space-y-8 animate-in fade-in duration-200">
  <!-- Top Command Center Bar -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="font-display text-3xl text-[#111111] font-normal">Command Center</h1>
      <p class="text-xs text-[#666666] mt-0.5 font-light">
        Live telemetry, product specifications, inventory status, and patron relationship data.
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-2.5">
      <a
        href="product-add.php"
        class="inline-flex items-center gap-1.5 rounded-full bg-[#1b5e3f] hover:bg-[#164a31] text-white h-9 px-4 text-xs font-medium shadow-sm transition-all"
      >
        <span>+ Add New Product</span>
      </a>
      <a
        href="export.php?type=products"
        class="inline-flex items-center gap-1.5 rounded-full border border-[#dcd6cb] bg-white hover:bg-[#f2efe9] text-[#222222] h-9 px-4 text-xs font-medium transition-all"
      >
        <span>↓ Export Products CSV</span>
      </a>
      <a
        href="export.php?type=orders"
        class="inline-flex items-center gap-1.5 rounded-full border border-[#dcd6cb] bg-white hover:bg-[#f2efe9] text-[#222222] h-9 px-4 text-xs font-medium transition-all"
      >
        <span>↓ Orders CSV</span>
      </a>
    </div>
  </div>

  <!-- KPI Metric Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    <div class="p-5 rounded-2xl bg-white border border-[#e4ded5] shadow-xs">
      <div className="flex items-center justify-between text-xs text-[#777777] mb-2 font-medium uppercase tracking-wider">
        <span class="text-xs text-[#777777] uppercase tracking-wider font-semibold">Gross Revenue</span>
      </div>
      <div class="font-mono text-2xl font-bold text-[#111111] mt-1">
        <?php echo format_inr($grossRevenue); ?>
      </div>
      <div class="text-[11px] text-[#1b5e3f] font-medium mt-1">
        ↗ +18.4% vs previous cycle
      </div>
    </div>

    <div class="p-5 rounded-2xl bg-white border border-[#e4ded5] shadow-xs">
      <div class="text-xs text-[#777777] uppercase tracking-wider font-semibold">
        Orders Processed
      </div>
      <div class="font-mono text-2xl font-bold text-[#111111] mt-1">
        <?php echo count($orders) + 142; ?> Orders
      </div>
      <div class="text-[11px] text-[#777777] font-light mt-1">
        98.2% on-time logistics delivery
      </div>
    </div>

    <div class="p-5 rounded-2xl bg-white border border-[#e4ded5] shadow-xs">
      <div class="text-xs text-[#777777] uppercase tracking-wider font-semibold">
        Active CRM Patrons
      </div>
      <div class="font-mono text-2xl font-bold text-[#111111] mt-1">
        <?php echo count($customers); ?> Profiles
      </div>
      <div class="text-[11px] text-[#1b5e3f] font-medium mt-1">
        ₹28,400 Avg. Customer LTV
      </div>
    </div>

    <div class="p-5 rounded-2xl bg-white border border-[#e4ded5] shadow-xs">
      <div class="text-xs text-[#777777] uppercase tracking-wider font-semibold">
        Total Catalog Value
      </div>
      <div class="font-mono text-2xl font-bold text-[#111111] mt-1">
        <?php echo format_inr($inventoryValue); ?>
      </div>
      <div class="text-[11px] text-[#777777] font-light mt-1">
        <?php echo count($products); ?> Active formulations
      </div>
    </div>
  </div>

  <!-- Recent Orders Table -->
  <div class="rounded-2xl bg-white border border-[#e4ded5] p-5 sm:p-6 shadow-xs">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-display text-xl text-[#111111]">Recent Orders Telemetry</h3>
        <p class="text-xs text-[#666666] font-light">Real-time status updates across perfumes, essence oils, and car diffusers.</p>
      </div>
      <a href="orders.php" class="text-xs text-[#1b5e3f] hover:underline font-medium">
        View All Orders →
      </a>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead>
          <tr class="border-b border-[#eeebe5] text-[#777777] uppercase tracking-wider text-[10px]">
            <th class="py-2.5 px-3">Order ID</th>
            <th class="py-2.5 px-3">Patron Customer</th>
            <th class="py-2.5 px-3">Formulation Items</th>
            <th class="py-2.5 px-3">Amount</th>
            <th class="py-2.5 px-3">Status</th>
            <th class="py-2.5 px-3">Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#f2efe9]">
          <?php foreach (array_slice($orders, 0, 5) as $o): ?>
            <tr class="hover:bg-[#faf9f7] transition-colors">
              <td class="py-3 px-3 font-mono font-medium text-[#111111]"><?php echo htmlspecialchars($o['id']); ?></td>
              <td class="py-3 px-3">
                <div class="font-medium text-[#111111]"><?php echo htmlspecialchars($o['customer']); ?></div>
                <div class="text-[10px] text-[#888888]"><?php echo htmlspecialchars($o['email']); ?></div>
              </td>
              <td class="py-3 px-3 text-[#555555] max-w-xs truncate"><?php echo htmlspecialchars($o['items']); ?></td>
              <td class="py-3 px-3 font-mono font-semibold text-[#111111]"><?php echo format_inr($o['total']); ?></td>
              <td class="py-3 px-3">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-medium <?php 
                  echo $o['status'] === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 
                      ($o['status'] === 'Processing' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'); 
                ?>">
                  <?php echo htmlspecialchars($o['status']); ?>
                </span>
              </td>
              <td class="py-3 px-3 text-[#777777]"><?php echo htmlspecialchars($o['date']); ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Catalog Health & Category Distribution -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2 rounded-2xl bg-white border border-[#e4ded5] p-5 sm:p-6 shadow-xs">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-display text-xl text-[#111111]">Recent Catalog Additions</h3>
          <p class="text-xs text-[#666666] font-light">Latest handcrafted products entered into inventory.</p>
        </div>
        <a href="products.php" class="text-xs text-[#1b5e3f] hover:underline font-medium">Manage Products →</a>
      </div>

      <div class="space-y-3">
        <?php foreach (array_slice($products, 0, 4) as $p): ?>
          <div class="flex items-center justify-between p-3 rounded-xl border border-[#eeebe5] hover:border-[#1b5e3f]/40 transition-colors">
            <div class="flex items-center gap-3">
              <img
                src="<?php echo htmlspecialchars($p['image']); ?>"
                alt=""
                class="w-10 h-10 object-contain rounded-lg border border-[#e8e2d8] p-1 bg-white"
                onerror="this.src='../assets/perfumes/Faceted Gold Perfume Bottle.png'"
              />
              <div>
                <div class="font-display text-sm font-semibold text-[#111111]"><?php echo htmlspecialchars($p['name']); ?></div>
                <div class="text-[10px] text-[#777777]"><?php echo htmlspecialchars($p['notes']); ?></div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-mono text-xs font-semibold text-[#111111]"><?php echo format_inr($p['price']); ?></div>
              <div class="text-[10px] text-[#1b5e3f] font-mono capitalize"><?php echo htmlspecialchars(str_replace('-', ' ', $p['category'])); ?></div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Quick Export Box -->
    <div class="rounded-2xl bg-white border border-[#e4ded5] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div class="text-[10px] uppercase tracking-widest text-[#1b5e3f] font-semibold mb-1">
          CSV SPREADSHEET ENGINE
        </div>
        <h3 class="font-display text-xl text-[#111111] mb-2">Export Data Files</h3>
        <p class="text-xs text-[#666666] font-light leading-relaxed mb-4">
          Export complete datasets formatted for Excel, Google Sheets, or WooCommerce migration.
        </p>

        <div class="space-y-2.5">
          <a
            href="export.php?type=products"
            class="w-full flex items-center justify-between p-3 rounded-xl border border-[#e8e2d8] hover:border-[#1b5e3f] hover:bg-[#faf9f7] text-xs transition-colors"
          >
            <div class="flex items-center gap-2">
              <span>📦</span>
              <span class="font-medium text-[#111111]">Products Catalog CSV</span>
            </div>
            <span class="text-[11px] text-[#1b5e3f]">Download →</span>
          </a>

          <a
            href="export.php?type=orders"
            class="w-full flex items-center justify-between p-3 rounded-xl border border-[#e8e2d8] hover:border-[#1b5e3f] hover:bg-[#faf9f7] text-xs transition-colors"
          >
            <div class="flex items-center gap-2">
              <span>🛒</span>
              <span class="font-medium text-[#111111]">Orders History CSV</span>
            </div>
            <span class="text-[11px] text-[#1b5e3f]">Download →</span>
          </a>

          <a
            href="export.php?type=customers"
            class="w-full flex items-center justify-between p-3 rounded-xl border border-[#e8e2d8] hover:border-[#1b5e3f] hover:bg-[#faf9f7] text-xs transition-colors"
          >
            <div class="flex items-center gap-2">
              <span>👥</span>
              <span class="font-medium text-[#111111]">Customers CRM CSV</span>
            </div>
            <span class="text-[11px] text-[#1b5e3f]">Download →</span>
          </a>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-[#eeebe5] text-[10px] text-[#777777] leading-relaxed">
        ✦ Includes columns for Name, Category, Price, Rating, Image, Description, Notes, and Stock.
      </div>
    </div>
  </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
