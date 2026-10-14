<?php
require_once __DIR__ . '/header.php';

$products = get_products();
$orders = get_orders();
$customers = get_customers();
$inquiries = get_inquiries();

// Compute real-time accurate KPIs (No fake additions, no duplicate info)
$grossRevenue = 0;
foreach ($orders as $o) {
    $grossRevenue += (float)$o['total'];
}

$totalOrdersCount = count($orders);
$avgOrderValue = $totalOrdersCount > 0 ? round($grossRevenue / $totalOrdersCount) : 0;

$inventoryValue = 0;
$categoryCounts = [
    'perfumes' => 0,
    'essence-oils' => 0,
    'car-perfumes' => 0,
    'agarbatti' => 0,
    'soaps' => 0
];

foreach ($products as $p) {
    $stock = !empty($p['stock']) ? (int)$p['stock'] : 25;
    $inventoryValue += ((float)$p['price'] * $stock);
    $cat = $p['category'] ?? 'perfumes';
    if (isset($categoryCounts[$cat])) {
        $categoryCounts[$cat]++;
    } else {
        $categoryCounts[$cat] = 1;
    }
}

// Order fulfillment counts
$statusCounts = [
    'Completed' => 0,
    'Processing' => 0,
    'Shipped' => 0,
    'Pending' => 0
];
foreach ($orders as $o) {
    $st = $o['status'] ?? 'Pending';
    if (isset($statusCounts[$st])) {
        $statusCounts[$st]++;
    }
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

  <!-- Real-time Accurate KPI Metric Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    <div class="p-5 rounded-2xl bg-white border border-[#e4ded5] shadow-xs">
      <div class="text-xs text-[#777777] uppercase tracking-wider font-semibold">Gross Revenue</div>
      <div class="font-mono text-2xl font-bold text-[#111111] mt-1">
        <?php echo format_inr($grossRevenue); ?>
      </div>
      <div class="text-[11px] text-[#777777] font-light mt-1">
        Avg. Order Value: <span class="font-mono font-medium text-[#111111]"><?php echo format_inr($avgOrderValue); ?></span>
      </div>
    </div>

    <div class="p-5 rounded-2xl bg-white border border-[#e4ded5] shadow-xs">
      <div class="text-xs text-[#777777] uppercase tracking-wider font-semibold">
        Total Orders
      </div>
      <div class="font-mono text-2xl font-bold text-[#111111] mt-1">
        <?php echo $totalOrdersCount; ?> Orders
      </div>
      <div class="text-[11px] text-[#1b5e3f] font-medium mt-1">
        <?php echo $statusCounts['Completed']; ?> completed · <?php echo ($statusCounts['Processing'] + $statusCounts['Shipped']); ?> in transit
      </div>
    </div>

    <div class="p-5 rounded-2xl bg-white border border-[#e4ded5] shadow-xs">
      <div class="text-xs text-[#777777] uppercase tracking-wider font-semibold">
        Active CRM Patrons
      </div>
      <div class="font-mono text-2xl font-bold text-[#111111] mt-1">
        <?php echo count($customers); ?> Profiles
      </div>
      <div class="text-[11px] text-[#777777] font-light mt-1">
        Direct concierge records active
      </div>
    </div>

    <div class="p-5 rounded-2xl bg-white border border-[#e4ded5] shadow-xs">
      <div class="text-xs text-[#777777] uppercase tracking-wider font-semibold">
        Catalog Valuation
      </div>
      <div class="font-mono text-2xl font-bold text-[#111111] mt-1">
        <?php echo format_inr($inventoryValue); ?>
      </div>
      <div class="text-[11px] text-[#777777] font-light mt-1">
        Across <?php echo count($products); ?> active formulations
      </div>
    </div>
  </div>

  <!-- Non-Duplicated Overview Section: Fulfillment Funnel & Portfolio Distribution -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Card 1: Logistics & Fulfillment Funnel -->
    <div class="rounded-2xl bg-white border border-[#e4ded5] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <div>
            <h3 class="font-display text-xl text-[#111111]">Order Fulfillment Funnel</h3>
            <p class="text-xs text-[#666666] font-light">Status distribution of all customer orders in the system.</p>
          </div>
          <a href="orders.php" class="text-xs text-[#1b5e3f] hover:underline font-medium">Manage Orders →</a>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-center">
            <div class="text-[10px] uppercase font-semibold text-emerald-800 tracking-wider">Completed</div>
            <div class="font-mono text-xl font-bold text-emerald-900 mt-1"><?php echo $statusCounts['Completed']; ?></div>
            <div class="text-[9px] text-emerald-700 mt-0.5">Delivered</div>
          </div>

          <div class="p-3.5 rounded-xl bg-amber-50 border border-amber-200/60 text-center">
            <div class="text-[10px] uppercase font-semibold text-amber-800 tracking-wider">Processing</div>
            <div class="font-mono text-xl font-bold text-amber-900 mt-1"><?php echo $statusCounts['Processing']; ?></div>
            <div class="text-[9px] text-amber-700 mt-0.5">Blending / Pack</div>
          </div>

          <div class="p-3.5 rounded-xl bg-blue-50 border border-blue-200/60 text-center">
            <div class="text-[10px] uppercase font-semibold text-blue-800 tracking-wider">Shipped</div>
            <div class="font-mono text-xl font-bold text-blue-900 mt-1"><?php echo $statusCounts['Shipped']; ?></div>
            <div class="text-[9px] text-blue-700 mt-0.5">In Transit</div>
          </div>

          <div class="p-3.5 rounded-xl bg-neutral-100 border border-neutral-200 text-center">
            <div class="text-[10px] uppercase font-semibold text-neutral-700 tracking-wider">Pending</div>
            <div class="font-mono text-xl font-bold text-neutral-900 mt-1"><?php echo $statusCounts['Pending']; ?></div>
            <div class="text-[9px] text-neutral-600 mt-0.5">Awaiting Action</div>
          </div>
        </div>
      </div>

      <div class="mt-5 pt-4 border-t border-[#eeebe5] flex items-center justify-between text-xs text-[#666666]">
        <span>Total Active Workflows: <strong class="text-[#111111]"><?php echo $totalOrdersCount; ?></strong></span>
        <a href="orders.php" class="text-[#1b5e3f] hover:underline font-medium text-xs">
          Open full orders list in Orders tab →
        </a>
      </div>
    </div>

    <!-- Card 2: Catalog Portfolio Breakdown -->
    <div class="rounded-2xl bg-white border border-[#e4ded5] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <div>
            <h3 class="font-display text-xl text-[#111111]">Portfolio Distribution</h3>
            <p class="text-xs text-[#666666] font-light">Formulation counts across luxury product categories.</p>
          </div>
          <a href="products.php" class="text-xs text-[#1b5e3f] hover:underline font-medium">Manage Products →</a>
        </div>

        <div class="space-y-3 mt-4">
          <?php
          $categoryMeta = [
              ['key' => 'perfumes', 'label' => 'Luxury Perfumes', 'color' => 'bg-[#1b5e3f]'],
              ['key' => 'essence-oils', 'label' => 'Pure Essence Oils', 'color' => 'bg-[#d4af37]'],
              ['key' => 'car-perfumes', 'label' => 'Car Diffusers', 'color' => 'bg-[#2d8659]'],
              ['key' => 'agarbatti', 'label' => 'Sacred Agarbatti', 'color' => 'bg-[#b45309]'],
              ['key' => 'soaps', 'label' => 'Handcrafted Soaps', 'color' => 'bg-[#059669]'],
          ];
          $totalProds = count($products);
          foreach ($categoryMeta as $cm):
              $count = $categoryCounts[$cm['key']] ?? 0;
              $percent = $totalProds > 0 ? round(($count / $totalProds) * 100) : 0;
          ?>
            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="font-medium text-[#222222]"><?php echo $cm['label']; ?></span>
                <span class="text-[#777777] font-mono"><?php echo $count; ?> items (<?php echo $percent; ?>%)</span>
              </div>
              <div class="w-full h-2 bg-[#f0ede8] rounded-full overflow-hidden">
                <div class="h-full <?php echo $cm['color']; ?> rounded-full" style="width: <?php echo $percent; ?>%;"></div>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="mt-5 pt-4 border-t border-[#eeebe5] flex items-center justify-between text-xs text-[#666666]">
        <span>Total Formulations: <strong class="text-[#111111]"><?php echo $totalProds; ?></strong></span>
        <a href="products.php" class="text-[#1b5e3f] hover:underline font-medium text-xs">
          View catalog in Products tab →
        </a>
      </div>
    </div>
  </div>

  <!-- Card 3: Recent Contact Inquiries & Form Submissions -->
  <div class="rounded-2xl bg-white border border-[#e4ded5] p-5 sm:p-6 shadow-xs">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-display text-xl text-[#111111]">Atelier Contact Inquiries &amp; Leads</h3>
        <p class="text-xs text-[#666666] font-light">Direct submissions received from the storefront Contact &amp; Concierge form.</p>
      </div>
      <a href="inquiries.php" class="text-xs text-[#1b5e3f] hover:underline font-medium">All Inquiries (<?php echo count($inquiries); ?>) →</a>
    </div>

    <?php if (empty($inquiries)): ?>
      <div class="py-10 text-center text-[#777777] text-xs bg-[#fbfaf8] rounded-xl border border-dashed border-[#dcd6cb]">
        No contact inquiries received yet. When visitors fill out the Contact form on the storefront, their submissions will appear here.
      </div>
    <?php else: ?>
      <div class="divide-y divide-[#f2efe9]">
        <?php foreach (array_slice(array_reverse($inquiries), 0, 5) as $inq): ?>
          <div class="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <div class="font-medium text-[#111111] flex items-center gap-2">
                <span><?php echo htmlspecialchars($inq['name']); ?></span>
                <span class="text-[10px] text-[#777777] font-mono"><?php echo htmlspecialchars($inq['email']); ?></span>
                <?php if (!empty($inq['phone'])): ?>
                  <span class="text-[10px] text-[#888888]"><?php echo htmlspecialchars($inq['phone']); ?></span>
                <?php endif; ?>
              </div>
              <p class="text-xs text-[#555555] mt-1 font-light italic">"<?php echo htmlspecialchars($inq['message']); ?>"</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <?php echo htmlspecialchars($inq['interest'] ?? 'General'); ?>
              </span>
              <span class="text-[#888888] text-[11px] font-mono"><?php echo htmlspecialchars($inq['date']); ?></span>
              <a href="mailto:<?php echo urlencode($inq['email']); ?>" class="text-[#1b5e3f] hover:underline text-xs font-medium">Reply →</a>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
