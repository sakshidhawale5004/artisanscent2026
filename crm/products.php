<?php
require_once __DIR__ . '/header.php';

$allProducts = get_products();

// Filter & Search
$category = $_GET['category'] ?? 'all';
$search = trim($_GET['search'] ?? '');

$filtered = array_filter($allProducts, function($p) use ($category, $search) {
    if ($category !== 'all' && ($p['category'] ?? '') !== $category) {
        return false;
    }
    if ($search !== '') {
        $q = strtolower($search);
        $nameMatch = strpos(strtolower($p['name'] ?? ''), $q) !== false;
        $notesMatch = strpos(strtolower($p['notes'] ?? ''), $q) !== false;
        $descMatch = strpos(strtolower($p['description'] ?? ''), $q) !== false;
        if (!$nameMatch && !$notesMatch && !$descMatch) {
            return false;
        }
    }
    return true;
});
?>

<div class="space-y-6 animate-in fade-in duration-200">
  <!-- Top Header & Actions -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="font-display text-3xl text-[#111111] font-normal">Products Catalog</h1>
      <p class="text-xs text-[#666666] mt-0.5 font-light">
        Manage fragrance formulations, pricing tiers, olfactory notes, and inventory status.
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-2.5">
      <a
        href="product-add.php"
        class="inline-flex items-center gap-1.5 rounded-full bg-[#1b5e3f] hover:bg-[#164a31] text-white h-9 px-4 text-xs font-medium shadow-sm transition-all"
      >
        <span>+ Add Product</span>
      </a>
      <a
        href="export.php?type=products"
        class="inline-flex items-center gap-1.5 rounded-full border border-[#dcd6cb] bg-white hover:bg-[#f2efe9] text-[#222222] h-9 px-4 text-xs font-medium transition-all"
      >
        <span>↓ Export Catalog CSV</span>
      </a>
    </div>
  </div>

  <!-- Search & Filter Controls -->
  <div class="p-4 rounded-2xl bg-white border border-[#e4ded5] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
    <form method="GET" action="products.php" class="relative flex-1 max-w-sm">
      <input type="hidden" name="category" value="<?php echo htmlspecialchars($category); ?>" />
      <input
        type="text"
        name="search"
        value="<?php echo htmlspecialchars($search); ?>"
        placeholder="Search product by name, notes..."
        class="w-full pl-3 pr-8 py-1.5 bg-[#fbfaf8] border border-[#dcd6cb] rounded-lg text-xs focus:outline-none focus:border-[#1b5e3f]"
      />
      <?php if ($search): ?>
        <a href="products.php?category=<?php echo urlencode($category); ?>" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#111111] text-xs">✕</a>
      <?php endif; ?>
    </form>

    <!-- Category Pills -->
    <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
      <span class="text-[11px] text-[#777777] uppercase tracking-wider font-semibold mr-1">Category:</span>
      <?php
      $categories = [
          'all' => 'All',
          'perfumes' => 'Perfumes',
          'essence-oils' => 'Essence Oils',
          'car-perfumes' => 'Car Diffusers',
          'agarbatti' => 'Agarbatti',
          'soaps' => 'Soaps'
      ];
      foreach ($categories as $catKey => $catLabel):
          $active = ($category === $catKey);
      ?>
        <a
          href="products.php?category=<?php echo urlencode($catKey); ?><?php echo $search ? '&search=' . urlencode($search) : ''; ?>"
          class="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all <?php 
            echo $active ? 'bg-[#1b5e3f] text-white' : 'bg-[#f2efe9] text-[#555555] hover:bg-[#e6e2d9]'; 
          ?>"
        >
          <?php echo $catLabel; ?>
        </a>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- Products Table -->
  <div class="rounded-2xl bg-white border border-[#e4ded5] shadow-xs overflow-hidden">
    <div class="p-3 bg-[#fcfbf9] border-b border-[#eeebe5] flex items-center justify-between text-xs text-[#666666]">
      <div>
        Showing <span class="font-semibold text-[#1b5e3f]"><?php echo count($filtered); ?></span> of <?php echo count($allProducts); ?> items
      </div>
      <div>
        <a href="export.php?type=products" class="text-xs text-[#1b5e3f] hover:underline font-medium">Download CSV SpreadSheet →</a>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead className="bg-[#fcfbf9] border-b border-[#eeebe5] text-[#777777] uppercase tracking-wider text-[10px]">
          <tr class="border-b border-[#eeebe5] text-[#777777] uppercase tracking-wider text-[10px]">
            <th class="py-3 px-4">Image</th>
            <th class="py-3 px-4">Name &amp; Fragrance Notes</th>
            <th class="py-3 px-4">Category</th>
            <th class="py-3 px-4">Price (₹)</th>
            <th class="py-3 px-4">Rating</th>
            <th class="py-3 px-4">Stock</th>
            <th class="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#f2efe9]">
          <?php if (empty($filtered)): ?>
            <tr>
              <td colspan="7" class="py-12 text-center text-[#777777]">
                No products found matching your search or filter.
              </td>
            </tr>
          <?php else: ?>
            <?php foreach ($filtered as $p): ?>
              <tr class="hover:bg-[#faf9f7] transition-colors">
                <td class="py-3 px-4">
                  <img
                    src="<?php echo htmlspecialchars($p['image']); ?>"
                    alt="<?php echo htmlspecialchars($p['name']); ?>"
                    class="w-12 h-12 object-contain rounded-lg border border-[#e8e2d8] p-1 bg-white"
                    onerror="this.src='../assets/perfumes/Faceted Gold Perfume Bottle.png'"
                  />
                </td>
                <td class="py-3 px-4 max-w-xs">
                  <div class="font-display text-base font-semibold text-[#111111]"><?php echo htmlspecialchars($p['name']); ?></div>
                  <div class="text-[11px] text-[#666666] line-clamp-1"><?php echo htmlspecialchars($p['notes']); ?></div>
                  <div class="text-[10px] text-[#1b5e3f] font-mono mt-0.5">
                    <?php echo htmlspecialchars($p['badge'] ?? 'Artisanal'); ?> · <?php echo htmlspecialchars($p['size'] ?? '50 ml'); ?>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span class="px-2.5 py-0.5 rounded-full bg-[#f0ede8] text-[#555555] text-[10px] font-medium capitalize">
                    <?php echo htmlspecialchars(str_replace('-', ' ', $p['category'])); ?>
                  </span>
                </td>
                <td class="py-3 px-4 font-mono font-semibold text-[#111111]">
                  <?php echo format_inr($p['price']); ?>
                  <?php if (!empty($p['salePrice'])): ?>
                    <span class="ml-1 text-[10px] text-[#999999] line-through font-normal">
                      <?php echo format_inr($p['salePrice']); ?>
                    </span>
                  <?php endif; ?>
                </td>
                <td class="py-3 px-4 text-[#d4af37] font-semibold text-xs">
                  ★ <?php echo htmlspecialchars($p['rating'] ?? 4.9); ?>
                </td>
                <td class="py-3 px-4">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700">
                    <?php echo htmlspecialchars($p['stock'] ?? 25); ?> in stock
                  </span>
                </td>
                <td class="py-3 px-4 text-right space-x-1">
                  <a
                    href="product-edit.php?id=<?php echo urlencode($p['id']); ?>"
                    class="inline-block p-1.5 text-[#555555] hover:text-[#1b5e3f] rounded hover:bg-black/5"
                    title="Edit Product"
                  >
                    ✏ Edit
                  </a>
                  <a
                    href="product-delete.php?id=<?php echo urlencode($p['id']); ?>"
                    onclick="return confirm('Are you sure you want to delete <?php echo addslashes($p['name']); ?>?');"
                    class="inline-block p-1.5 text-[#888888] hover:text-red-600 rounded hover:bg-black/5"
                    title="Delete Product"
                  >
                    🗑 Delete
                  </a>
                </td>
              </tr>
            <?php endforeach; ?>
          <?php endif; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
