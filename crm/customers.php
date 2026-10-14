<?php
require_once __DIR__ . '/header.php';

$customers = get_customers();
$search = trim($_GET['search'] ?? '');

$filtered = array_filter($customers, function($c) use ($search) {
    if ($search !== '') {
        $q = strtolower($search);
        return strpos(strtolower($c['name'] ?? ''), $q) !== false ||
               strpos(strtolower($c['email'] ?? ''), $q) !== false ||
               strpos(strtolower($c['phone'] ?? ''), $q) !== false;
    }
    return true;
});
?>

<div class="space-y-6 animate-in fade-in duration-200">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="font-display text-3xl text-[#111111] font-normal">Patron CRM Directory</h1>
      <p class="text-xs text-[#666666] mt-0.5 font-light">
        Customer lifetime values (LTV), VIP reserve tiers, and concierge profiles.
      </p>
    </div>

    <a
      href="export.php?type=customers"
      class="inline-flex items-center gap-1.5 rounded-full border border-[#dcd6cb] bg-white hover:bg-[#f2efe9] text-[#222222] h-9 px-4 text-xs font-medium transition-all self-start sm:self-auto"
    >
      <span>↓ Export Customers CSV</span>
    </a>
  </div>

  <!-- Search Bar -->
  <div class="p-4 rounded-2xl bg-white border border-[#e4ded5] shadow-xs flex items-center justify-between gap-3">
    <form method="GET" action="customers.php" class="relative flex-1 max-w-sm">
      <input
        type="text"
        name="search"
        value="<?php echo htmlspecialchars($search); ?>"
        placeholder="Search patron by name, email, phone..."
        class="w-full pl-3 pr-8 py-1.5 bg-[#fbfaf8] border border-[#dcd6cb] rounded-lg text-xs focus:outline-none focus:border-[#1b5e3f]"
      />
      <?php if ($search): ?>
        <a href="customers.php" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#111111] text-xs">✕</a>
      <?php endif; ?>
    </form>
    <div class="text-xs text-[#777777]">
      Total: <span class="font-semibold text-[#1b5e3f]"><?php echo count($filtered); ?></span> profiles
    </div>
  </div>

  <!-- Customers Table -->
  <div class="rounded-2xl bg-white border border-[#e4ded5] shadow-xs overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-[#fcfbf9] border-b border-[#eeebe5] text-[#777777] uppercase tracking-wider text-[10px]">
          <tr>
            <th class="py-3 px-4">Patron Name</th>
            <th class="py-3 px-4">Contact</th>
            <th class="py-3 px-4">CRM Segment</th>
            <th class="py-3 px-4">Orders Count</th>
            <th class="py-3 px-4">Lifetime Spend</th>
            <th class="py-3 px-4">Last Order</th>
            <th class="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#f2efe9]">
          <?php if (empty($filtered)): ?>
            <tr>
              <td colspan="7" class="py-12 text-center text-[#777777]">
                No patron profiles found matching your search.
              </td>
            </tr>
          <?php else: ?>
            <?php foreach ($filtered as $c): ?>
              <tr class="hover:bg-[#faf9f7] transition-colors">
                <td class="py-3.5 px-4 font-medium text-[#111111] flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-full bg-[#1b5e3f]/10 border border-[#1b5e3f]/30 flex items-center justify-center font-display font-semibold text-[#1b5e3f]">
                    <?php echo substr($c['name'] ?? 'P', 0, 1); ?>
                  </div>
                  <div>
                    <div class="font-semibold"><?php echo htmlspecialchars($c['name']); ?></div>
                    <div class="text-[10px] text-[#888888] font-mono"><?php echo htmlspecialchars($c['id']); ?></div>
                  </div>
                </td>
                <td class="py-3.5 px-4">
                  <div><?php echo htmlspecialchars($c['email']); ?></div>
                  <div class="text-[10px] text-[#777777]"><?php echo htmlspecialchars($c['phone']); ?></div>
                </td>
                <td class="py-3.5 px-4">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold <?php 
                    echo ($c['segment'] ?? '') === 'VIP Reserve' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        (($c['segment'] ?? '') === 'High LTV' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                        'bg-emerald-100 text-emerald-900 border border-emerald-300');
                  ?>">
                    ✦ <?php echo htmlspecialchars($c['segment'] ?? 'General'); ?>
                  </span>
                </td>
                <td class="py-3.5 px-4 font-mono"><?php echo htmlspecialchars($c['ordersCount'] ?? 0); ?> orders</td>
                <td class="py-3.5 px-4 font-mono font-bold text-[#111111]">
                  <?php echo format_inr($c['totalSpend'] ?? 0); ?>
                </td>
                <td class="py-3.5 px-4 text-[#777777]"><?php echo htmlspecialchars($c['lastOrder'] ?? ''); ?></td>
                <td class="py-3.5 px-4 text-right">
                  <a
                    href="mailto:<?php echo urlencode($c['email']); ?>?subject=Artisan%20Scent%20Private%20Reserve"
                    class="text-xs text-[#1b5e3f] hover:underline font-medium"
                  >
                    Contact Patron →
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
